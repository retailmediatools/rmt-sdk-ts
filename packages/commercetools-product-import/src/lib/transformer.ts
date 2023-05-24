import { Product } from '@commercetools/platform-sdk';
import {
  Transformer,
  TransformerFunction,
} from '@rmt-sdk-ts/rmt-product-import';

export class CtpTransformer implements Transformer {
  protected locale: string;
  protected categories = new Map<string, string>();
  protected brandAttributeName = 'Brand';

  constructor(locale: string, categories: Map<string, string>) {
    this.locale = locale;
    this.categories = categories;
  }

  fn: TransformerFunction = (record: unknown) => {
    if (!record || typeof record !== 'object') {
      return [undefined];
    }

    if (
      !Object.prototype.hasOwnProperty.call(record, 'id') ||
      !Object.prototype.hasOwnProperty.call(record, 'masterData')
    ) {
      return [undefined];
    }

    const {
      masterData: {
        current: {
          masterVariant: { sku, prices, images, attributes },
          name: localizedName,
          categories: ctpCategories,
        },
        published,
      },
    } = record as Product;

    const name = localizedName[this.locale];

    const basePriceCents =
      Array.isArray(prices) && prices.length > 0 && prices[0].value
        ? prices[0].value.centAmount
        : undefined;

    const imageUrl =
      Array.isArray(images) && images.length > 0 && images[0].url
        ? images[0].url
        : undefined;

    const brandAttribute =
      Array.isArray(attributes) && attributes.length > 0
        ? attributes.find((attr) => attr.name === this.brandAttributeName)
        : undefined;
    const brand = brandAttribute ? brandAttribute.value : undefined;

    const categories = Array.isArray(ctpCategories)
      ? ctpCategories.map((c) => ({
          category_key: c.id,
          category_name: this.categories.get(c.id) || undefined,
        }))
      : undefined;

    const status = published ? 'ACTIVE' : 'ARCHIVED';

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
