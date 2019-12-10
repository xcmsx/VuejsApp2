<template>
  <div class="chart-view">
    <div class="chart-window">
      <div class="exit-view" @click="closeMe()">
        Press here to go back
      </div>
      <div class="tradingview-widget-container">
        <div id="tradingview_ddfac">
          <div class="loadingChart">
            Connecting to:
          </div>
        </div>
        <div class="tradingview-widget-copyright" style="color: #dfe6e9;">
          <a
            :href="'https://www.tradingview.com/symbols/' + ticker"
            style="color: #dfe6e9;"
            rel="noopener"
            target="_blank"
            ><span class="blue-text">{{ ticker }} Chart</span></a
          >
          by TradingView
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChartView",
  props: ["ticker"],
  components: {},
  data: function() {
    return {};
  },
  methods: {
    reloadChart: function() {
      new TradingView.widget({
        width: document.getElementsByClassName("chart-view")[0].offsetWidth,
        height:
          document.getElementsByClassName("chart-view")[0].offsetHeight - 50,
        symbol: this.ticker,
        interval: "D",
        timezone: "Etc/UTC",
        theme: "Light",
        style: "1",
        locale: "en",
        toolbar_bg: "#f1f3f6",
        enable_publishing: false,
        allow_symbol_change: true,
        container_id: "tradingview_ddfac"
      });
    },
    closeMe: function() {
      this.$emit("close-chart");
    }
  },
  watch: {
    ticker: function() {
      this.reloadChart();
    }
  },
  mounted: function() {
    this.reloadChart();
  },
  created() {
    window.addEventListener("resize", this.reloadChart);
  },
  destroyed() {
    window.removeEventListener("resize", this.reloadChart);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chart-view {
  position: absolute;
  top: 10%;
  left: 10%;
  right: 10%;
  bottom: 10%;
  z-index: 5000;
}
.chart-window {
  position: absolute;
  background: #2d3436;
  box-shadow: 0 0 15px #000000;
  border-radius: 5px;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
}
.exit-view {
  height: 50px;
  background-color: #d63031;
  color: #dfe6e9;
  padding-top: 16px;
  box-sizing: border-box;
  cursor: pointer;
}
.loadingChart {
  padding-top: 100px;
  padding-bottom: 1em;
  color: #dfe6e9;
}
@media only screen and (max-width: 768px) {
  .chart-view {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>
