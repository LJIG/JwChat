import EnterBox from "./enterBox";
import chatListBox from "./chatList";
import tools from "./tools";
import quickList from "./quickList";
import style from "./index.module.scss";
import { computed, defineComponent, nextTick, reactive, ref, watch } from "vue";

interface DataProps {
  msg: string;
  insert: string;
}

export default defineComponent({
  name: "JwChat",
  components: { quickList, tools, EnterBox, chatListBox },
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
  setup(props, { emit, slots }) {
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
      return { height, width };
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
    return () => (
      <>
        <div class={style.chatPage} style={setStyle.value}>
          <chatListBox
            class={style.taleBox}
            ref={chatList}
            list={props.taleList}
            onClick={($event: Event) => {
              emit("clickTalk", $event);
            }}
            onLoadHistory={loadHistoryHandler}
            config={chatListConfig.value}
          />
          <div class={style.toolBox}>
            <tools
              tools={props.toolConfig}
              class={style.tools}
              onEmoji={bindEmoji}
              v-slots={{
                tools: slots.tools?.(),
              }}
            ></tools>
            <quickList
              list={props.quickList}
              msg={data.msg}
              class={style.quickList}
              onSubmit={quickSubmit}
            />
            <EnterBox
              onSubmit={($event: Event) => {
                emit("enter", $event);
              }}
              v-model={data.msg}
              insert={data.insert}
            />
          </div>
        </div>
      </>
    );

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
      (chatList as any).value.finishPullDown();
    }
  },
});
