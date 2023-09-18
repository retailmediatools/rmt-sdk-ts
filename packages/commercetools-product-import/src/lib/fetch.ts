import { Configuration, getApiRoot } from './client';

export async function* fetchObjects(fetchFn, ctpConfig) {
  const limit = 100;
  let afterId = undefined;
  let fetchNext = true;
  while (fetchNext) {
    const categoriesRes = await fetchFn(ctpConfig, limit, afterId);
    const {
      body: { results },
    } = categoriesRes;

    fetchNext = results.length === limit;
    afterId = results[results.length - 1].id;

    yield results;
  }
}

export function fetchProductProjections(
  config: Configuration,
  limit = 100,
  afterId = '',
) {
  const apiRoot = getApiRoot(config);
  return apiRoot
    .productProjections()
    .get({
      queryArgs: {
        localeProjection: 'en',
        withTotal: false,
        limit,
        sort: 'id',
        ...(afterId && { where: `id>"${afterId}"` }),
      },
    })
    .execute();
}

export function fetchProducts(
  config: Configuration,
  limit = 100,
  afterId = '',
) {
  const apiRoot = getApiRoot(config);
  return apiRoot
    .products()
    .get({
      queryArgs: {
        localeProjection: 'en',
        withTotal: false,
        limit,
        sort: 'id',
        ...(afterId && { where: `id>"${afterId}"` }),
      },
    })
    .execute();
}

export function fetchCategories(
  config: Configuration,
  limit = 100,
  afterId = '',
) {
  const apiRoot = getApiRoot(config);
  return apiRoot
    .categories()
    .get({
      queryArgs: {
        localeProjection: 'en',
        withTotal: false,
        limit,
        sort: 'id',
        ...(afterId && { where: `id>"${afterId}"` }),
      },
    })
    .execute();
}
