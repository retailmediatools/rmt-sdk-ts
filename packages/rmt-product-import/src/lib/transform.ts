import { ProductSync } from './import';

export type TransformerFunction = (
  record: unknown,
) => (ProductSync | undefined)[];

export interface Transformer {
  fn: TransformerFunction;
}

export function transform(t: Transformer, input: unknown[]): ProductSync[] {
  if (typeof input === 'undefined') {
    return [];
  }

  if (!Array.isArray(input)) {
    return [];
  }

  const transformed = input.map(t.fn);

  let res = [];
  for (const t of transformed) {
    res = res.concat(t.filter((item) => typeof item !== 'undefined'));
  }

  return res;
}
