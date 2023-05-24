import { Product } from '@rmt-sdk-ts/rmt-product-service';
import { LoaderFunction, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import axios from 'axios';
import { useEffect, useMemo } from 'react';

import { formatCentsOrBlank } from '../lib/format';
import { getAds } from '../models/ad.server';
import { getProducts, getProductsBySku } from '../models/product.server';

type LoaderData = {
  shopperKey: string | undefined;
  ads: Awaited<ReturnType<typeof getAds>>;
  bannerAds: Awaited<ReturnType<typeof getAds>>;
  products: Awaited<ReturnType<typeof getProducts>>;
  sponsored: Awaited<ReturnType<typeof getProducts>>;
};

export const loader: LoaderFunction = async ({ params }) => {
  const res: LoaderData = {
    shopperKey: undefined,
    ads: [],
    bannerAds: [],
    products: [],
    sponsored: [],
  };

  try {
    res.products = await getProducts();
  } catch (error) {
    console.log(error);
  }

  const shopperKey = `shopper-${Math.round(Math.random() * 1000000)}`;
  try {
    const placementId = process.env.RMT_PLACEMENT_ID || '';
    res.ads = await getAds(placementId, shopperKey);
  } catch (error) {
    console.log(error);
  }

  res.shopperKey = shopperKey;

  try {
    const placementId = process.env.RMT_BANNER_PLACEMENT_ID || '';
    res.bannerAds = await getAds(placementId);
  } catch (error) {
    console.log(error);
  }

  const skus = res.ads.map((ad) => ad.advertised_skus.map((sku) => sku)).flat();
  try {
    res.sponsored = await getProductsBySku(skus);
  } catch (error) {
    console.log(error);
  }

  return json(res);
};

export default function Index() {
  const { shopperKey, ads, bannerAds, products, sponsored } =
    useLoaderData() as LoaderData;

  useEffect(() => {
    if (ads.length === 0) {
      return;
    }

    axios.post('/track/i', { ad_id: ads[0].id }, { responseType: 'blob' });
  }, []);

  useEffect(() => {
    if (bannerAds.length === 0) {
      return;
    }

    axios.post(
      '/track/i',
      { ad_id: bannerAds[0].id },
      { responseType: 'blob' }
    );
  }, []);

  const onProductClick = (adId: string, sku: string) => {
    axios.post('/track/c', { ad_id: adId, sku }, { responseType: 'blob' });
  };

  const onPurchaseClick = (
    adId: string | null,
    sku: string,
    paidPriceTotalCents: number | null | undefined
  ) => {
    axios.post(
      '/track/o',
      {
        shopper_key: shopperKey,
        ad_id: adId,
        sku,
        paid_price_total_cents: paidPriceTotalCents,
      },
      { responseType: 'blob' }
    );
  };

  return (
    <>
      <div className="max-w-2xl px-4 py-16 mx-auto sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="mb-6 text-3xl font-bold text-cyan-500">
          Acme Inc. Shop
        </h1>
        <div className="">
          {bannerAds.length > 0 && (
            <>
              {bannerAds[0].creative_url && (
                <img src={bannerAds[0].creative_url} alt="Ad" className="" />
              )}
              {bannerAds[0].headline && (
                <h2 className="mb-6 text-sm font-bold text-cyan-500">
                  {bannerAds[0].headline}
                </h2>
              )}
              {bannerAds[0].link_url && (
                <a
                  href={bannerAds[0].link_url}
                  className="mb-6 text-sm font-bold text-cyan-500"
                >
                  Learn More
                </a>
              )}
            </>
          )}
        </div>
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {ads.map((ad) =>
            sponsored.map((product) => (
              <div className="flex flex-col items-start gap-2">
                <a
                  href="#"
                  className="group"
                  key={product.sku}
                  onClick={() => onProductClick(ad.id, product.sku)}
                >
                  <div className="w-full overflow-hidden bg-gray-200 rounded-lg aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8">
                    <img
                      src={product.image_url || ''}
                      alt="Tall slender porcelain bottle with natural clay textured body and cork stopper."
                      className="object-cover object-center w-full h-full group-hover:opacity-75"
                    />
                  </div>
                  <h4 className="mt-4 text-[10px] font-bold text-orange-700 uppercase">
                    Sponsored
                  </h4>
                  <h3 className="text-sm text-gray-700">{product.name}</h3>
                  <p className="mt-1 text-[8px] text-gray-500">{product.sku}</p>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    {formatCentsOrBlank(product.base_price_cents)}
                  </p>
                </a>
                <button
                  className="p-2 text-white bg-indigo-400 rounded-md shadow-sm"
                  onClick={() =>
                    onPurchaseClick(
                      ad.id,
                      product.sku,
                      product.base_price_cents
                    )
                  }
                >
                  1-Click-Buy
                </button>
              </div>
            ))
          )}
          {products.map((product) => (
            <div className="flex flex-col items-start gap-2">
              <a href="#" className="group" key={product.sku}>
                <div className="w-full overflow-hidden bg-gray-200 rounded-lg aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8">
                  <img
                    src={product.image_url || ''}
                    alt="Tall slender porcelain bottle with natural clay textured body and cork stopper."
                    className="object-cover object-center w-full h-full group-hover:opacity-75"
                  />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                <p className="mt-1 text-[8px] text-gray-500">{product.sku}</p>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  {formatCentsOrBlank(product.base_price_cents)}
                </p>
              </a>
              <button
                className="p-2 text-white bg-indigo-400 rounded-md shadow-sm"
                onClick={() =>
                  onPurchaseClick(null, product.sku, product.base_price_cents)
                }
              >
                1-Click-Buy
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
