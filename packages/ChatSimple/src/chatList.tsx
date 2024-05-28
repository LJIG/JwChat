import Scroll from "@/utils/scroll";
// import Remind from '@/utils/remind'
import itemTalk from "./itemTalk";
import systemTalk from "./systemTalk";
import shopTalk from "./shopTalk";
import style from "./chatList.module.scss";
import {
  computed,
  defineComponent,
  onMounted,
  onUpdated,
  reactive,
  ref,
  watch,
} from "vue";
import type { PropType } from "vue";

interface DataProps {
  show: boolean;
  scroll: any;
  // remind: null, // 消息提示
  stopScroll: boolean;
  showDownBtn: boolean;
  tipText: string;
  isLoding: boolean;
}

export type ListProps = {
  type: string;
  text: {
    text: string;
    system: string;
    subLink: { text: string };
    shop: object;
  };
  mine: boolean;
  img: string;
  name: string;
  avatar: string;
  date: string;
};

export type scrollType = "scroll" | "noroll";
export type historyConfig = { tip: string; show: boolean };

type ConfigProps = {
  width: string;
  height: string;
  historyConfig: historyConfig;
  scrollType: scrollType;
};

export default defineComponent({
  name: "JwChat_list",
  components: { itemTalk, systemTalk, shopTalk },
  props: {
    list: {
      type: Array as PropType<ListProps[]>,
      default: () => [],
    },
    config: {
      type: Object as PropType<ConfigProps>,
      default: () => ({}),
    },
  },
  // 定义抛出的事件名称
  emits: ["loadDone", "systemEvent", "loadHistory", "click"],
  setup(props, { emit, expose }) {
    const PHASE = {
      moving: {
        enter: "enter",
        leave: "leave",
      },
      fetching: "fetching",
      succeed: "succeed",
    } as const;
    onMounted(() => {
      createScroll();
    });

    onUpdated(() => {
      // console.log("更新");
    });

    let data = reactive<DataProps>({
      show: false,
      scroll: {},
      // remind: null, // 消息提示
      stopScroll: false,
      showDownBtn: false,
      tipText: "",
      isLoding: false,
    });

    const boxSize = computed<{ height: string; width: string }>(() => {
      let { height = "382px", width = "525px" } = props.config || {};
      if (`${height}`.match(/\d$/)) {
        height += "px";
      }
      if (`${width}`.match(/\d$/)) {
        width += "px";
      }
      return { height, width };
    });

    const historyConfig = computed<{ tip: string; show: boolean }>(() => {
      const { tip = "", show = false } = props.config.historyConfig || {};
      return { tip, show };
    });

    const scrollType = computed<scrollType>(() => {
      const scrollType = props.config.scrollType || "noroll";

      return scrollType;
    });

    watch(
      () => data.scroll,
      (newVal) => {
        if (!newVal) return;
        // console.log(newVal, "watch");
        const isBottom = newVal.isBottom;
        data.showDownBtn = !isBottom;
      },
      { deep: true }
    );

    watch(boxSize, () => {
      data.scroll.refresh();
    });

    const scrollerRef = ref(null);
    const main = ref<HTMLElement | null>(null);

    const unread = computed<number>(() => {
      const { unread = 0 } = data.scroll || {};
      return unread;
    });

    expose({ finishPullDown });

    return () => (
      <div class={style.wrapper}>
        <div class={style.scroller} ref={scrollerRef}>
          <div class={style.web__main} ref={main}>
            <div class={style["pulldown-wrapper"]}>
              <div v-html={data.tipText}></div>
            </div>
            {props.list.map((item, k: number) => {
              return item.type === "tip" ? (
                <el-divider key={JSON.stringify(item) + k}>
                  {item.text}
                </el-divider>
              ) : (
                <div
                  key={JSON.stringify(item) + k + "else"}
                  class={[
                    style["web__main-item"],
                    item.mine && style["web__main-item--mine"],
                  ]}
                >
                  <div class={style["web__main-user"]}>
                    <img
                      src={item.img}
                      onClick={() => {
                        emit("click", { type: "img", data: item });
                      }}
                    />
                    <cite
                      onClick={() => {
                        emit("click", { type: "nickname", data: item });
                      }}
                    >
                      {item.name}
                      <i>{item.date}</i>
                    </cite>
                  </div>
                  <div class={style["web__main-text"]}>
                    <div class={style["web__main-arrow"]}></div>
                    {item.text.text && (
                      <itemTalk
                        text={item.text.text}
                        // v-on:systemEvent={taskEvent}
                        // v-on:loadDone={loadDone}
                        onSystemEvent={taskEvent}
                        onLoadDone={loadDone}
                      />
                    )}
                    {item.text.system && (
                      <systemTalk
                        text={item.text.system}
                        onSystemEvent={systemEvent}
                        onLoadDone={loadDone}
                      />
                    )}
                    {item.text.subLink && (
                      <el-link
                        onClick={() => {
                          taskEvent(item.text);
                        }}
                        // v-bind={item.text.subLink.prop}
                        class={style.itemChild}
                      >
                        {item.text.subLink.text}
                      </el-link>
                    )}
                    {item.text.shop && (
                      <shopTalk
                        text={item.text.shop}
                        onSystemEvent={taskEvent}
                        onLoadDone={loadDone}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {data.showDownBtn && (
          <div class={style.downBtn} onClick={scrollBottom}>
            {unread.value > 0 && <span>{unread.value}</span>}
          </div>
        )}
      </div>
    );

    function loadDone(target: { type: string; target }): void {
      // TODO:需要一个防抖
      childNodeLoad();
      if (scrollType.value == "scroll") {
        scrollBottom();
      }
    }
    function scrollBottom(): void {
      if (!data.scroll) return;
      if (data.scroll.isLoding) return;
      data.scroll.refresh();
      data.scroll.scrollBottom();
    }
    function createScroll(): void {
      const pullingDown = historyConfig.value.show;
      const scroll = new Scroll(scrollerRef.value, {
        scrollY: true,
        click: true,
        probeType: 3,
        observeDOM: true,
        mouseWheel: true,
        observeImage: true,
        scrollbar: {
          fade: false,
          interactive: true,
          scrollbarTrackClickable: true,
        },
        myPlugin: true,
        pullDownRefresh: {
          threshold: 70,
          stop: 56,
          mouseWheel: true,
        },
        preventDefault: false,
      });

      data.scroll = scroll;

      // 保存数据
      data.scroll.on("scrollEnd", () => {
        data.isLoding = false;
        childNodeLoad();
      });
      // data.scroll.on("refresh", () => {
      //   childNodeLoad();
      //   console.log("刷新");
      // });
      // 当顶部下拉的距离大于 threshold 值时，触发一次 pullingDown 钩子。
      if (pullingDown) {
        data.scroll.on("pullingDown", () => {
          data.scroll.savePosition();
          pullingDownHandler();
        });
        //当 BetterScroll 滚动到 pulldown 的 threshold 阈值区域之外的时候派发。你可以提示用户“手指释放刷新”
        data.scroll.on("leaveThreshold", () => {
          setTipText(PHASE.moving.leave);
        });
        //当 BetterScroll 滚动到 pulldown 的 threshold 阈值区域之内的时候派发，
        // 在这个事件内部，你可以做文案初始化的逻辑，比如提示用户“下拉刷新”
        data.scroll.on("enterThreshold", () => {
          data.isLoding = true;
          setTipText(PHASE.moving.enter);
        });
      }
    }
    function finishPullDown(): void {
      setTipText(PHASE.succeed);
      // 结束下拉刷新行为。
      data.scroll.finishPullDown();
    }
    function childNodeLoad(): void {
      if (scrollType.value !== "noroll") return;
      const parent = main.value;

      if (!parent) return;
      const [, ...childs] = (parent as any).children;

      data.scroll.saveNodes({ nodes: childs, dataList: props.list });
    }

    function setTipText(phase: string = ""): void {
      const tip = historyConfig.value.tip;

      const ARROW_BOTTOM = `<svg width="16" height="16" viewBox="0 0 512 512">
          <path fill="currentColor" d="M367.997 338.75l-95.998 95.997V17.503h-32v417.242l-95.996-95.995l-22.627 22.627L256 496l134.624-134.623l-22.627-22.627z"></path>
        </svg>`;
      const ARROW_UP = `<svg width="16" height="16" viewBox="0 0 512 512">
          <path fill="currentColor" d="M390.624 150.625L256 16L121.376 150.625l22.628 22.627l95.997-95.998v417.982h32V77.257l95.995 95.995l22.628-22.627z"></path>
        </svg>`;

      const TEXTS_MAP = {
        enter: `${ARROW_BOTTOM} 下拉`,
        leave: `${ARROW_UP} 刷新`,
        fetching: "加载中...",
        succeed: "刷新完成",
      } as const;

      data.tipText = tip || TEXTS_MAP[phase] || "";
    }

    function pullingDownHandler(): void {
      // console.log("开始下拉");
      setTipText(PHASE.fetching);
      emit("loadHistory");
    }
    function systemEvent(itemData): void {
      emit("click", { type: "systemItem", data: itemData });
    }
    function taskEvent(itemData): void {
      emit("click", { type: "taskItem", data: itemData });
    }
  },
});
