import api from "./api";

export default {
  async getAllCurrencies() {
    try {
      const response = await api.get("/latest");
      console.log("response", response);
      if (!("data" in response)) {
        throw new Error("Response error, invalid data received.");
      }

      return response.data;
    } catch (error) {
      console.log("Error on getAllCurrencies\n", error);
      return {};
    }
  },

  async getExchangeRate({ baseCurrency, targetCurrency }) {
    try {
      const response = await api.get(
        `/latest?&symbols=${targetCurrency}&base=${baseCurrency}`
      );
      if (!("data" in response)) {
        throw new Error("Response error, invalid data received.");
      }
      return response.data;
    } catch (error) {
      console.log("Error on getRates\n", error);
      return null;
    }
  },

  async getConversionHistory({
    baseCurrency,
    targetCurrency,
    startDate,
    endDate
  }) {
    try {
      const response = await api.get(
        `/history?&start_at=${startDate}&end_at=${endDate}&symbols=${targetCurrency}&base=${baseCurrency}`
      );
      if (!("data" in response)) {
        throw new Error("Response error, invalid data received.");
      }
      return response.data;
    } catch (error) {
      console.log("Error on getRates\n", error);
      return null;
    }
  }
};
