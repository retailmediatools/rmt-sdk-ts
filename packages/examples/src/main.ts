import { Catalog, Product } from '@rmt-sdk-ts/rmt-product-service';
import * as dotenv from 'dotenv';

import { createCatalog } from './product-service/catalogs';
import { createProduct, getProducts } from './product-service/products';

dotenv.config();

const fn = async () => {
  const myCatalogKey = 'my-catalog';
  const myNewCatalog: Catalog = {
    catalog_key: myCatalogKey,
  };

  try {
    await createCatalog(myNewCatalog);
  } catch (e: any) {
    if (e.response?.status === 409) {
      console.log('Catalog already exists');
    } else {
      throw e;
    }
  }

  const myNewProducts: Product[] = [
    {
      sku: 'PIZZAMARGHERITA',
      name: 'Frozen Pizza Margherita',
      brand: 'My Frozen Pizza Brand',
      categories: [
        {
          category_key: 'pizza-1',
          category_name: 'Pizza',
        },
        {
          category_key: 'frozen-1',
          category_name: 'Frozen',
        },
      ],
    },
    {
      sku: 'PIZZAPEPPERONI',
      name: 'Frozen Pizza Pepperoni',
      brand: 'My Frozen Pizza Brand',
      categories: [
        {
          category_key: 'pizza-1',
          category_name: 'Pizza',
        },
        {
          category_key: 'frozen-1',
          category_name: 'Frozen',
        },
      ],
    },
  ];

  try {
    await createProduct(myCatalogKey, myNewProducts[0]);
  } catch (e: any) {
    if (e.response?.status === 409) {
      console.log('Product already exists');
    } else {
      throw e;
    }
  }

  try {
    await createProduct(myCatalogKey, myNewProducts[1]);
  } catch (e: any) {
    if (e.response?.status === 409) {
      console.log('Product already exists');
    } else {
      throw e;
    }
  }

  const products = await getProducts(myCatalogKey);
  console.log(products.data.map((product) => product.name));

  const pepperonis = await getProducts(
    myCatalogKey,
    undefined,
    'name="%pepperoni%"'
  );
  console.log('Found ' + pepperonis.data.length + ' pepperoni pizza(s)');
};

fn().then(() => console.log('Done'));
