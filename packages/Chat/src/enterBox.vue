<!--
 * @Author: Bian <389701057@qq.com>
 * @Date: 2022-04-18 15:23:26
 * @LastEditTime: 2022-07-07 15:15:57
 * @LastEditors: Bian 389701057@qq.com
 * @Description: 
 * @FilePath: \packages\Chat\src\enterBox.vue
 * hello 
-->
<template>
  <div class="enterBox" @keyup.enter="handleSend">
    <textarea
      v-model="currentMsg"
      rows="3"
      :placeholder="placeholder"
      class="enterBox-input"
      ref="msgBox"
    />
    <div class="enterBox-menu">
      <el-button
        class="enterBox-submit"
        type="primary"
        size="small"
        @click="handleSend"
        >发送</el-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, reactive, ref, toRefs, watch } from "vue";

interface DataProps {
  currentMsg: string;
}

export default defineComponent({
  name: "JwChat_enterbox",
  props: {
    placeholder: {
      type: String,
      default: "请输入内容...",
    },
    modelValue: {
      type: String,
      default: "",
    },
    insert: {
      type: String,
      default: "",
    },
  },
  emits: ["update:modelValue", "submit"],

  setup(props, { emit }) {
    const data: DataProps = reactive({
      currentMsg: "",
    });

    watch(
      () => props.modelValue,
      () => {
        data.currentMsg = props.modelValue;
      },
      { immediate: true }
    );

    watch(
      () => data.currentMsg,
      (newval: string = "") => {
        const msg = newval.trim();
        emit("update:modelValue", msg);
      },
      { immediate: true }
    );

    //用户主动发送
    const handleSend = (e: MouseEvent | KeyboardEvent) => {
      const shiftKey = e.shiftKey;
      if (shiftKey) return;
      emit("submit", data.currentMsg);
      nextTick(() => {
        data.currentMsg = "";
      });
    };

    watch(
      () => props.insert,
      (newval: string = "") => {
        if (newval) {
          joinToMsg(newval);
        }
      }
    );

    const msgBox = ref<HTMLElement | null>(null);

    const refData = toRefs(data);
    return {
      ...refData,
      handleSend,
      msgBox,
    };

    function joinToMsg(str: string) {
      /* eslint-disable */
      const myField: any = msgBox.value; //proxy.$refs.msgBox;
      let afterMsg = data.currentMsg;

      //IE浏览器
      if ((document as any).selection) {
        var sel = null;
        myField.focus();
        sel = (document as any).selection.createRange();
        sel.text = str;
        sel.select();
      }
      //火狐/网景 浏览器
      else if (myField.selectionStart || myField.selectionStart == "0") {
        //得到光标前的位置
        var startPos = myField.selectionStart;
        //得到光标后的位置
        var endPos = myField.selectionEnd;
        // 在加入数据之前获得滚动条的高度
        var restoreTop = myField.scrollTop;
        afterMsg =
          afterMsg.substring(0, startPos) +
          str +
          afterMsg.substring(endPos, afterMsg.length);
        //如果滚动条高度大于0
        if (restoreTop > 0) {
          // 返回
          myField.scrollTop = restoreTop;
        }
        myField.focus();
        myField.selectionStart = startPos + str.length;
        myField.selectionEnd = startPos + str.length;
      } else {
        afterMsg += str;
        myField.focus();
      }
      data.currentMsg = afterMsg;
    }
  },
});
</script>
<style scoped lang="scss">
.enterBox {
  padding: 0 10px;
  height: auto;
  overflow: hidden;
  .enterBox-input {
    display: block;
    width: 100%;
    height: 60px;
    overflow-x: hidden;
    overflow-y: auto;
    box-sizing: border-box;
    resize: none;
    outline: 0;
    background-color: #fff;
    border: 0;
    word-break: break-all;
    font-size: 13px;
    line-height: 17px;
    -webkit-appearance: none;
  }
  .enterBox-menu {
    text-align: right;
  }
  .enterBox-submit {
    display: inline-block;
    outline: none;
    cursor: pointer;
    text-align: center;
  }
}
</style>
