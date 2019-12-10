<template>
  <div class="help-view">
    <div class="help-window">
      <div class="exit-view" @click="closeMe()">
        Press here to go back
      </div>
      <div class="help-map"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelpView",
  props: [],
  components: {},
  data: function() {
    return {};
  },
  methods: {
    closeMe: function() {
      this.$emit("close-help");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.help-view {
  position: absolute;
  top: 0%;
  left: 0%;
  right: 0%;
  bottom: 0%;
  z-index: 5000;
}
.help-window {
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
.help-map {
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("../assets/help.jpg");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
.exit-view {
  height: 50px;
  background-color: #d63031;
  color: #dfe6e9;
  padding-top: 16px;
  box-sizing: border-box;
  cursor: pointer;
}
.loadingHelp {
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
