//Calculation for exchange amount.
export default function getExchangeAmount(exchangeData, amount, toCountry) {
  const exchangeAmount = fetchCurrencyAmount(exchangeData, toCountry);
  return parseFloat(amount * exchangeAmount).toFixed(2);
}

function fetchCurrencyAmount(exchgData, country) {
  for (let key in exchgData) {
    let value = exchgData[key];
    if (key === country) {
      return value;
    }
  }
}
