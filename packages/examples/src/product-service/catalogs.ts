import { getToken } from '@integration-sdk-ts/rmt-product-import';
import {
  Catalog,
  CatalogsApi,
  Configuration,
} from '@integration-sdk-ts/rmt-product-service';
import * as dotenv from 'dotenv';

dotenv.config();

let catalogsApi: CatalogsApi;

async function getCatalogsApi() {
  if (!process.env.RMT_API_URL) {
    throw new Error('RMT_API_URL environment variable is not defined');
  }

  if (catalogsApi) {
    return catalogsApi;
  }

  const config = new Configuration({
    basePath: process.env.RMT_API_URL,
    accessToken: await getToken(),
  });
  catalogsApi = new CatalogsApi(config);

  return catalogsApi;
}

export async function getCatalogs() {
  const api = await getCatalogsApi();
  const response = await api.getCatalogs();
  return response.data;
}

export async function getCatalog(catalogId: string) {
  const api = await getCatalogsApi();
  const response = await api.getCatalog(catalogId);
  return response.data;
}

export async function createCatalog(catalog: Catalog) {
  const api = await getCatalogsApi();
  const response = await api.addCatalog(catalog);
  return response.data;
}

export async function getBrands(catalogKey: string) {
  const api = await getCatalogsApi();
  const response = await api.getDistinctValues(catalogKey, 'brands');
  return response.data;
}

export async function getCategories(catalogKey: string) {
  const api = await getCatalogsApi();
  const response = await api.getDistinctValues(catalogKey, 'categories');
  return response.data;
}

export async function getCategory(catalogId: string, categoryKey: string) {
  const api = await getCatalogsApi();
  const response = await api.getCategory(catalogId, categoryKey);
  return response.data;
}
