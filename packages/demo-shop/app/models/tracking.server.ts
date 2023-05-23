import {
  Configuration,
  TrackingApi,
} from '@integration-sdk-ts/rmt-tracking-service';

import { getToken } from '../lib/rmt';

export async function createImpressionTrack(adId: string) {
  const { access_token } = await getToken();
  const rmtConfig = new Configuration({
    basePath: process.env.RMT_API_URL,
    accessToken: access_token,
  });

  try {
    const api = new TrackingApi(rmtConfig);
    await api.trackImpression(adId);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function createClickTrack(adId: string, sku: string) {
  const { access_token } = await getToken();
  const rmtConfig = new Configuration({
    basePath: process.env.RMT_API_URL,
    accessToken: access_token,
  });

  try {
    const api = new TrackingApi(rmtConfig);
    await api.trackClickWithSku(adId, sku);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function createOrderTrack(orderEvent: any) {
  const { access_token } = await getToken();
  const rmtConfig = new Configuration({
    basePath: process.env.RMT_API_URL,
    accessToken: access_token,
  });

  try {
    const api = new TrackingApi(rmtConfig);

    const { shopperKey, orderKey, orderedAt, lineItems } = orderEvent;
    await api.trackOrder({
      catalog_key: process.env.RMT_CATALOG_ID,
      store_key: 'acme-store-1',
      shopper_key: shopperKey,
      order_key: orderKey,
      ordered_at: orderedAt,
      line_items: lineItems,
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
}
