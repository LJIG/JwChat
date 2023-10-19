<template>
  <div class="ChatPage" :style="faceSize">
    <div class="winBar">
      <WinBar
        v-if="JSON.stringify(winBarConfig) !== '{}'"
        :config="winBarConfig"
        @click="winBarClick"
      />
    </div>
    <div style="width: 100%">
      <div class="header">
        <JwChat-item :config="config" @click="bindClick" />
        <slot name="header" />
      </div>
      <div class="main">
        <div class="chatBox">
          <jw-chat
            ref="jwChat"
            :taleList="taleList"
            @enter="$emit('enter', $event)"
            v-model="msg"
            :toolConfig="toolConfig"
            :scrollType="scrollType"
            :width="realWidth"
            :height="chatHeight"
            :config="chatConfig"
            :quickList="quickList"
            @clickTalk="$emit('clickTalk', $event)"
          >
            <template #tools>
              <slot name="tools" />
            </template>
          </jw-chat>
        </div>
        <div class="rightBox" v-if="showRightBox">
          <span @click="switchBox = !switchBox">
            <JwChat-icon class="switch" :type="switchIcon" />
          </span>
          <slot v-if="switchBox" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, ref, toRefs, watch } from "vue";
import type { PropType } from "vue";
import WinBar from "./windowBar.vue";
interface DataProps {
  chatHeight: String;
  msg: String;
  switchBox: Boolean;
}
export default defineComponent({
  name: "JwChat-index",
  components: {
    WinBar,
  },
  props: {
    config: {
      type: Object,
      default: () => ({
        img: "image/cover.png",
        name: "JwChat",
        dept: "最简单、最便捷",
        callback: () => {},
      }),
    },
    showRightBox: {
      type: Boolean,
      default: true,
    },
    taleList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    height: {
      type: [Number, String],
      default: 570,
    },
    width: {
      type: [Number, String],
      default: 750,
    },
    modelValue: {
      default: "",
    },
    toolConfig: {
      type: Object,
    },
    winBarConfig: {
      type: Object as PropType<any>,
      default: () => ({}),
    },
    scrollType: {
      default: "noroll",
    },
  },
  emits: ["update:modelValue", "enter", "clickTalk"],
  setup(props, { emit }) {
    const data: DataProps = reactive({
      chatHeight: "",
      msg: "",
      switchBox: true,
    });

    const faceSize = computed(() => {
      let height = props.height + "";
      let width = props.width + "";
      if (height.match(/\d$/)) {
        height += "px";
      }
      if (width.match(/\d$/)) {
        width += "px";
      }
      if (JSON.stringify(props.winBarConfig) !== "{}") {
        const winBarWidth = props.winBarConfig?.width;
        const widthNum = width.replace("px", "");
        const winBarWidthNum = winBarWidth.replace("px", "");
        width = Number(widthNum) + Number(winBarWidthNum) + "px";
      }
      const style = { height, width };
      return style;
    });

    const chatConfig = computed(() => {
      const { historyConfig = {} } = props.config || {};
      return { historyConfig };
    });

    const switchIcon = computed(() => {
      let result = "icon-jiantou-xiangzuo";
      if (data.switchBox) result = "icon-jiantou-xiangyou";
      return result;
    });

    const realWidth = computed(() => {
      let width: any = props.width;
      console.log(props);

      let ratio = 1;
      if (props.showRightBox && data.switchBox) ratio = 0.7;
      width = width * ratio + "";
      return width;
    });

    const quickList = computed(() => {
      const { quickList = [] } = props.config;
      return quickList;
    });

    watch(
      () => props.height,
      (newval) => {
        data.chatHeight = (newval as any) - 60 + "";
      },
      { immediate: true }
    );
    watch(
      () => props.modelValue,
      (newval) => {
        data.msg = newval;
      },
      { immediate: true }
    );

    watch(
      () => data.msg,
      (newval) => {
        emit("update:modelValue", newval);
      },
      { immediate: true }
    );

    watch(
      () => props.showRightBox,
      (newval) => {
        if (typeof newval === "boolean") data.switchBox = newval;
      },
      { immediate: true }
    );

    const jwChat = ref(null);
    const refData = toRefs(data);
    return {
      jwChat,
      ...refData,
      faceSize,
      chatConfig,
      switchIcon,
      realWidth,
      quickList,

      bindClick,
      winBarClick,
      finishPullDown,
    };

    function bindClick(type: any) {
      const { callback } = props.config || {};
      if (callback) {
        callback(type);
      }
    }
    function winBarClick(play: any) {
      const { callback = null } = props.winBarConfig;
      if (callback) {
        callback(play);
      }
    }
    function finishPullDown() {
      (jwChat.value as any).finishPullDown();
    }
  },
});
</script>

<style scoped lang="scss">
.ChatPage {
  margin: 0 auto;
  background: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  position: relative;
  display: flex;
  .winBar {
    // position: absolute;
    // transform: translateX(-100%);
  }
  .header {
    background-color: #409eff;
    display: flex;
    margin: 0 auto;
    padding-left: 12px;
    align-items: center;
    height: 60px;
    position: relative;
    color: #fff;
  }

  .main {
    display: flex;
    height: calc(100% - 60px);

    .rightBox {
      box-shadow: 0 -3px 3px 0 rgba(0, 0, 0, 0.1);
      width: 45%;
      position: relative;

      .switch {
        position: absolute;
        left: -1.2rem;
        top: 20%;
        background: rgba(204, 204, 204, 0.5);
        padding: 0.3rem 0 0.3rem 0.1rem;
        border-radius: 100% 0 0 100%;
        color: #fff;
        cursor: pointer;
        &:hover {
          background: #409eff;
        }
      }
    }
  }
}
</style>
