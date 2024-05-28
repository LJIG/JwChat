import EnterBox from "./enterBox";
import chatListBox from "./chatList";
import tools from "./tools";
import quickList from "./quickList";
import style from "./index.module.scss";
import { computed, defineComponent, nextTick, reactive, ref, watch } from "vue";

import type { PropType } from "vue";
import type { ToolsProps } from "./tools";
import type { ListProps as QuickListProps } from "./quickList";
import type { ListProps, scrollType, historyConfig } from "./chatList";

interface DataProps {
  msg: string;
  insert: string;
}

export type configProps = {
  historyConfig: historyConfig & { callback?: Function };
};

export default defineComponent({
  name: "JwChat-simple",
  components: { quickList, tools, EnterBox, chatListBox },
  props: {
    taleList: Object as PropType<ListProps>,
    scrollType: Object as PropType<scrollType>,
    toolConfig: Object as PropType<ToolsProps>,
    quickList: Object as PropType<QuickListProps[]>,
    height: {
      type: Object as PropType<string | number>,
      default: "500px",
    },
    width: {
      type: Object as PropType<string | number>,
      default: "550px",
    },
    modelValue: {
      type: Object as PropType<string>,
      default: "",
    },
    config: {
      type: Object as PropType<configProps>,
    },
  },
  emits: ["update:modelValue", "enter", "clickTalk"],
  setup(props, { emit, slots, expose }) {
    const data = reactive<DataProps>({
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
      let height = `${props.height}`;
      let width = `${props.width}`;
      if (height.match(/\d$/)) {
        height += "px";
      }
      if (width.match(/\d$/)) {
        width += "px";
      }
      return { height, width };
    });

    const talkHeight = computed<string>(() => {
      let height = `${props.height}`;
      if (height.match(/\d$/)) {
        height = `${Number(height) - 140}`;
      } else height = `calc(${height} - 140px)`;
      return height;
    });

    const chatListConfig = computed(() => {
      const { width, scrollType } = props;
      const { historyConfig = {} } = props.config || {};
      return { width, height: talkHeight, scrollType, historyConfig };
    });

    const chatList = ref<InstanceType<typeof chatListBox> | null>(null);

    expose({ finishPullDown });

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

    function bindEmoji(emoji: string): void {
      data.insert = emoji;
      nextTick(() => {
        data.insert = "";
      });
    }

    function loadHistoryHandler(): void {
      const { historyConfig: { callback = null } = {} } =
        chatListConfig.value as any;
      callback && callback(finishPullDown);
    }

    function quickSubmit(target): void {
      const { text } = target;
      data.msg = text;
      nextTick(() => {
        emit("enter", target);
        data.msg = "";
      });
    }

    function finishPullDown(): void {
      (chatList as any).value.finishPullDown();
    }
  },
});
