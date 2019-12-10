<template>
  <div class="flow-filters">
    <input
      type="text"
      name="search"
      class="search"
      placeholder="Search by Ticker"
      @input="search($event.target.value)"
    />
    <button
      class="btn river"
      :class="{ active: filters.all }"
      @click="setFilter('all')"
    >
      All
    </button>
    <button
      class="btn river"
      :class="{ active: filters.moreTwo }"
      @click="setFilter('moreTwo')"
    >
      $200K+
    </button>
    <button
      class="btn river"
      :class="{ active: filters.moreMil }"
      @click="setFilter('moreMil')"
    >
      $1M+
    </button>
    <button
      class="btn river"
      :class="{ active: filters.unusual }"
      @click="setFilter('unusual')"
    >
      Unusual
    </button>
    <button
      class="btn river"
      :class="{ active: filters.fiftyCent }"
      @click="setFilter('fiftyCent')"
    >
      $0.50
    </button>
    <button
      class="btn river"
      :class="{ active: filters.calls }"
      @click="setFilter('calls')"
    >
      Calls
    </button>
    <button
      class="btn river"
      :class="{ active: filters.puts }"
      @click="setFilter('puts')"
    >
      Puts
    </button>
  </div>
</template>

<script>
var searchTime = null;
import InfoPop from "../InfoPop.vue";

export default {
  name: "FlowFilters",
  props: {},
  components: { InfoPop },
  data: function() {
    return {
      info: {},
      filters: {
        all: true,
        moreTwo: false,
        moreMil: false,
        unusual: false,
        fiftyCent: false,
        calls: false,
        puts: false
      }
    };
  },
  methods: {
    search: function(e) {
      var _this = this;
      if (searchTime) {
        clearTimeout(searchTime);
      }
      searchTime = setTimeout(function() {
        _this.$emit("search", e);
      }, 300);
    },
    setFilter: function(f) {
      this.filters = {
        all: false,
        moreTwo: false,
        moreMil: false,
        unusual: false,
        fiftyCent: false,
        calls: false,
        puts: false
      };
      this.filters[f] = true;
      this.$emit("filter", f);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.flow-filters {
  position: relative;
  top: 10px;
  display: inline-block;
  float: right;
}
.animated {
  animation-duration: 500ms;
}
.search {
  border-radius: 5px;
  margin-right: 1em;
}
.btn:first-of-type {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}
.btn:last-of-type {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
@media only screen and (max-width: 768px) {
  .flow-filters {
    display: block;
    padding-bottom: 1em;
    float: none;
  }
  .search {
    display: block;
    width: 100%;
    margin: 1em 0;
    box-sizing: border-box;
    text-align: center;
  }
  .btn:first-of-type {
    width: 100%;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  .btn:last-of-type {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .btn {
    width: 50%;
    margin: 1em 0;
  }
}
</style>
