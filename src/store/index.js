import Vue from "vue";
import Vuex from "vuex";
import currencyServices from "@/services";
import {
  getDateBeforeDays,
  getExchangeAmount,
  getExchangeHistory
} from "@/utils";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currencyCode: {
      to: "USD",
      from: "EUR"
    },
    exchangeAmount: 0,
    startDate: getDateBeforeDays(),
    currenciesOptions: [],
    chartData: null,
    onLoading: false
  },

  mutations: {
    setCurrencyCode(state, { newValue, key }) {
      if (key === "to" || key === "from") {
        state.currencyCode[key] = newValue;
      }
    },
    setExchangeAmount(state, newValue) {
      state.exchangeAmount = newValue;
    },
    setCurrenciesOptions(state, newValue) {
      state.currenciesOptions = newValue;
    },
    setChartData(state, newValue) {
      state.chartData = newValue;
    },
    setLoading(state, newValue) {
      if (newValue) state.onLoading = newValue;
      else setTimeout(() => (state.onLoading = newValue), 500); //minimum waiting time
    }
  },

  actions: {
    async getCurrenciesOptions({ commit }) {
      commit("setLoading", true);
      const currencies = await currencyServices.getAllCurrencies();
      const countryList = [];
      countryList.push(currencies.base);
      for (let code in currencies.rates) {
        countryList.push(code);
      }
      commit("setCurrenciesOptions", countryList);
      commit("setLoading", false);
    },
    async getCurrencyRates(
      { commit },
      { baseCurrency, targetCurrency, amount }
    ) {
      commit("setLoading", true);
      commit("setChartData", null);
      const exchangeData = await currencyServices.getExchangeRate({
        baseCurrency,
        targetCurrency
      });
      const money = getExchangeAmount(
        exchangeData.rates,
        amount,
        targetCurrency
      );
      commit("setExchangeAmount", money);
      commit("setLoading", false);
    },
    async getHistoricData(
      { commit },
      { baseCurrency, targetCurrency, startDate }
    ) {
      commit("setLoading", true);
      // Setting end date to yesterday
      const endDate = getDateBeforeDays(0);
      const exchangeData = await currencyServices.getConversionHistory({
        baseCurrency,
        targetCurrency,
        startDate,
        endDate
      });
      const exchgHistory = getExchangeHistory(exchangeData.rates);
      const exchgDates = Object.keys(exchangeData.rates);
      //Setting chart data
      commit("setChartData", {
        title: `${baseCurrency} to ${targetCurrency} Chart`,
        labels: exchgDates,
        datasets: [
          {
            label: `${baseCurrency} to ${targetCurrency}`,
            data: exchgHistory,
            backgroundColor: "rgba(0, 0, 0, 0.0)",
            borderColor: "#3599eb",
            lineTension: 0,
            pointBorderColor: "##0a395e",
            pointBackgroundColor: "##0a395e"
          }
        ]
      });
      commit("setLoading", false);
    }
  }
});
