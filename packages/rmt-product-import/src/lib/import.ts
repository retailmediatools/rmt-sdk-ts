import {
  Product,
  ProductsApi,
  UpdateProduct,
} from '@rmt-sdk-ts/rmt-product-service';

export interface ProductSync {
  product: Product;
  status: 'ACTIVE' | 'ARCHIVED';
}

export async function syncProducts(
  productApi: ProductsApi,
  catalogKey: string,
  products: ProductSync[],
  existingProducts: Product[],
) {
  const existingProductsLookup = new Map<string, null>(
    existingProducts.map((p) => [p.sku, null]),
  );

  return Promise.all(
    products.map(({ product, status }) => {
      const exists = existingProductsLookup.has(product.sku);
      if (status === 'ACTIVE') {
        if (exists) {
          console.log(`Updating product ${product.sku}`);
          return productApi.putProduct(
            catalogKey,
            product.sku,
            toUpdateProduct(product),
          );
        } else {
          console.log(`Adding product ${product.sku}`);
          return productApi.addProduct(catalogKey, product).catch((err) => {
            // #HACK: This is a workaround for the product service not returning archived products.
            if (err.response.status === 409) {
              console.log(
                `Found archived product with the same SKU=${product.sku}. Making it active.`,
              );
              return productApi.patchProduct(catalogKey, product.sku, {
                ...product,
                status: 'ACTIVE',
              });
            }
          });
        }
      }

      if (status === 'ARCHIVED' && exists) {
        console.log(`Deactivating product ${product.sku}`);
        return productApi.deactivateProduct(catalogKey, product.sku);
      }
    }),
  );
}

function toUpdateProduct(product: Product): UpdateProduct {
  return {
    gtins: product.gtins,
    image_url: product.image_url,
    name: product.name,
    brand: product.brand,
    base_price_cents: product.base_price_cents,
    categories: product.categories,
    import_file: product.import_file,
    custom: product.custom,
  };
}
