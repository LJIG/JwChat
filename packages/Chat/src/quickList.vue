<!--
 * @Author: your name
 * @Date: 2021-03-14 14:38:32
 * @LastEditTime: 2022-05-05 16:01:01
 * @LastEditors: Bian <389701057@qq.com>
 * @Description: In User Settings Edit
 * @FilePath: \packages\Chat\src\quickList.vue
-->
<template>
  <div class="quickListBox" v-if="showList.length" ref="quickListBox">
    <div class="quickList">
      <div v-for="(i, k) in showList" :key="k" class="quickItem">
        <span v-html="i.showtext"  @click="submit(i)"/>
        <i
          class="enterBtn el-icon-circle-check"
          title="选择"
          @click="submit(i)"
        />
        <!-- <el-button class="enterBtn" type="mini" @click.stop="submit(i)">选择</el-button> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
export default defineComponent({
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    msg: {
      type: String,
      default: "",
    },
  },
  emits: ["submit"],
  setup(props, { emit }) {
    const showList = computed(() => {
      const msg = props.msg;
      if (!msg) return [];
      const originList = props.list;
      const reg = new RegExp(msg);
      const result: Array<any> = [];
      originList.forEach((i: any) => {
        const { text } = i;
        if (reg.test(text)) {
          const str: string = text.replace(reg, `<b>${msg}</b>`);
          result.push({ ...i, showtext: str });
        }
      });
      return result;
    });

    return {
      showList,
      submit,
    };

    function submit(target: string) {
      emit("submit", target);
    }
  },
});
</script>

<style lang='scss' scoped>
//@import url(); 引入公共css类
.quickListBox {
  padding: 0px;
  margin: 0px;
  text-align: left;
  max-height: 100px;
  overflow: auto;
  width: 100%;
  padding: 5px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  transition: all 2s;
  box-sizing: border-box;
  .quickItem {
    padding: 0.2rem 0;
    display: flex;
    &:hover {
      background: #fafafa;
    }
    span {
      display: inline-block;
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .enterBtn {
      align-self: center;
      cursor: pointer;
      &:hover {
        color: red;
      }
    }
  }
}
</style>
