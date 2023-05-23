import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import {
  AuthMiddlewareOptions,
  ClientBuilder,
  HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import fetch from 'node-fetch';

let ctpClient = undefined;

let apiRoot = undefined;

export interface Configuration {
  projectKey: string;
  clientId: string;
  clientSecret: string;
  authUrl: string;
  apiUrl: string;
  scopes: string[];
}

export function getApiRoot(config: Configuration): ByProjectKeyRequestBuilder {
  if (apiRoot) {
    return apiRoot;
  }

  if (!ctpClient) {
    ctpClient = getClient(config);
  }

  const { projectKey } = config;
  apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey,
  });

  return apiRoot;
}

function getClient(config: Configuration) {
  const { projectKey, clientId, clientSecret, authUrl, apiUrl, scopes } =
    config;

  const authMiddlewareOptions: AuthMiddlewareOptions = {
    host: authUrl,
    projectKey,
    credentials: {
      clientId,
      clientSecret,
    },
    scopes,
    fetch,
  };

  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: apiUrl,
    fetch,
  };

  return new ClientBuilder()
    .withProjectKey(projectKey)
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();
}
