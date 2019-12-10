<template>
  <div class="flow-top-controls">
    <div
      class="house"
      @click="volume ? mute() : unmute()"
      @mouseover.self="info.audio = true"
      @mouseleave.self="info.audio = false"
      role="button"
    >
      <img
        src="../../assets/volume-off.png"
        alt="Audio alerts are off"
        :class="{ hidden: volume }"
      />
      <img
        src="../../assets/volume-on.png"
        alt="Audio alerts are on"
        :class="{ hidden: !volume }"
      />
    </div>
    <div class="house" role="button" @click="help()">
      <img src="../../assets/info-big.png" alt="Get help" />
    </div>
    <FlowFilters @search="search($event)" @filter="filter($event)" />
  </div>
</template>

<script>
import InfoPop from "../InfoPop.vue";
import FlowFilters from "./FlowFilters.vue";

export default {
  name: "FlowTopControls",
  props: {},
  components: { InfoPop, FlowFilters },
  data: function() {
    return {
      info: {
        audio: false,
        filters: false
      },
      volume: false,
      showFilters: true
    };
  },
  methods: {
    mute: function() {
      var audioFile = document.getElementById("eventAudio");
      var audioFile2 = document.getElementById("specialAudio");
      audioFile.muted = true;
      audioFile2.muted = true;
      this.volume = false;
    },
    unmute: function() {
      var audioFile = document.getElementById("eventAudio");
      var audioFile2 = document.getElementById("specialAudio");
      audioFile.muted = false;
      audioFile2.muted = false;
      audioFile.volume = 0.2;
      audioFile2.volume = 0.2;
      this.volume = true;
    },
    toggleFilters: function() {
      if (this.showFilters) {
        this.showFilters = false;
      } else {
        this.showFilters = true;
      }
    },
    search: function(e) {
      this.$emit("search", e);
    },
    filter: function(e) {
      this.$emit("filter", e);
    },
    help: function() {
      this.$emit("help");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.animated {
  animation-duration: 500ms;
}
.animatedSlow {
  animation-duration: 1s;
}
.flow-top-controls {
  text-align: left;
  padding: 0 2%;
  height: 50px;
}

.flow-top-controls * {
  vertical-align: top;
}
.info-pop {
  text-align: center;
}
.house {
  display: inline-block;
  position: relative;
  cursor: pointer;
  padding: 6px;
  width: 24px;
  height: 24px;
}

@media only screen and (max-width: 768px) {
  .flow-top-controls {
    position: static;
    height: auto;
  }
  .audioInfo {
    text-align: center;
    right: -34px !important;
    left: auto !important;
  }
  .filtersInfo {
    text-align: center;
    right: 0 !important;
    left: auto !important;
  }
}
</style>
