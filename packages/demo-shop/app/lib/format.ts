const defaultCurrency = 'EUR';
const defaultLocale = 'de-DE';

export function formatMoney(x: number) {
  const formatter = new Intl.NumberFormat(defaultLocale, {
    style: 'currency',
    currency: defaultCurrency,
    minimumFractionDigits: 2,
  });

  return formatter.format(x);
}

export function formatCentsOrBlank(x: number | null | undefined) {
  return x ? formatMoney(centsToDecimal(x)) : '';
}

export function centsToDecimal(x: number | undefined) {
  return x ? x / 100 : 0;
}
