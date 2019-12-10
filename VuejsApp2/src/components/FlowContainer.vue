<template>
  <div class="flow-container">
    <h1>Options Flow</h1>
    <p>
      Powered by:
      <a href="https://www.bullflowsolutions.com" target="_blank">BullFlow</a>
    </p>
    <div class="top-right-bubbles">
      <div class="chat-link">
        <a href="https://discord.gg/KvF6jSU" target="_blank">Join Live Chat</a>
      </div>
      <!-- <div
        class="connection-indicator"
        :class="{
          live: dataConnection == 'Live',
          dead: dataConnection == 'Offline'
        }"
      >
        {{ dataConnection }}
      </div> -->
    </div>
    <FlowStats v-if="tableData" :table-data="tableData" />
    <FlowTop
      @sort="sort($event)"
      @help="help()"
      @search="search($event)"
      @filter="filter($event)"
    />
    <FlowTable
      @chart="chart($event)"
      @table-data="newTable($event)"
      @connected="dataConnection = 'Live'"
      @disconnected="dataConnection = 'Offline'"
      :search="searchFilter"
      :filter="viewFilter"
      :sort="sortBy"
    />
  </div>
</template>

<script>
import FlowTop from "./flow_container/FlowTop.vue";
import FlowTable from "./flow_container/FlowTable.vue";
import FlowStats from "./FlowStats.vue";

export default {
  name: "FlowContainer",
  props: {},
  components: {
    FlowTop,
    FlowTable,
    FlowStats
  },
  data: function() {
    return {
      searchFilter: null,
      viewFilter: "all",
      sortBy: null,
      tableData: null,
      dataConnection: "Offline"
    };
  },
  methods: {
    search: function(e) {
      this.searchFilter = e;
    },
    filter: function(e) {
      this.viewFilter = e;
    },
    sort: function(e) {
      this.sortBy = e;
    },
    chart: function(e) {
      this.$emit("chart", e);
    },
    help: function() {
      this.$emit("help");
    },
    newTable: function(e) {
      this.tableData = e;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.flow-container {
  position: absolute;
  border-radius: 5px;
  border: solid 1px #dfe6e9;
  overflow: auto;
  top: 5px;
  right: 5px;
  bottom: 5px;
  left: 5px;
}
.top-right-bubbles {
  position: absolute;
  top: 5px;
  right: 5px;
}
.connection-indicator,
.chat-link {
  display: inline-block;
  background: #ffffff;
  border-radius: 10px;
  padding: 6px;
  font-size: 14px;
  font-weight: bold;
}
.chat-link {
  top: 40px;
  background: #d63031;
  margin-right: 10px;
}
.chat-link a {
  color: #ffffff;
  text-decoration: none;
}
.chat-link:hover {
  background: #ffffff;
  box-shadow: 1px 1px 3px #2d3436;
}
.chat-link:hover > a {
  color: #d63031;
}
.connection-indicator.live {
  color: #00b894;
  border: 2px solid #00b894;
}
.connection-indicator.dead {
  color: #d63031;
  border: 2px solid #d63031;
}
h1,
p {
  background: #dfe6e9;
  margin: 0;
  color: #2d3436;
}
p {
  padding-bottom: 0.5em;
}
p a {
  color: #00b894;
  text-decoration: none;
}
@media only screen and (max-width: 500px) {
  h1,
  p {
    text-align: left;
    padding-left: 10px;
  }
}
</style>
