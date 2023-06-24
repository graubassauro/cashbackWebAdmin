export function formatCurrency(
  amount: number,
  country: string,
  currency: string,
) {
  const formattedCurrency = new Intl.NumberFormat(country, {
    style: 'currency',
    currency,
  }).format(amount)

  return formattedCurrency
}
