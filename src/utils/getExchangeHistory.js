// Utiloty for getting exchange history based on data received.  
export default function getExchangeHistory(exchangeData) {
  const exchangeHistory = searchCurrencyCode(exchangeData);
  return exchangeHistory;
}

//Search for currency code and loop through the values.
function searchCurrencyCode(currencyData) {
  let exchangeDates = Object.values(currencyData);
  let exchangeValues = exchangeDates.map((val) => {
    return fetchCurrencyAmount(val);
  });
  return exchangeValues;
}

// Getting amount from the data received and rounding off to 5 digits.
function fetchCurrencyAmount(exchgData) {
  for (let key in exchgData) {
    let value = exchgData[key];
    return round(value, 5);
  }
}

// Function to round off to five digits.
function round(value, decimals) {
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
}
