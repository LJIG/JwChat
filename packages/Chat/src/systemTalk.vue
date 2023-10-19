
<!--
 * @Author: Bian <389701057@qq.com>
 * @Date: 2022-04-18 16:38:07
 * @LastEditTime: 2022-05-17 23:38:27
 * @LastEditors: Bian <389701057@qq.com>
 * @Description: 
 * @FilePath: \packages\Chat\src\systemTalk.vue
 * hello 
-->
<template>
  <div class="systemTalk">
    <div class="title">{{ text.title }}</div>
    <div class="subtitle">{{ text.subtitle }}</div>
    <div v-for="item in text.content" :key="JSON.stringify(item)">
      <el-link type="primary" @click.stop="itemCallback(item)">{{
        item.text
      }}</el-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted } from "vue";
export default defineComponent({
  props: {
    text: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ["systemEvent", "loadDone"],
  setup(props, { emit }) {
    onMounted(() => {
      nextTick(() => {
        emit("loadDone", { type: "system", target: props.text });
      });
    });
    return {
      itemCallback,
    };
    function itemCallback(itemData: any) {
      emit("systemEvent", itemData);
    }
  },
  // methods: {
  //   itemCallback(itemData) {
  //     this.$emit("systemEvent", itemData);
  //   },
  // },
  // mounted() {
  //   this.$nextTick(() => {
  //     this.$emit("loadDone", { type: "system", target: this.text });
  //   });
  // },
});
</script>

<style lang='scss' scoped>
//@import url(); 引入公共css类
.systemTalk {
  padding: 0px;
  margin: 0px;
  display: inline-block;
  .title {
    width: 100%;
    font-weight: bold;
    border-bottom: 1px solid #dcdfe6;
  }
  .subtitle {
    font-size: 0.5rem;
  }
}
</style>
