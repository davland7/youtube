export const formatCurrency = (
  value: number,
  locale: string,
  currency: string,
  minimumSignificantDigits: number = 2
):string => {
  return value.toLocaleString(locale, {
    currency,
    minimumSignificantDigits,
    style: "currency",
  });
};
