export const currencies = [
  {
    code: 'USD', before: true, min: 1, max: 10000,
  },
  {
    code: 'EUR', before: true, min: 0.94, max: 9433.5,
  },
  {
    code: 'AED', before: true, min: 3.67, max: 36730.42,
  },
  {
    code: 'RUB', before: false, min: 106.05, max: 1060503.58,
  },
  {
    code: 'UAH', before: false, min: 36.48, max: 364858.29,
  },
];

export const buildAmountWithCurrency = (amount: number, currencyCode: string) => {
  const currency = currencies.find(({ code }) => code === currencyCode) || currencies[0];

  const convertedAmount = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  return currency.before
    ? `${currency.code} ${convertedAmount}`
    : `${convertedAmount} ${currency.code}`;
};
