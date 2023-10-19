<template>
  <div class="empty" :style="sizeBox">
    <JwChat-icon type="icon-empty" :style="sizeStyle" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "JwChat-empty",
  props: {
    size: {
      type: [String, Number],
      default: "5rem",
    },
  },
  setup(props) {
    const sizeBox = computed(() => {
      let size = props.size;
      if (`${size}`.match(/\d$/)) {
        size += "px";
      }
      return {
        width: size,
      };
    });

    const sizeStyle = computed(() => {
      let size = props.size;
      if (`${size}`.match(/\d$/)) {
        size += "px";
      }
      return {
        fontSize: `calc(${size} / 2)`,
      };
    });

    return {
      sizeBox,
      sizeStyle,
    };
  },
});
</script>
<style scoped lang="scss">
.empty {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
</style>
