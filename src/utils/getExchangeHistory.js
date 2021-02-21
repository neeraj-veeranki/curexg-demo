export default function getExchangeHistory(exchangeData) {
  const exchangeHistory = searchCurrencyCode(exchangeData);
  return exchangeHistory;
}

function searchCurrencyCode(currencyData) {
  let exchangeDates = Object.values(currencyData);
  let exchangeValues = exchangeDates.map((val) => {
    return fetchCurrencyAmount(val);
  });
  return exchangeValues;
}

function fetchCurrencyAmount(exchgData) {
  for (let key in exchgData) {
    let value = exchgData[key];
    return round(value, 5);
  }
}

function round(value, decimals) {
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
}
