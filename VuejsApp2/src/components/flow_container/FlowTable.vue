<template>
  <div class="flow-table">
    <!-- <div class="flow-table"> -->
    <div class="loading" v-if="liveData.length < 1 && !error">
      Loading data...
    </div>
    <div class="loading error" v-if="liveData.length < 1 && error">
      Can't establish a connection to the server.<br />Please try again later.
    </div>
    <FlowRow
      v-for="row in filteredData"
      :row-data="row"
      :key="
        row.symbol +
          row.time +
          row.optionType.toUpperCase() +
          row.expiry +
          row.size +
          row.price +
          row.spot +
          row.dataSig +
          row.type.toUpperCase()
      "
      @chart="viewChart(row.symbol)"
    />
  </div>
</template>

<script>
import FlowRow from "./FlowRow.vue";

export default {
  name: "FlowTable",
  props: ["search", "filter", "sort"],
  components: { FlowRow },
  data: function() {
    return {
      liveData: [],
      dataConnection: false,
      error: null
    };
  },
  sockets: {
    connect: function() {
      this.dataConnection = true;
      this.$emit("connected");
    },
    disconnect: function() {
      this.dataConnection = false;
      this.$emit("disconnected");
    },
    listNewOrder: function(data) {
      this.liveData.unshift(data.message);
      if (this.liveData.length > 500) this.liveData.pop();
      var order = data.message;
      var dateToday = new Date();
      var dateExpire = new Date(
        order.expiry.slice(5, 7) +
          "/" +
          order.expiry.slice(8, 10) +
          "/" +
          order.expiry.slice(0, 4)
      );
      var timeDif = dateExpire.getTime() - dateToday.getTime();
      var daysDif = timeDif / (1000 * 3600 * 24);

      if (order.premium.indexOf("M") != -1) {
        var audioFile = document.getElementById("specialAudio");
        audioFile.play();
      } else if (
        daysDif <= 30 &&
        ((order.optionType.toUpperCase() == "CALLS" &&
          order.strike >= order.spot * 1.1) ||
          (order.optionType.toUpperCase() == "PUTS" &&
            order.strike <= order.spot * 0.9))
      ) {
        var audioFile = document.getElementById("specialAudio");
        audioFile.play();
      } else {
        var audioFile = document.getElementById("eventAudio");
        audioFile.play();
      }
    }
  },
  methods: {
    viewChart: function(e) {
      this.$emit("chart", e);
    }
  },
  computed: {
    filteredData: function() {
      var _this = this;
      var dateToday = new Date();

      var toReturn = JSON.parse(JSON.stringify(this.liveData));

      if (!this.search && this.filter == "all" && !this.sort) {
        return toReturn;
      }

      if (this.filter == "moreTwo") {
        toReturn = toReturn.filter(order => {
          if (
            order.premium &&
            ((order.premium.indexOf("K") != -1 &&
              order.premium.replace("K", "").replace("$", "") >= 200) ||
              order.premium.indexOf("M") != -1)
          ) {
            return order;
          } else {
            return;
          }
        });
      } else if (this.filter == "moreMil") {
        toReturn = toReturn.filter(order => {
          if (order.premium && order.premium.indexOf("M") != -1) {
            return order;
          } else {
            return;
          }
        });
      } else if (this.filter == "unusual") {
        toReturn = toReturn.filter(order => {
          var dateExpire = new Date(
            order.expiry.slice(5, 7) +
              "/" +
              order.expiry.slice(8, 10) +
              "/" +
              order.expiry.slice(0, 4)
          );
          var timeDif = dateExpire.getTime() - dateToday.getTime();
          var daysDif = timeDif / (1000 * 3600 * 24);
          if (
            daysDif <= 30 &&
            ((order.optionType.toUpperCase() == "CALLS" &&
              order.strike >= order.spot * 1.1) ||
              (order.optionType.toUpperCase() == "PUTS" &&
                order.strike <= order.spot * 0.9))
          ) {
            return order;
          } else {
            return;
          }
        });
      } else if (this.filter == "fiftyCent") {
        toReturn = toReturn.filter(order => {
          if (order.price < 0.5) {
            return order;
          } else {
            return;
          }
        });
      } else if (this.filter == "calls") {
        toReturn = toReturn.filter(order => {
          if (order.optionType.toUpperCase() == "CALLS") {
            return order;
          } else {
            return;
          }
        });
      } else if (this.filter == "puts") {
        toReturn = toReturn.filter(order => {
          if (order.optionType.toUpperCase() == "PUTS") {
            return order;
          } else {
            return;
          }
        });
      }

      if (this.search) {
        toReturn = toReturn.filter(order => {
          if (
            order.symbol &&
            order.symbol.toLowerCase().indexOf(_this.search.toLowerCase()) > -1
          ) {
            return order;
          } else {
            return;
          }
        });
      }

      if (this.sort == "tickerA") {
        toReturn = toReturn.sort(function(a, b) {
          var tickerA = a.symbol.toLowerCase(),
            tickerB = b.symbol.toLowerCase();
          if (tickerA < tickerB)
            //sort string ascending
            return -1;
          if (tickerA > tickerB) return 1;
          return 0; //default return value (no sorting)
        });
      } else if (this.sort == "tickerZ") {
        toReturn = toReturn.sort(function(a, b) {
          var tickerA = a.symbol.toLowerCase(),
            tickerB = b.symbol.toLowerCase();
          if (tickerA > tickerB)
            //sort string ascending
            return -1;
          if (tickerA < tickerB) return 1;
          return 0; //default return value (no sorting)
        });
      } else if (this.sort == "expiryA") {
        toReturn = toReturn.sort(function(a, b) {
          var expiryA = a.expiry.toLowerCase(),
            expiryB = b.expiry.toLowerCase();
          if (expiryA < expiryB)
            //sort string ascending
            return -1;
          if (expiryA > expiryB) return 1;
          return 0; //default return value (no sorting)
        });
      } else if (this.sort == "expiryZ") {
        toReturn = toReturn.sort(function(a, b) {
          var expiryA = a.expiry.toLowerCase(),
            expiryB = b.expiry.toLowerCase();
          if (expiryA > expiryB)
            //sort string ascending
            return -1;
          if (expiryA < expiryB) return 1;
          return 0; //default return value (no sorting)
        });
      } else if (this.sort == "premiumA") {
        toReturn = toReturn.sort(function(a, b) {
          var premiumA = parseFloat(
              a.premium.replace(/,/g, "").replace("$", "")
            ),
            premiumB = parseFloat(b.premium.replace(/,/g, "").replace("$", ""));
          if (premiumA < premiumB)
            //sort string ascending
            return -1;
          if (premiumA > premiumB) return 1;
          return 0; //default return value (no sorting)
        });
      } else if (this.sort == "premiumZ") {
        toReturn = toReturn.sort(function(a, b) {
          if (a.premium.indexOf("M") != -1 && b.premium.indexOf("M")) {
            return -1;
          } else if (b.premium.indexOf("M") != -1 && a.premium.indexOf("M")) {
            return 1;
          }
          var premiumA = parseFloat(
              a.premium.replace(/,/g, "").replace("$", "")
            ),
            premiumB = parseFloat(b.premium.replace(/,/g, "").replace("$", ""));
          if (premiumA > premiumB)
            //sort string ascending
            return -1;
          if (premiumA < premiumB) return 1;
          return 0; //default return value (no sorting)
        });
      }

      return toReturn;
    }
  },
  watch: {
    filteredData: function() {
      this.$emit("table-data", this.filteredData);
    }
  },
  mounted: function() {
    const xhr = new XMLHttpRequest();
    xhr.timeout = 10000;
    var _this = this;
    xhr.onreadystatechange = function() {
      if (this.readyState == 4 && (this.status == 0 || this.status == 500)) {
        _this.error = true;
      }
    };
    xhr.open("get", "https://moneything.herokuapp.com/");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.responseType = "json";
    xhr.addEventListener("load", () => {
      if (xhr.status === 200 || xhr.status === 304) {
        this.liveData = xhr.response.orders;
      } else {
        const errors = xhr.response.errors ? xhr.response.errors : {};
        this.error = true;
      }
    });
    xhr.send();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.animated {
  animation-duration: 0.75s;
}
.flow-table {
  overflow: hidden;
  position: relative;
}
.loading {
  padding-top: 5em;
  font-size: 24px;
}
.loading.error {
  color: #d63031;
}
</style>
