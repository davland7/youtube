export const formatCurrency = (value: number, locale: string, currency: string):string => {
  return value.toLocaleString(locale, {
    style: "currency",
    currency
  });
};
