<template>
  <div class="chatPage" :style="setStyle">
    <chatList
      class="taleBox"
      ref="chatList"
      :list="taleList"
      @click="$emit('clickTalk', $event)"
      @loadHistory="loadHistoryHandler"
      :config="chatListConfig"
    />
    <div class="toolBox">
      <tools :tools="toolConfig" class="tools" @emoji="bindEmoji">
        <template v-slot:tools>
          <slot name="tools" />
        </template>
      </tools>
      <quickList
        :list="quickList"
        :msg="msg"
        class="quickList"
        @submit="quickSubmit"
      />
      <EnterBox
        @submit="$emit('enter', $event)"
        v-model="msg"
        :insert="insert"
      />
    </div>
  </div>
</template>

<script lang="ts">
import EnterBox from "./enterBox.vue";
import chatList from "./chatList.vue";
import tools from "./tools.vue";
import quickList from "./quickList.vue";
import {
  computed,
  defineComponent,
  nextTick,
  reactive,
  ref,
  toRefs,
  watch,
} from "vue";

interface DataProps {
  msg: string;
  insert: string;
}

export default defineComponent({
  name: "JwChat",
  components: { quickList, tools, EnterBox, chatList },
  props: {
    taleList: {
      type: Array,
      default: () => [],
    },
    height: {
      type: String || Number,
      default: "500px",
    },
    width: {
      default: "550px",
    },
    modelValue: {
      default: "",
    },
    scrollType: {
      default: "",
    },
    toolConfig: {
      type: Object,
      // default: () => ({
      //   show: [],
      //   showEmoji: true,
      //   callback: Function
      // })
    },
    config: {},
    quickList: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["update:modelValue", "enter", "clickTalk"],
  setup(props, { emit }) {
    const data: DataProps = reactive({
      msg: "",
      insert: "",
    });

    watch(
      () => props.modelValue,
      () => {
        data.msg = props.modelValue;
      },
      { immediate: true }
    );

    watch(
      () => data.msg,
      () => {
        emit("update:modelValue", data.msg);
      },
      { immediate: true }
    );

    const setStyle = computed(() => {
      let height = props.height;
      let width = props.width;

      if (`${height}`.match(/\d$/)) {
        height += "px";
      }
      if (`${width}`.match(/\d$/)) {
        width += "px";
      }
      const style = { height, width };
      return style;
    });

    const talkHeight = computed(() => {
      let height: any = props.height;
      if (`${height}`.match(/\d$/)) {
        height -= 140;
      } else height = `calc(${height} - 140px)`;
      return height;
    });

    const chatListConfig = computed(() => {
      const { width, scrollType, config } = props;
      const { historyConfig = {} } = (config as any) || {};
      return { width, height: talkHeight, scrollType, historyConfig };
    });

    const chatList = ref(null);

    const refData = toRefs(data);
    return {
      ...refData,
      setStyle,
      chatListConfig,
      chatList,
      bindEmoji,
      loadHistoryHandler,
      quickSubmit,
      finishPullDown,
    };

    function bindEmoji(emoji: string) {
      data.insert = emoji;
      nextTick(() => {
        data.insert = "";
      });
    }

    function loadHistoryHandler() {
      const { historyConfig: { callback = null } = {} } =
        chatListConfig.value as any;
      callback && callback();
    }

    function quickSubmit(target: any) {
      const { text } = target;
      data.msg = text;
      nextTick(() => {
        emit("enter", target);
        data.msg = "";
      });
    }

    function finishPullDown() {
      /*  this.$refs. */
      (chatList as any).value.finishPullDown();
    }
  },
});
</script>

<style lang="scss" scoped>
.chatPage {
  margin: 0 auto;
  position: relative;
  background: #fff;
  overflow: hidden;
  .taleBox {
    height: calc(100% - 140px);
    min-height: 100px;
    overflow: hidden;
  }
  .toolBox {
    height: 140px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    position: relative;
    .quickList {
      transform: translateY(-100%);
      background: #fff;
      position: absolute;
      z-index: 5;
    }
  }
}
</style>
