<template>
  <!-- <i :class="['iconfont', 'icon-wenjian' ]"></i> -->
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="`#${type}`"></use>
  </svg>
</template>

<script lang="ts">
import "./fonts/iconfont";
import { defineComponent } from "vue";
export default defineComponent({
  name: "JwChat-icon",
  props: {
    type: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="scss">
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>