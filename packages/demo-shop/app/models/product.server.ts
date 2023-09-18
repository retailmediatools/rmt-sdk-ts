import {
  Configuration,
  Product,
  ProductsApi,
} from '@rmt-sdk-ts/rmt-product-service';

import { getToken } from '../lib/rmt';

export async function getProducts(): Promise<Array<Product>> {
  const { access_token } = await getToken();
  const rmtConfig = new Configuration({
    basePath: process.env.RMT_API_URL,
    accessToken: access_token,
  });

  try {
    const api = new ProductsApi(rmtConfig);
    const res = await api.getProducts(process.env.RMT_CATALOG_ID || '');

    const { data } = res.data as any;

    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function getProductsBySku(
  skus: string[],
): Promise<Array<Product>> {
  const { access_token } = await getToken();
  const rmtConfig = new Configuration({
    basePath: process.env.RMT_API_URL,
    accessToken: access_token,
  });

  try {
    const api = new ProductsApi(rmtConfig);
    const res = await Promise.all(
      skus.map((sku) => api.getProduct(process.env.RMT_CATALOG_ID || '', sku)),
    );

    return res.map((r) => (r.data as any).data);
  } catch (err) {
    console.error(err);
    throw err;
  }
}
