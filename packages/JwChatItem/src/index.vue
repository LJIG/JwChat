<template>
  <div class="item">
    <el-badge :value="config.readNum" :hidden="config.readNum < 1">
      <img
        v-if="config.img"
        :src="config.img"
        :style="coverSize"
        class="cover"
        @click="bindClick({ key: 'cover', value: config })"
      />
    </el-badge>
    <div class="info">
      <p class="name" @click="bindClick({ key: 'name', value: config })">
        {{ config.name }}
      </p>
      <p class="dept" @click="bindClick({ key: 'dept', value: config })">
        {{ config.dept }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "JwChat-item",
  props: {
    config: {
      type: Object,
      default: () => ({
        img: "",
        name: "JwChat",
        dept: "",
        readNum: 0,
      }),
      required: true,
    },
    size: {
      type: [String, Number],
      default: 35,
    },
  },
  emits: ["click"],
  setup(props, { emit }) {
    const coverSize = computed(() => {
      let size: any = props.size;
      if (`${size}`.match(/\d$/)) {
        size += "px";
      }

      return {
        width: size,
        height: size,
      };
    });

    function bindClick(type: any) {
      const target = type;
      emit("click", target);
    }

    return {
      coverSize,
      bindClick,
    };
  },
});
</script>

<style lang='scss' scoped>
.item {
  display: flex;
  align-items: center;
  position: relative;
  .cover {
    border-radius: 50%;
    margin-right: 12px;
    box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
  .info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    p {
      margin: 0;
      margin: 0;
      padding: 0;
      /* width: 175px; */
      text-overflow: ellipsis;
      overflow: hidden;
      text-align: left;
      white-space: nowrap;
      font-size: 13px;
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
      &:last-child {
        font-size: 12px;
      }
    }
  }
}
</style>