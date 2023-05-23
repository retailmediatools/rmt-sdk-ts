import {
  Product,
  ProductsApi,
} from '@integration-sdk-ts/rmt-product-service';

export async function* fetchProducts(
  productApi: ProductsApi,
  catalogKey: string
) {
  const limit = 100;
  let cursor = undefined;
  let fetchNext = true;
  while (fetchNext) {
    const res = await productApi.getProducts(
      catalogKey,
      undefined,
      undefined,
      limit,
      cursor
    );
    const { data } = res;

    fetchNext = !!data.page_info.next_cursor;
    cursor = data.page_info.next_cursor;

    yield data.data as Product[];
  }
}
