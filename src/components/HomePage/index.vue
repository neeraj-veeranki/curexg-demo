<template>
  <div class="input-group">
    <label for="from">From:</label>
    <select id="from" class="input input-currency" v-model="currencyCodeFrom">
      <option
        v-for="currency in currenciesOptions"
        :key="currency"
        :value="currency"
      >
        {{ currency }}
      </option>
    </select>

    <label for="to">To:</label>
    <select id="to" class="input input-currency" v-model="currencyCodeTo">
      <option
        v-for="currency in currenciesOptions"
        :key="currency"
        :value="currency"
      >
        {{ currency }}
      </option>
    </select>
    <label for="from">Amount:</label>
    <input
      type="number"
      id="from"
      class="input input-currency"
      v-model="amount"
    />
    <label for="from">ExchangeValue:</label>
    <input
      type="number"
      id="from"
      class="input input-currency"
      v-model="exchangeAmount"
      readonly
    />
    <button type="button" class="button" @click="handleGetCurrencyRates">
      Convert
    </button>

    <button type="button" class="button" @click="handleGetCurrencyRatesHistory">
      Exchange rate History
    </button>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { getDateBeforeDays } from "@/utils";

export default {
  name: "HomePage",
  data() {
    return {
      amount: 0,
    };
  },
  created() {
    this.getCurrenciesOptions();
  },

  methods: {
    ...mapActions([
      "getCurrenciesOptions",
      "getCurrencyRates",
      "getConversionByDate",
      "getHistoricData",
    ]),

    handleGetCurrencyRates() {
      const { currencyCodeFrom, currencyCodeTo, amount } = this;

      this.getCurrencyRates({
        baseCurrency: currencyCodeFrom,
        targetCurrency: currencyCodeTo,
        amount,
      });
    },

    handleGetCurrencyRatesHistory() {
      const startDate = getDateBeforeDays(5);
      const { currencyCodeFrom, currencyCodeTo } = this;
      this.getHistoricData({
        baseCurrency: currencyCodeFrom,
        targetCurrency: currencyCodeTo,
        startDate,
      });
    },
  },

  computed: {
    ...mapState(["currenciesOptions"]),

    currencyCodeTo: {
      set(newValue) {
        this.$store.commit("setCurrencyCode", { newValue, key: "to" });
      },
      get() {
        return this.$store.state.currencyCode.to;
      },
    },
    currencyCodeFrom: {
      set(newValue) {
        this.$store.commit("setCurrencyCode", { newValue, key: "from" });
      },
      get() {
        return this.$store.state.currencyCode.from;
      },
    },
    exchangeAmount: {
      set(newValue) {
        this.$store.commit("setExchangeAmount", newValue);
      },
      get() {
        return this.$store.state.exchangeAmount;
      },
    },
  },
};
</script>

<style scoped lang="scss">
.input-group {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 1rem 0;
  padding: 0 1rem;
  color: #2c3e50;

  > .input {
    width: 100%;
    margin: 1rem;
    margin-top: 0.5rem;
    height: 3rem;
    font-size: 1.2rem;
    padding: 0 0.5rem;
    border: #2c3e50 solid 2px;
    &.input-currency {
      max-width: 500px;
    }
  }

  > .button {
    width: 100%;
    max-width: 200px;
    margin: 1rem;
    height: 3rem;
    padding: 0 0.5rem;
    font-weight: bold;
    color: #ffff;
    background-color: #3599eb;
    border: #3599eb solid 2px;
    transition: filter ease 200ms;
    &:hover {
      filter: brightness(110%);
    }
  }
}
</style>
