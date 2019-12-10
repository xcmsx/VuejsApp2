<template>
  <div
    class="info-pop"
    :style="
      'left:' +
        ileft +
        ';right:' +
        iright +
        ';top:' +
        itop +
        ';bottom:' +
        ibottom +
        ';width:' +
        iwidth +
        ';'
    "
  >
    {{ msg }}
  </div>
</template>

<script>
export default {
  name: "InfoPop",
  props: ["msg", "left", "right", "bottom", "top", "width"],
  data: function() {
    return {
      ileft: this.left ? this.left : "auto",
      iright: this.right ? this.right : "auto",
      itop: this.top ? this.top : "auto",
      ibottom: this.bottom ? this.bottom : "auto",
      iwidth: this.width ? this.width : "auto"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.info-pop {
  background-color: #0984e3;
  color: #dfe6e9;
  position: absolute;
  padding: 5px;
  min-width: 100%;
  border-radius: 5px;
  font-size: 12px;
  z-index: 2000;
}
</style>
