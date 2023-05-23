import { ActionFunction } from 'remix';

import { createImpressionTrack } from '../../models/tracking.server';

export const action: ActionFunction = async ({ request }) => {
  const { ad_id: adId } = await request.json();
  await createImpressionTrack(adId);

  return new Response(null, {
    status: 200,
  });
};
