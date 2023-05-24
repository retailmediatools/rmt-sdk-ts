import { ActionFunction } from 'remix';

import { createOrderTrack } from '../../models/tracking.server';

let index = 1;

export const action: ActionFunction = async ({ request }) => {
  const {
    shopper_key: shopperKey,
    ad_id: adId,
    sku,
    paid_price_total_cents: paidPriceTotalCents,
  } = await request.json();

  const orderEvent = {
    shopperKey: shopperKey,
    orderKey: `order-${index}`,
    orderedAt: new Date().toISOString(),
    lineItems: [
      {
        // ad_id: adId,
        sku: sku,
        quantity: 1,
        paid_price_total_cents: paidPriceTotalCents,
      },
    ],
  };
  await createOrderTrack(orderEvent);

  index += 1;

  return new Response(null, {
    status: 200,
  });
};
