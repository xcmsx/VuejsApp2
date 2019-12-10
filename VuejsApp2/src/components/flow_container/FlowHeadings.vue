<template>
  <div class="flow-headings">
    <span @mouseover="info.time = true" @mouseleave="info.time = false">
      <transition enter-active-class="animated flipInX">
        <InfoPop msg="Time EST" v-if="info.time" bottom="2em" />
      </transition>
      TIME
    </span>
    <span>
      <transition enter-active-class="animated flipInX">
        <InfoPop
          :msg="sortTickerMsg"
          left="25px"
          v-if="info.sortTick"
          bottom="2em"
        />
      </transition>
      TICKER
      <img
        @mouseover="info.sortTick = true"
        @mouseleave="info.sortTick = false"
        src="../../assets/sort.png"
        alt="Sort by ticker"
        class="sort"
        @click="sort('tickerA')"
        v-if="sortBy != 'tickerA' && sortBy != 'tickerZ'"
      />
      <img
        @mouseover="info.sortTick = true"
        @mouseleave="info.sortTick = false"
        src="../../assets/sorting.png"
        alt="Sort Z to A"
        class="sort"
        @click="sort('tickerZ')"
        v-if="sortBy == 'tickerA'"
      />
      <img
        @mouseover="info.sortTick = true"
        @mouseleave="info.sortTick = false"
        src="../../assets/sorting.png"
        alt="Stop sorting by Ticker"
        class="sort flip"
        @click="sort(null)"
        v-if="sortBy == 'tickerZ'"
      />
    </span>
    <span>
      <transition enter-active-class="animated flipInX">
        <InfoPop
          :msg="sortExpiryMsg"
          left="15px"
          v-if="info.sortExp"
          bottom="2em"
        />
      </transition>
      EXP
      <img
        @mouseover="info.sortExp = true"
        @mouseleave="info.sortExp = false"
        src="../../assets/sort.png"
        alt="Sort by expiry"
        class="sort"
        @click="sort('expiryA')"
        v-if="sortBy != 'expiryA' && sortBy != 'expiryZ'"
      />
      <img
        @mouseover="info.sortExp = true"
        @mouseleave="info.sortExp = false"
        src="../../assets/sorting.png"
        alt="Sort 9 to 0"
        class="sort"
        @click="sort('expiryZ')"
        v-if="sortBy == 'expiryA'"
      />
      <img
        @mouseover="info.sortExp = true"
        @mouseleave="info.sortExp = false"
        src="../../assets/sorting.png"
        alt="Stop sorting by Expiry"
        class="sort flip"
        @click="sort(null)"
        v-if="sortBy == 'expiryZ'"
      />
    </span>
    <span>STRIKE</span>
    <span>
      <transition enter-active-class="animated flipInX">
        <InfoPop
          msg="All orders are long"
          left="5px"
          v-if="info.cop"
          bottom="2em"
        />
      </transition>
      C/P
      <img
        @mouseover="info.cop = true"
        @mouseleave="info.cop = false"
        src="../../assets/info.png"
        alt="All orders are long"
        class="info"
      />
    </span>
    <span>
      <transition enter-active-class="animated flipInX">
        <InfoPop
          msg="Price of underlying"
          left="10px"
          v-if="info.spot"
          bottom="2em"
        />
      </transition>
      SPOT
      <img
        @mouseover="info.spot = true"
        @mouseleave="info.spot = false"
        src="../../assets/info.png"
        alt="Price of underlying"
        class="info"
      />
    </span>
    <span>DETAILS</span>
    <span>TYPE</span>
    <span>
      <transition enter-active-class="animated flipInX">
        <InfoPop
          :msg="sortPremiumMsg"
          left="25px"
          v-if="info.sortPrem"
          bottom="2em"
        />
      </transition>
      PREM
      <img
        @mouseover="info.sortPrem = true"
        @mouseleave="info.sortPrem = false"
        src="../../assets/sort.png"
        alt="Sort by premium"
        class="sort"
        @click="sort('premiumA')"
        v-if="sortBy != 'premiumA' && sortBy != 'premiumZ'"
      />
      <img
        @mouseover="info.sortPrem = true"
        @mouseleave="info.sortPrem = false"
        src="../../assets/sorting.png"
        alt="Sort Z to A"
        class="sort"
        @click="sort('premiumZ')"
        v-if="sortBy == 'premiumA'"
      />
      <img
        @mouseover="info.sortPrem = true"
        @mouseleave="info.sortPrem = false"
        src="../../assets/sorting.png"
        alt="Stop sorting by Ticker"
        class="sort flip"
        @click="sort(null)"
        v-if="sortBy == 'premiumZ'"
      />
    </span>
    <span></span>
  </div>
</template>

<script>
import InfoPop from "../InfoPop.vue";

export default {
  name: "FlowHeadings",
  props: {},
  components: { InfoPop },
  data: function() {
    return {
      info: {
        time: false,
        sortTick: false,
        sortExp: false,
        sortPrem: false,
        cop: false,
        spot: false
      },
      sortTickerMsg: "Sort by Ticker",
      sortExpiryMsg: "Sort by Expiry",
      sortPremiumMsg: "Sort by Premium",
      sortBy: null
    };
  },
  methods: {
    sort: function(f) {
      this.sortBy = f;

      if (f == "tickerA") {
        this.sortTickerMsg = "Sorting Ticker A-Z";
      } else if (f == "tickerZ") {
        this.sortTickerMsg = "Sorting Ticker Z-A";
      } else {
        this.sortTickerMsg = "Sort by Ticker";
      }

      if (f == "expiryA") {
        this.sortExpiryMsg = "Sorting Expiry 0-9";
      } else if (f == "expiryZ") {
        this.sortExpiryMsg = "Sorting Expiry 9-0";
      } else {
        this.sortExpiryMsg = "Sort by Expiry";
      }

      if (f == "premiumA") {
        this.sortPremiumMsg = "Sorting Premium 0-9";
      } else if (f == "premiumZ") {
        this.sortPremiumMsg = "Sorting Premium 9-0";
      } else {
        this.sortPremiumMsg = "Sort by Premium";
      }

      this.$emit("sort", f);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.animated {
  animation-duration: 500ms;
}
.hidden {
  display: none;
}
.flip {
  transform: rotate(180deg);
}
span {
  position: relative;
  white-space: nowrap;
  width: 10%;
}
.sort,
.info {
  height: 0.5em;
  vertical-align: 2px;
  cursor: pointer;
}
.sort {
  cursor: pointer;
}
.flow-headings {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  font-weight: bold;
}
@media only screen and (max-width: 768px) {
  .flow-headings {
    display: none;
  }
}
</style>
