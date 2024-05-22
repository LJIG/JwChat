import { computed, defineComponent, reactive, ref, watch } from "vue";
import type { PropType } from "vue";
import WinBar from "./windowBar";
import style from "./index.module.scss";
interface DataProps {
  chatHeight: String;
  msg: String;
  switchBox: Boolean;
}
export default defineComponent({
  name: "JwChat",
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
  setup(props, { emit, slots, expose }) {
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
      // console.log(props);

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

    expose({
      finishPullDown,
    });

    return () => (
      <>
        <div class={style.ChatPage} style={faceSize.value}>
          {JSON.stringify(props.winBarConfig) !== "{}" && (
            <WinBar config={props.winBarConfig} onClick={winBarClick} />
          )}
          <div class={style.winBox}>
            <div class={style.header}>
              <JwChat-item config={props.config} onClick={bindClick} />
              {slots.header?.()}
            </div>
            <div class={style.main}>
              <div class={style.chatBox}>
                <jw-chat
                  ref={jwChat}
                  taleList={props.taleList}
                  onEnter={($event: Event) => {
                    emit("enter", $event);
                  }}
                  v-slots={{
                    tools: () => slots.tools?.(),
                  }}
                  v-model={data.msg}
                  toolConfig={props.toolConfig}
                  scrollType={props.scrollType}
                  width={"100%"}
                  height={"100%"}
                  config={chatConfig}
                  quickList={quickList}
                  onClickTalk={($event: Event) => {
                    emit("clickTalk", $event);
                  }}
                ></jw-chat>
              </div>
              {props.showRightBox && (
                <div
                  class={style.rightBox}
                  style={!data.switchBox && "width:0px;"}
                >
                  <span
                    onClick={() => {
                      data.switchBox = !data.switchBox;
                    }}
                  >
                    <JwChat-icon class={style.switch} type={switchIcon.value} />
                  </span>
                  {data.switchBox && slots.default?.()}
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );

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
