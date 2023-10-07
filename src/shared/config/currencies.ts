export const currencies = [
  {
    code: 'USD', before: true, min: 100, max: 1000000,
  },
  {
    code: 'EUR', before: true, min: 94, max: 943350,
  },
  {
    code: 'AED', before: true, min: 367, max: 3673042,
  },
  {
    code: 'RUB', before: false, min: 10605, max: 106050358,
  },
  {
    code: 'UAH', before: false, min: 3648, max: 36485829,
  },
];

export const buildAmountWithCurrency = (amount: number, currencyCode: string) => {
  const currency = currencies.find(({ code }) => code === currencyCode) || currencies[0];

  return currency.before
    ? `${currency.code} ${amount}`
    : `${amount} ${currency.code}`;
};
