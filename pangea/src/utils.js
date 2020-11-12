export const formattedCurrency = (amount, currency) => {
   return amount.toLocaleString('en-US', {style: 'currency', currency })
}