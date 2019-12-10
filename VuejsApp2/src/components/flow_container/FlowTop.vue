<template>
  <div class="flow-top">
    <FlowTopControls
      @help="help()"
      @search="search($event)"
      @filter="filter($event)"
    />
    <FlowHeadings @sort="sort($event)" />
  </div>
</template>

<script>
import InfoPop from "../InfoPop.vue";
import FlowTopControls from "./FlowTopControls.vue";
import FlowHeadings from "./FlowHeadings.vue";

export default {
  name: "FlowTop",
  props: [],
  components: { InfoPop, FlowTopControls, FlowHeadings },
  data: function() {
    return {
      showFilters: false,
      tableData: this.tableData
    };
  },
  methods: {
    search: function(e) {
      this.$emit("search", e);
    },
    filter: function(e) {
      this.$emit("filter", e);
    },
    sort: function(e) {
      this.$emit("sort", e);
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
  animation-delay: 300ms;
}
.hidden {
  display: none;
}
h1 {
  text-align: left;
  padding-left: 0.5em;
}
.flow-top {
  position: relative;
  padding-top: 10px;
  padding-bottom: 5px;
  background-color: #dfe6e9;
}
@media only screen and (max-width: 768px) {
  /* .flow-top {
    padding-top: 5px;
  } */
}
</style>
