import {
  Ad,
  AdSet,
  AdsApi,
  Configuration,
} from '@integration-sdk-ts/rmt-ad-service';

import { getToken } from '../lib/rmt';

export async function getAds(
  placementId: string,
  shopperKey?: string
): Promise<Array<Ad>> {
  const { access_token } = await getToken();
  const rmtConfig = new Configuration({
    basePath: process.env.RMT_API_URL,
    accessToken: access_token,
  });

  try {
    const api = new AdsApi(rmtConfig);
    const res = await api.createAdSet({
      placement_id: placementId,
      ...(shopperKey ? { shopper_key: shopperKey } : {}),
    });

    console.log(res.data);

    const {
      data: { ads },
    } = res.data as any;

    return ads;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
