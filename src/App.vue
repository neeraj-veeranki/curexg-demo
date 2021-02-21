<template>
  <div id="app">
    <h1 class="title">Currency Exchange Calculator</h1>
    <HomePage />

    <div class="chart-container" id="chartContainer">
      <LineChart v-if="chartData && !onLoading" :chartData="chartData" />
    </div>

    <LoadingView :state="onLoading" />
  </div>
</template>

<script>
import { HomePage, LineChart, LoadingView } from "@/components";

import { mapState } from "vuex";
export default {
  name: "App",
  components: { HomePage, LineChart, LoadingView },
  computed: {
    ...mapState(["chartData", "onLoading"]),
    
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
</style>
