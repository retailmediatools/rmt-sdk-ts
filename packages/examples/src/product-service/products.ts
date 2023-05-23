import { getToken } from '@integration-sdk-ts/rmt-product-import';
import {
  Configuration,
  PatchProduct,
  Product,
  ProductsApi,
} from '@integration-sdk-ts/rmt-product-service';
import * as dotenv from 'dotenv';

dotenv.config();

let productsApi: ProductsApi;

async function getProductsApi() {
  if (!process.env.RMT_API_URL) {
    throw new Error('RMT_API_URL environment variable is not defined');
  }

  if (productsApi) {
    return productsApi;
  }

  const productsApiConfig = new Configuration({
    basePath: process.env.RMT_API_URL,
    accessToken: await getToken(),
  });
  productsApi = new ProductsApi(productsApiConfig);

  return productsApi;
}

export async function getProducts(
  catalogKey: string,
  q?: string,
  filter?: string
) {
  const api = await getProductsApi();
  const response = await api.getProducts(catalogKey, q, filter);
  return response.data;
}

export async function getProduct(catalogKey: string, sku: string) {
  const api = await getProductsApi();
  const response = await api.getProduct(catalogKey, sku);
  return response.data;
}

export async function createProduct(catalogKey: string, product: Product) {
  const api = await getProductsApi();
  const response = await api.addProduct(catalogKey, product);
  return response.data;
}

export async function updateProduct(
  catalogKey: string,
  sku: string,
  product: PatchProduct
) {
  const api = await getProductsApi();
  const response = await api.patchProduct(catalogKey, sku, product);
  return response.data;
}

export async function deactivateProduct(catalogKey: string, sku: string) {
  const api = await getProductsApi();
  const response = await api.deactivateProduct(catalogKey, sku);
  return response.data;
}
