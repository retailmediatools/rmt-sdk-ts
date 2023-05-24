![CI](https://github.com/retailmediatools/rmt-sdk-ts/actions/workflows/main-branch.yml/badge.svg?branch=main)

# retailmediatools Integration SDK

The SDK comprises TypeScript libraries, apps and tools that simplify importing product information into the retailmediatools platform.

The main goal of this SDK is to streamline integration efforts, providing developers an SDK to quickly and efficiently integrate with our platform.

It also offers platform's REST API clients and usage examples.

## Features

- **Product Import:** Tools for importing product information into our platform. It includes functions and utilities to handle data mapping, validation, and bulk import.
- **RMT API Client:** TypeScript client for the platform's REST API. It simplifies the interaction with API endpoints and ensures smoother integration.
- **Examples:** Set of examples that showcase how to interact with the platform's REST API. These examples cover many functionalities, including authentication, CRUD operations, and advanced search capabilities.

  Find the examples in the `packages/examples` folder.

## Getting Started

Follow the steps below to get started with the TypeScript Integration SDK:

1. **Prerequisites:** Before you begin, ensure that you have the following prerequisites in place:

   - **Node.js:** The SDK requires Node.js version 14 or higher.
   - **Yarn:** The SDK uses Yarn as its package manager.
   - **retailmediatools Account:** You will need a retailmediatools account to access the platform's REST API. If you don't have an account please [contact us](https://www.retailmediatools.com/).

2. **Clone the repo:** Start by cloning the SDK repository.
3. **Installation:** You can install it via npm or yarn by running the following command:

   ```shell
   yarn install
   ```

   or

   ```shell
   npm install
   ```

## Usage

### Importing Products

To import product data into our platform, you need to implement the import script.

The SDK offers essential packages that enable you to implement the sync with just a few lines of code.

Please look at the documentation and examples to use the import functionality effectively and guide you through the process.

#### Prepare the app

1. **Genereate app scaffold:** Start with creating a new application using the following command:

   ```shell
   nx generate @nx/node:application my-product-import --unitTestRunner=none --e2eTestRunner=none
   ```

2. **Create a `.env` file** Put inside the following info to configure authentication and the API client:

   ```shell
   # Client ID and secret for the RMT platform
   RMT_AUTH_CLIENT_ID=
   RMT_AUTH_CLIENT_SECRET=
   # Auth URL for the RMT platform
   RMT_AUTH_URL=
   # URL for the RMT platform
   RMT_API_URL=
   # The catalog key where the products will be imported
   RMT_CATALOG_KEY=
   ```

#### Implement the import script

1. **Fetch token:** Implement the code to fetch the authentication token from the platform. Use `getToken` from `packages/rmt-product-import`.
2. **Fetch source products:** Fetch products from your source. You will need to implement this function.
3. **Fetch existing products:** Fetch existing products from the platform. Use `fetchProducts` from `packages/rmt-product-import`.
4. **Transform products:** Implement the respective interface plug in data model transformation into the sync. Use the `Transformer` interface from `packages/rmt-product-import`. For example:

   ```typescript
   import { Transformer, TransformerFunction } from '@rmt-sdk-ts/rmt-product-import';

   export class MyTransformer implements Transformer {
     fn: TransformerFunction = (record: unknown) => {
       if (!record || typeof record !== 'object') {
         return [undefined];
       }

       const { name, sku, price, imageUrl, brand, categories, isPublished } = record as MyProduct;

       const status = isPublished ? 'ACTIVE' : 'ARCHIVED';

       return [
         {
           product: {
             sku,
             name,
             base_price_cents: basePriceCents,
             image_url: imageUrl,
             brand,
             categories,
           },
           status,
         },
       ];
     };
   }
   ```

5. **Sync products:** Call the respective SDK function to sync products with the platform. Use `syncProducts` from `packages/rmt-product-import`.

**Please refer to the provided documentation and examples for more details:** `packages/examples/src/product-import/commercetools` and `packages/commercetools-product-import/src/lib` folders contain a collection of practical code examples that demonstrate how to utilize the SDK.

#### Example

The following code snippet demonstrates how the import app can be implemented:

```typescript
import { fetchProducts, getToken, syncProducts, transform } from '@rmt-sdk-ts/rmt-product-import';
import { Configuration, ProductsApi } from '@rmt-sdk-ts/rmt-product-service';

// Prepare the Product API client
const token = await getToken();
const rmtConfig = new Configuration({
  basePath: process.env.RMT_API_URL,
  accessToken: token,
});
const productsApi = new ProductsApi(rmtConfig);

// Fetch existing products from your source
const myProducts = fetchMyProducts();

// Fetch existing products from the RMT API
let existingProducts = [];
for await (const products of fetchProducts(productsApi, myCatalogKey)) {
  // Add custom logic here to skip products that should not be updated
  existingProducts = existingProducts.concat(products);
}

// Transform your products to the RMT format
const myTransformer = new MyTransformer(locale, categories);
const products = transform(myTransformer, myProducts);

// Initiate the import process
await syncProducts(productsApi, myCatalogKey, products, existingProducts);
```

### REST API Integration

TypeScript clients to integrate with the platform's REST API.

- `packages/rmt-product-service`
- `packages/rmt-tracking-service`
- `packages/rmt-ad-service`

Use the provided examples to grasp the necessary API endpoints, request formats, and authentication mechanisms. Feel free to customize the examples according to your specific requirements and seamlessly incorporate them into your project.

### Demo Shop

An example `packages/demo-shop` of a web application that uses our API to fetch banner ads and sponsored products.

### Customization and Extension

The SDK is designed to be highly flexible and customizable. You can extend its functionalities or modify the provided code snippets to suit your integration needs.

We invite you to contribute to the open-source community by submitting pull requests for enhancements or additional features you develop.

## Documentation

For more detailed information about the usage, please refer to the provided examples and code samples. They offer practical demonstrations and illustrate how to effectively utilize the SDK.

Contact us to get access the complete set of documentation resources.

## Community and Support

[Contact us](https://www.retailmediatools.com/) to get access the complete set of documentation resources.

## License

The TypeScript Integration SDK is released under the [MIT License](https://github.com/retailmediatools/rmt-sdk-ts/blob/main/LICENSE). You are free to use, modify, and distribute this SDK as per the terms of the license.

---

We trust that the TypeScript Integration SDK will be a valuable asset in seamlessly integrating your products with our platform.

If you encounter any issues or have questions, please get in touch with our support team.

Happy integrating!
