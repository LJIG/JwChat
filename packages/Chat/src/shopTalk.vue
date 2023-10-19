<!--
 * @Author: Bian <389701057@qq.com>
 * @Date: 2022-04-18 16:38:27
 * @LastEditTime: 2022-07-07 15:16:35
 * @LastEditors: Bian 389701057@qq.com
 * @Description: 
 * @FilePath: \packages\Chat\src\shopTalk.vue
 * hello 
-->
<template>
  <div class="shopTalk" @click="itemCallback">
    <div class="cover">
      <img :src="text.cover" />
    </div>
    <div class="price">{{ text.price }}</div>
    <div class="title">{{ text.title }}</div>
    <div class="subtitle" v-if="text.describe">{{ text.describe }}</div>
    <div class="tagBox" v-if="text.tags && text.tags.length">
      <span v-for="(i, k) in text.tags" :key="k">
        {{ i.name }}
      </span>
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
        emit("loadDone", { type: "shop", target: props.text });
      });
    });
    return {
      itemCallback,
    };
    function itemCallback() {
      emit("systemEvent", { ...props.text, type: "shop" });
    }
  },
});
</script>

<style lang='scss' scoped>
//@import url(); 引入公共css类
.shopTalk {
  padding: 0px;
  margin: 0px;
  display: inline-block;
  width: 200px;
  .price {
    color: #c16e3e;
    font-weight: bold;
  }
  .cover {
    width: 100%;
    img {
      width: 100%;
      max-height: 300px;
    }
  }
  .title {
    width: 100%;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .subtitle {
    border-top: 1px solid #dcdfe6;
    font-size: 0.5rem;
  }
  .tagBox {
    span {
      background: #fed6be;
      color: #c16e3e;
      font-size: 0.7rem;
      padding: 2px 10px;
      border-radius: 30px;
      display: inline-block;
      margin: 2px 5px;
    }
  }
}
</style>
