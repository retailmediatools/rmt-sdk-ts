import { ActionFunction } from 'remix';

import { createClickTrack } from '../../models/tracking.server';

export const action: ActionFunction = async ({ request }) => {
  const { ad_id: adId, sku } = await request.json();
  await createClickTrack(adId, sku);

  return new Response(null, {
    status: 200,
  });
};
