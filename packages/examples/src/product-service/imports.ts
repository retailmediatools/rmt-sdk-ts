import { getToken } from '@rmt-sdk-ts/rmt-product-import';
import {
  Configuration,
  CreateImportSessionRequest,
  ImportEntitiesRequest,
  ImportsApi,
} from '@rmt-sdk-ts/rmt-product-service';
import * as dotenv from 'dotenv';

dotenv.config();

let importsApi: ImportsApi;

async function getImportsApi() {
  if (!process.env.RMT_API_URL) {
    throw new Error('RMT_API_URL environment variable is not defined');
  }

  if (importsApi) {
    return importsApi;
  }

  const config = new Configuration({
    basePath: process.env.RMT_API_URL,
    accessToken: await getToken(),
  });
  importsApi = new ImportsApi(config);

  return importsApi;
}

export async function createImportSession(
  catalogKey: string,
  options: CreateImportSessionRequest,
) {
  const api = await getImportsApi();
  const response = await api.createImportSession(catalogKey, options);
  return response.data;
}

export async function importEntities(
  catalogKey: string,
  importSessionId: string,
  entities: ImportEntitiesRequest,
) {
  const api = await getImportsApi();
  const response = await api.importEntities(
    catalogKey,
    importSessionId,
    entities,
  );
  return response.data;
}

export async function getImportSessionStatus(
  catalogKey: string,
  importSessionId: string,
) {
  const api = await getImportsApi();
  const response = await api.getImportSession(catalogKey, importSessionId);
  return response.data;
}
