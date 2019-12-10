<template>
  <div
    class="flow-row"
    :class="{
      unusual: isUnusual,
      largeOrder: rowData.premium.indexOf('M') != -1
    }"
  >
    <div class="flow-cell time">
      {{ estTime }}
    </div>
    <div
      class="flow-cell ticker"
      :class="{
        bull: rowData.optionType.toUpperCase() == 'CALLS',
        bear: rowData.optionType.toUpperCase() == 'PUTS'
      }"
    >
      {{ rowData.symbol }}
    </div>
    <div class="flow-cell exp">
      <span class="small-helper">EXPIRY: </span>{{ rowData.expiry }}
    </div>
    <div class="flow-cell strike">
      <span class="small-helper">STRIKE: </span>{{ rowData.strike }}
    </div>
    <div class="flow-cell cop">
      {{ rowData.optionType.toUpperCase() }}
    </div>
    <div class="flow-cell spot">
      <span class="small-helper">SPOT: </span>{{ rowData.spot }}
    </div>
    <div class="flow-cell details">
      {{ rowData.size }} @<br class="small-desktop-only" />
      {{ parseFloat(rowData.price).toFixed(2) }}
    </div>
    <div class="flow-cell type sweep">
      {{ rowData.type.toUpperCase() }}
    </div>
    <div
      class="flow-cell premium"
      :class="{
        bull: rowData.optionType.toUpperCase() == 'CALLS',
        bear: rowData.optionType.toUpperCase() == 'PUTS'
      }"
    >
      <span class="small-helper">PREM: </span>
      {{ rowData.premium }}
    </div>
    <div
      class="flow-cell info"
      @mouseover="info.chart = true"
      @mouseleave="info.chart = false"
      @click="chart()"
    >
      <InfoPop
        v-if="info.chart"
        :msg="'Chart for ' + rowData.symbol"
        top="0"
        left="-10px"
        width="100%"
        class="chartInfo only-large"
      />
      <span class="small-helper">VIEW CHART</span>
      <img v-if="!info.chart" src="../../assets/chart.png" class="only-large" />
    </div>
  </div>
</template>

<script>
import InfoPop from "../InfoPop.vue";

export default {
  name: "FlowRow",
  props: ["rowData"],
  data: function() {
    return {
      info: {
        chart: false
      }
    };
  },
  components: { InfoPop },
  methods: {
    chart: function() {
      this.$emit("chart");
    }
  },
  computed: {
    isUnusual: function() {
      var dateToday = new Date();
      var dateExpire = new Date(
        this.rowData.expiry.slice(5, 7) +
          "/" +
          this.rowData.expiry.slice(8, 10) +
          "/" +
          this.rowData.expiry.slice(0, 4)
      );
      var timeDif = dateExpire.getTime() - dateToday.getTime();
      var daysDif = timeDif / (1000 * 3600 * 24);
      if (
        daysDif <= 30 &&
        ((this.rowData.optionType.toUpperCase() == "CALLS" &&
          this.rowData.strike >= this.rowData.spot * 1.1) ||
          (this.rowData.optionType.toUpperCase() == "PUTS" &&
            this.rowData.strike <= this.rowData.spot * 0.9))
      ) {
        return true;
      } else {
        return false;
      }
    },
    estTime: function() {
      var timePieces = this.rowData.createdAt.split("T")[1].split(":");
      var tFinal =
        timePieces[0] > 17
          ? String(parseInt(timePieces[0]) - 17) + ":" + timePieces[1]
          : String(parseInt(timePieces[0]) - 5) + ":" + timePieces[1];
      return tFinal;
      return this.rowData.time;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.flow-row {
  display: flex;
  flex-wrap: wrap;
  padding: 0.5em 0;
  border-bottom: 1px solid #efefef;
  justify-content: space-between;
  background: #ffffff;
}
.unusual {
  box-shadow: inset 0 0 10px #74b9ff;
  /* outline: 1px solid #81ecec; */
}
.largeOrder {
  box-shadow: inset 0 0 10px #fdcb6e;
  /* outline: 1px solid #fdcb6e; */
}
.flow-cell {
  position: relative;
  width: 10%;
}
.time {
  color: #b2bec3;
}
.ticker {
  border-radius: 5px;
  max-height: 22px;
}
.ticker.bear {
  background-color: #ff7675;
}
.ticker.bull {
  background-color: #55efc4;
}
.premium.bear {
  color: #d63031;
}
.premium.bull {
  color: #00b894;
}
.strike,
.cop,
.spot,
.details,
.type,
.premium {
  font-weight: bold;
}
.info {
  cursor: pointer;
  height: 20px;
}

.info .info-pop {
  cursor: pointer;
}
.info img {
  height: 20px;
  opacity: 0.5;
}
.small-helper {
  display: none;
}
.only-large {
  display: inline;
}
.small-desktop-only {
  display: none;
}
@media only screen and (max-width: 768px) {
  .small-helper {
    display: inline;
  }
  .only-large {
    display: none;
  }
  .flow-row {
    padding: 1em 0;
  }
  .flow-cell {
    width: 49%;
  }
  .info {
    width: 98%;
    color: #74b9ff;
    font-weight: bold;
  }
  .info:hover {
    color: #0984e3;
  }
}
@media only screen and (min-width: 769px) and (max-width: 1000px) {
  .small-desktop-only {
    display: inline;
  }
}
</style>
