import EnterBox from "./enterBox";
import ChatListBox from "./chatList";
import ToolsBox from "./tools";
import QuickList from "./quickList";
import  "./index.module.scss";
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
  props: {
    taleList: Object as PropType<ListProps>,
    scrollType: String as PropType<scrollType>,
    toolConfig: Object as PropType<ToolsProps>,
    quickList: Object as PropType<QuickListProps[]>,
    height: {
      type: [String, Number] as PropType<string | number>,
      default: "500px",
    },
    width: {
      type: [String, Number] as PropType<string | number>,
      default: "550px",
    },
    modelValue: {
      type: String as PropType<string>,
      default: "",
    },
    config: {
      type: Object as PropType<configProps>,
    },
    placeholder: {
      type: String as PropType<string>,
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

    const chatList = ref<InstanceType<typeof ChatListBox> | null>(null);

    expose({ finishPullDown });

    return () => (
      <>
        <div class="chatPage" style={setStyle.value}>
          <ChatListBox
            v-slots={{
              downBtn: slots.downBtn,
            }}
            class="taleBox"
            ref={chatList}
            list={props.taleList}
            onClick={($event: Event) => {
              emit("clickTalk", $event);
            }}
            onLoadHistory={loadHistoryHandler}
            config={chatListConfig.value}
          />
          <div class="toolBox">
            <ToolsBox
              tools={props.toolConfig}
              class="tools"
              onEmoji={bindEmoji}
              v-slots={{
                tools: slots.tools,
              }}
            ></ToolsBox>
            <QuickList
              list={props.quickList}
              msg={data.msg}
              onSubmit={quickSubmit}
            />
            <EnterBox
              v-slots={{
                enter: slots.enter,
                enterBtn: slots.enterBtn,
              }}
              onSubmit={($event: Event) => {
                emit("enter", $event);
              }}
              v-model={data.msg}
              insert={data.insert}
              placeholder={props.placeholder}
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
