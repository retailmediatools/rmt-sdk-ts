import { Product } from '@rmt-sdk-ts/rmt-product-service';

import { ProductSync } from './import';
import { Transformer, transform } from './transform';

describe('transform input data using a tee transformer function to the RMT products', () => {
  class TeeTransformer implements Transformer {
    fn(record: unknown): ProductSync[] | undefined {
      if (typeof record === 'undefined') {
        return undefined;
      }

      return [{ product: record as unknown as Product, status: 'ACTIVE' }];
    }
  }

  it.each<
    [
      (
        | { [key: string]: string | number | undefined }[]
        | Record<string, never>[]
        | undefined
      ),
      ProductSync[],
    ]
  >([
    [undefined, []],
    [[], []],
    [[{}], [{ product: {} as Product, status: 'ACTIVE' }]],
    [
      [{ sku: 'ABC123', name: 'Apples' }],
      [{ product: { sku: 'ABC123', name: 'Apples' }, status: 'ACTIVE' }],
    ],
    [
      [
        { sku: 'ABC123', name: 'Apples' },
        { sku: 'XYZ987', name: 'Oranges' },
      ],
      [
        { product: { sku: 'ABC123', name: 'Apples' }, status: 'ACTIVE' },
        { product: { sku: 'XYZ987', name: 'Oranges' }, status: 'ACTIVE' },
      ],
    ],
  ])('transform(%p, %p)', (input, expected) => {
    const t = new TeeTransformer();
    expect(transform(t, input)).toEqual(expected);
  });
});
