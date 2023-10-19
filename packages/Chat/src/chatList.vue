<!--
 * @Author: Bian <389701057@qq.com>
 * @Date: 2022-04-18 16:35:03
 * @LastEditTime: 2022-08-23 16:58:02
 * @LastEditors: Bian 389701057@qq.com
 * @Description: 
 * @FilePath: \packages\Chat\src\chatList.vue
 * hello 
-->
<template>
  <div class="wrapper" :style="boxSize">
    <div class="scroller" ref="scroller">
      <div class="web__main" ref="main">
        <div class="pulldown-wrapper">
          <div v-html="tipText"></div>
        </div>
        <template v-for="(item, k) in list">
          <el-divider
            v-if="item.type === 'tip'"
            :key="JSON.stringify(item) + k"
          >
            {{ item.text }}
          </el-divider>
          <div
            v-else
            class="web__main-item"
            :key="JSON.stringify(item) + k + 'else'"
            :class="{ 'web__main-item--mine': item.mine }"
          >
            <div class="web__main-user">
              <img
                :src="item.img"
                @click="$emit('click', { type: 'img', data: item })"
              />
              <cite @click="$emit('click', { type: 'nickname', data: item })">
                {{ item.name }}
                <i>{{ item.date }}</i>
              </cite>
            </div>
            <div class="web__main-text">
              <div class="web__main-arrow"></div>
              <itemTalk
                v-if="item.text.text"
                :text="item.text.text"
                v-on:systemEvent="taskEvent"
                v-on:loadDone="loadDone"
              />
              <systemTalk
                v-if="item.text.system"
                :text="item.text.system"
                @systemEvent="systemEvent"
                @loadDone="loadDone"
              />
              <el-link
                @click="taskEvent(item.text)"
                v-if="item.text.subLink"
                v-bind="item.text.subLink.prop"
                class="itemChild"
              >
                {{ item.text.subLink.text }}
              </el-link>
              <shopTalk
                v-if="item.text.shop"
                :text="item.text.shop"
                @systemEvent="taskEvent"
                @loadDone="loadDone"
              />
            </div>
          </div>
        </template>
      </div>
    </div>
    <div class="downBtn" v-if="showDownBtn" @click="scrollBottom">
      <span v-if="unread">{{ unread }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import Scroll from "@/utils/scroll";
// import Remind from '@/utils/remind'
import itemTalk from "./itemTalk";
import systemTalk from "./systemTalk";
import shopTalk from "./shopTalk";
import {
  computed,
  defineComponent,
  onMounted,
  onUpdated,
  reactive,
  ref,
  toRefs,
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

export default defineComponent({
  name: "JwChat_list",
  components: { itemTalk, systemTalk, shopTalk },
  props: {
    list: {
      type: Array as PropType<any>,
      default: () => [],
    },
    config: {
      type: Object,
      default: () => ({}),
    },
  },
  // 定义抛出的事件名称
  emits: ["loadDone", "systemEvent", "loadHistory", "click"],
  setup(props, { emit }) {
    const PHASE = {
      moving: {
        enter: "enter",
        leave: "leave",
      },
      fetching: "fetching",
      succeed: "succeed",
    };
    onMounted(() => {
      createScroll();
    });

    onUpdated(() => {
      // console.log("更新");
    });

    let data: DataProps = reactive({
      show: false,
      scroll: {},
      // remind: null, // 消息提示
      stopScroll: false,
      showDownBtn: false,
      tipText: "",
      isLoding: false,
    });

    const boxSize = computed(() => {
      let { height = "382px", width = "525px" } = props.config || {};
      if (`${height}`.match(/\d$/)) {
        height += "px";
      }
      if (`${width}`.match(/\d$/)) {
        width += "px";
      }
      return { height, width };
    });

    const historyConfig: any = computed(() => {
      const { tip = "", show = false } = props.config.historyConfig || {};
      return { tip, show };
    });

    const scrollType = computed(() => {
      const scrollType = props.config.scrollType || "noroll";

      return scrollType;
    });

    watch(
      () => data.scroll,
      (newval, oldvalue) => {
        if (!newval) return;
        // console.log(newval, "watch");
        const isBottom = newval.isBottom;
        data.showDownBtn = !isBottom;
      },
      { deep: true }
    );

    watch(boxSize, () => {
      data.scroll.refresh();
    });

    // watch(unread, (newval) => {
    //   newval && Remind.showBrowser.call(this);
    //   if (!this.remind) return;
    //   if (newval) {
    //     this.remind.changeTitle(newval);
    //   } else {
    //     this.remind.resetTitle();
    //   }
    // });

    const scroller = ref(null);
    const main = ref(null);

    const refData = toRefs(data);
    const unread = computed(() => {
      const { unread = 0 } = data.scroll || {};
      return unread;
    });
    return {
      scroller,
      main,
      ...refData,
      boxSize,
      unread,

      loadDone,
      taskEvent,
      systemEvent,
      scrollBottom,
      finishPullDown,
    };

    function loadDone(target: any) {
      // TODO:需要一个防抖
      childnodeLoad();
      if (scrollType.value == "scroll") {
        scrollBottom();
      }
    }
    function scrollBottom() {
      if (!data.scroll) return;
      if (data.scroll.isLoding) return;
      data.scroll.refresh();
      data.scroll.scrollBottom();
    }
    function createScroll() {
      const pullingDown = historyConfig.value?.show; //|| false;
      const scroll = new Scroll(scroller.value, {
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
        childnodeLoad();
      });
      // data.scroll.on("refresh", () => {
      //   childnodeLoad();
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
    function finishPullDown() {
      setTipText(PHASE.succeed);
      // 结束下拉刷新行为。
      data.scroll.finishPullDown();
    }
    function childnodeLoad() {
      if (scrollType.value !== "noroll") return;
      const parent = main.value;

      if (!parent) return;
      const [, ...childs] = (parent as any).children;

      data.scroll.saveNodes({ nodes: childs, dataList: props.list });
    }

    function setTipText(phase: string = (PHASE as any).default) {
      const tip = historyConfig.value?.tip; //|| false;

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
      };

      data.tipText = (TEXTS_MAP as any)[phase] || "";
      if (tip) data.tipText = tip;
    }

    function pullingDownHandler() {
      // console.log("开始下拉");
      setTipText(PHASE.fetching);
      emit("loadHistory");
    }
    function systemEvent(itemData: any) {
      emit("click", { type: "systemItem", data: itemData });
    }
    function taskEvent(itemData: any) {
      console.log(itemData);
      emit("click", { type: "taskItem", data: itemData });
    }
  },
});
</script>

<style scoped lang="scss">
:deep(.iScrollVerticalScrollbar.iScrollLoneScrollbar) {
  z-index: 1 !important;
}

.wrapper {
  position: relative;
  width: 525px;
  height: 382px;
  overflow: hidden;
  /* Prevent native touch events on Windows */
  touch-action: none;
  /* Prevent text resize on orientation change, useful for web-apps */
  text-size-adjust: none;
  .downBtn {
    position: absolute;
    cursor: pointer;
    right: 1rem;
    // width: 2rem;
    // height: 2rem;
    bottom: 2rem;
    &::before {
      content: "V";
      position: absolute;
      background: rgba(204, 204, 204, 0.2);
      width: 2rem;
      height: 2rem;
      line-height: 2rem;
      text-align: center;
      border-radius: 50%;
      top: 60%;
      left: 50%;
      transform: translateX(-50%);
    }
    span {
      background: #409eff;
      padding: 0.1rem 0.5rem;
      font-size: 0.7rem;
      border-radius: 0.5rem;
      color: #fff;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .scroller {
    height: 100%;
    width: 100%;
  }
  .web__main {
    position: absolute;
    width: calc(100% - 1.5rem);
    padding: 0.5rem;
    padding-right: 1.5rem;

    /* Prevent elements to be highlighted on tap */
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

    /* Put the scroller into the HW Compositing layer right from the start */
    transform: translateZ(0);
    .web__main-item {
      position: relative;
      font-size: 0;
      margin-bottom: 10px;
      padding-left: 60px;
      min-height: 68px;
      text-align: left;
    }
    .sysTip {
      font-size: 1rem;
      text-align: center;
    }
    .web__main-user,
    .web__main-text {
      display: inline-block;
      vertical-align: top;
      font-size: 14px;
    }

    .web__main-user {
      position: absolute;
      cursor: pointer;
      left: 3px;
      img {
        width: 40px;
        height: 40px;
        border-radius: 100%;
      }
      cite {
        position: absolute;
        left: 60px;
        top: -2px;
        /* width: 500px; */
        line-height: 24px;
        font-size: 12px;
        white-space: nowrap;
        color: #999;
        text-align: left;
        font-style: normal;
        i {
          padding-left: 15px;
          font-style: normal;
        }
      }
    }

    .web__main-text {
      max-width: 75%;
      position: relative;
      line-height: 22px;
      margin-top: 25px;
      padding: 8px 15px;
      background-color: #f3f3f3;
      border-radius: 3px;
      border: 1px solid #f0f0f0;
      color: #000;
      word-break: break-all;
    }

    .web__main-arrow {
      top: 6px;
      left: -8px;
      position: absolute;
      display: block;
      width: 0;
      height: 0;
      border-color: transparent;
      border-style: solid;
      border-width: 8px;
      border-left-width: 0;
      border-right-color: #ebeef5;
      &::after {
        content: " ";
        top: -7px;
        left: 1px;
        position: absolute;
        display: block;
        width: 0;
        height: 0;
        border-color: transparent;
        border-style: solid;
        border-width: 7px;
        border-left-width: 0;
        border-right-color: #ebeef5;
      }
    }

    .web__main-item--mine .web__main-text .web__main-arrow {
      left: auto;
      right: -5px;
      border-color: transparent;
      border-style: solid;
      border-width: 8px;
      border-right-width: 0;
      border-left-color: #409eff;
      &::after {
        left: auto;
        right: -2px;
        border-color: transparent;
        border-style: solid;
        border-width: 7px;
        border-right-width: 0;
        border-left-color: #409eff;
      }
    }

    .web__main-list {
      margin: 10px 0;
      li {
        height: 30px;
        color: #409eff;
        line-height: 30px;
      }
    }

    .web__main-item--mine {
      text-align: right;
      padding-left: 0;
      padding-right: 60px;
      .web__main-user {
        left: auto;
        right: 3px;
        cite {
          left: auto;
          right: 60px;
          text-align: right;
          i {
            padding-left: 0;
            padding-right: 15px;
          }
        }
      }
      .web__main-text {
        margin-left: 0;
        text-align: left;
        background-color: #409eff;
        color: #fff;
        img {
          max-width: 200px;
        }
      }
    }
  }
}
.pulldown-wrapper {
  position: absolute;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  transform: translateY(-100%) translateZ(0);
  text-align: center;
  color: #999;
}
</style>
