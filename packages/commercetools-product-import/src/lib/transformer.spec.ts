import { Product as CtProduct, ProductData } from '@commercetools/platform-sdk';
import { ProductSync, transform } from '@rmt-sdk-ts/rmt-product-import';

import { CtpTransformer } from './transformer';

describe('transform commercetools product data to rmt product data', () => {
  const locale = 'en';

  const categories = new Map<string, string>([
    ['a4509344-c118-41b0-ae80-a937dde90d8a', 'Milk, Cheese & Eggs'],
    ['33f64075-3d88-4b23-abe5-af8caadb343a', 'Frozen'],
    ['bf35e3af-eacb-4e92-8c03-91125f6ccad0', 'Bread & Bakery'],
  ]);

  const ctProduct1: CtProduct = {
    id: '1e6613c2-cf6f-4eb2-8724-82016a0fe297',
    version: 4,
    createdAt: '2022-07-14T08:03:42.506Z',
    lastModifiedAt: '2022-08-02T14:26:35.356Z',
    productType: {
      typeId: 'product-type',
      id: 'f4f2bfc0-e76d-4705-912f-223520571ccc',
    },
    masterData: {
      current: {
        name: { en: 'Pizza, Classic Crust, Pepperoni' },
        categories: [
          {
            typeId: 'category',
            id: '33f64075-3d88-4b23-abe5-af8caadb343a',
          },
        ],
        categoryOrderHints: {},
        slug: { en: 'red-baron-pizza-classic-crust-pepperoni' },
        masterVariant: {
          id: 1,
          sku: '10050',
          prices: [
            {
              id: '309d5033-1b79-4ff9-acef-146a8803c854',
              value: {
                type: 'centPrecision',
                currencyCode: 'EUR',
                centAmount: 739,
                fractionDigits: 2,
              },
              country: 'DE',
            },
          ],
          images: [
            {
              url: 'https://shop.retailmediatools.com/wp-content/uploads/2022/06/10092.webp',
              label: '',
              dimensions: {
                w: 0,
                h: 0,
              },
            },
          ],
          attributes: [
            {
              name: 'Brand',
              value: "Pepperoni's",
            },
          ],
          assets: [],
        },
        variants: [],
        searchKeywords: {},
      },
      staged: {} as ProductData,
      published: false,
      hasStagedChanges: false,
    },
  };

  it.each<
    [CtProduct[] | Record<string, never>[] | null | undefined, ProductSync[]]
  >([
    [undefined, [undefined]],
    [null, [undefined]],
    [[undefined], [undefined]],
    [[null], [undefined]],
    [[{}], [undefined]],
    [
      [ctProduct1],
      [
        {
          product: {
            sku: '10050',
            name: 'Pizza, Classic Crust, Pepperoni',
            image_url:
              'https://shop.retailmediatools.com/wp-content/uploads/2022/06/10092.webp',
            brand: "Pepperoni's",
            base_price_cents: 739,
            categories: [
              {
                category_key: '33f64075-3d88-4b23-abe5-af8caadb343a',
                category_name: 'Frozen',
              },
            ],
          },
          status: 'ARCHIVED',
        },
      ],
    ],
  ])('transform(%p, %p)', (input, expected) => {
    const t = new CtpTransformer(locale, categories);
    expect(transform(t, input)).toEqual(expected);
  });
});
