import {
  Catalog,
  ImportProduct,
  ImportSessionStatusEnum,
  Product,
} from '@rmt-sdk-ts/rmt-product-service';
import * as dotenv from 'dotenv';

import { createCatalog } from './product-service/catalogs';
import {
  createImportSession,
  getImportSessionStatus,
  importEntities,
} from './product-service/imports';
import { createProduct, getProducts } from './product-service/products';

dotenv.config();

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

// This example shows how to crete products one by one and search using simple filter.
const basicExample = async () => {
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
    'name="%pepperoni%"',
  );
  console.log('Found ' + pepperonis.data.length + ' pepperoni pizza(s)');
};

// This example shows how to import products in batches.
const batchImportExample = async () => {
  // Importing products in batches is useful when you have a large number of products to import.
  const importProducts = async (
    catalogKey: string,
    importSessionId: string,
    products: Product[],
  ) => {
    const batchSize = 1;
    const lastBatchSize = products.length % batchSize;

    const batches: ImportProduct[][] = [];
    for (let i = 0; i < products.length; i += batchSize) {
      batches.push(products.slice(i, i + batchSize));
    }
    if (lastBatchSize > 0) {
      batches.push(products.slice(products.length - lastBatchSize));
    }

    return Promise.all(
      batches.map((batch) => {
        return importEntities(catalogKey, importSessionId, {
          products: batch,
        });
      }),
    );
  };

  // Polling import session status is useful when you want to wait for the import session to complete.
  const pollImportSessionStatus = async (
    catalogKey: string,
    sessionId: string,
    timeout: number = 90000, // Timeout in milliseconds (default: 90 seconds)
  ) => {
    const startTime = Date.now();
    let status = '';
    while (status !== ImportSessionStatusEnum.Idle) {
      const { data } = await getImportSessionStatus(catalogKey, sessionId);
      status = data.status;
      console.log('Import session status:', status);
      if (Date.now() - startTime >= timeout) {
        throw new Error('Timeout exceeded');
      }
      await new Promise((resolve) => setTimeout(resolve, 10000)); // Wait for 1 second before polling again
    }
  };

  // Example code starts here
  const myCatalogKey = 'my-catalog-2';
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

  const {
    data: { id: sessionId },
  } = await createImportSession(myCatalogKey, {});

  await importProducts(myCatalogKey, sessionId, myNewProducts);

  await pollImportSessionStatus(myCatalogKey, sessionId);

  console.log('Import session completed');

  const pepperonis = await getProducts(
    myCatalogKey,
    undefined,
    'name="%pepperoni%"',
  );
  console.log('Found ' + pepperonis.data.length + ' pepperoni pizza(s)');
};

const fn = async () => {
  await basicExample();
  await batchImportExample();
};

fn().then(() => console.log('Done'));
