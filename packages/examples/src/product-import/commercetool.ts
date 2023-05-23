import {
  CtpTransformer,
  fetchCategories,
  fetchObjects,
  fetchProducts,
} from '@integration-sdk-ts/commercetools-product-import';
import {
  fetchProducts as fetchExistingProducts,
  getToken,
  syncProducts,
  transform,
} from '@integration-sdk-ts/rmt-product-import';
import {
  Configuration,
  ProductsApi,
} from '@integration-sdk-ts/rmt-product-service';
import * as dotenv from 'dotenv';

dotenv.config();

export async function importProductsFromCommercetools() {
  if (!process.env.RMT_API_URL) {
    throw new Error('RMT_API_URL environment variable is not defined');
  }

  // Obtain RMT auth token and configure RMT client
  const token = await getToken();

  const rmtConfig = new Configuration({
    basePath: process.env.RMT_API_URL,
    accessToken: token,
  });
  const productsApi = new ProductsApi(rmtConfig);

  // Configure connection to the source at the Commercetools API
  const ctpConfig = {
    projectKey: process.env.CTP_PROJECT_KEY,
    clientId: process.env.CTP_CLIENT_ID,
    clientSecret: process.env.CTP_CLIENT_SECRET,
    authUrl: process.env.CTP_AUTH_URL,
    apiUrl: process.env.CTP_API_URL,
    scopes: process.env.CTP_SCOPES ? process.env.CTP_SCOPES.split(' ') : [],
  };

  const locale = process.env.CTP_LOCALE;

  // Fetch auxiliary data from the source
  const categories = new Map<string, string>();
  for await (const ctpCategories of fetchObjects(fetchCategories, ctpConfig)) {
    ctpCategories.forEach((c) => categories.set(c.id, c.name[locale]));
  }

  console.log(`Fetched ${categories.size} categories`);

  // Fetch existing RMT products

  console.log('Fetching existing products...');

  const rmtCatalogKey = process.env.RMT_CATALOG_KEY;
  let existingProducts = [];
  for await (const products of fetchExistingProducts(
    productsApi,
    rmtCatalogKey
  )) {
    existingProducts = existingProducts.concat(products);
  }

  console.log(`Fetched ${existingProducts.length} existing products`);

  // Sync products
  for await (const ctpProducts of fetchObjects(fetchProducts, ctpConfig)) {
    // Transform data to the RMT format
    const ctpTransformer = new CtpTransformer(locale, categories);
    const products = transform(ctpTransformer, ctpProducts);
    console.log(
      `Fetched ${ctpProducts.length} products, importing ${products.length} products`
    );

    // Sync products to the RMT
    try {
      const rmtCatalogKey = process.env.RMT_CATALOG_KEY;
      await syncProducts(
        productsApi,
        rmtCatalogKey,
        products,
        existingProducts
      );
      console.log(`Synced ${products.length} products`);
    } catch (e) {
      console.log(`Error importing products: ${e.message}`);
    }
  }
}
