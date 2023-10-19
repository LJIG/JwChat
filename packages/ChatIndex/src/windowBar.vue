<!--
 * @Author: Bian <389701057@qq.com>
 * @Date: 2022-06-09 00:16:39
 * @LastEditTime: 2022-07-07 15:19:29
 * @LastEditors: Bian 389701057@qq.com
 * @Description: 
 * @FilePath: \packages\ChatIndex\src\windowBar.vue
 * hello 
-->
<template>
  <div class="windowBar" :style="winBarStyle">
    <!-- <div class="toolBarBox">
      <img src="image/three.jpeg" alt="">
    </div> -->
    <div class="winBarBox" ref="windowBar">
      <div>
        <div
          v-for="(item, k) in winList"
          :key="k"
          :ref="`winItem${item.id}`"
          @click.stop="bindClick(item)"
          :style="winItemStyle"
          :class="{ winItem: true, winActive: activeItem == item.id }"
        >
          <JwChat-item :config="item" />
          <div class="itemOperation">
            <el-button
              type="info"
              :icon="Close"
              circle
              size="small"
              @click.stop="bindOperation({ type: 'remove', target: item })"
            />
          </div>
        </div>
        <template v-if="!winList.length">
          <div>
            <JwChat-empty size="8rem" />
          </div>
          <el-divider style="padding: 0 5px">
            <span style="font-size: 0.2rem">暂无会话</span>
          </el-divider>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Scroll from "@/utils/scroll";
import { Close } from "@element-plus/icons-vue";
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
  toRefs,
  watch,
} from "vue";
interface DataProps {
  activeItem: number;
  moveObj: any;
  scroll: any;
  complete: any;
}
export default defineComponent({
  props: {
    config: {
      typeof: Object,
      default: () => ({
        list: [],
        active: null,
        width: "150px",
        listHeight: "60px",
      }),
    },
  },
  emits: ["click"],
  setup(props, { emit }) {
    const data: DataProps = reactive({
      activeItem: 0,
      moveObj: {},
      scroll: null,
      complete: null,
    });

    const winList = computed(() => {
      const { list = [] } = props.config;
      const winList: Array<any> = list;
      return winList;
    });

    const winItemStyle = computed(() => {
      const { listHeight: height = "60px" } = props.config;
      return {
        height,
      };
    });

    const winBarStyle = computed(() => {
      const { width = "150px" } = props.config;
      return {
        width,
      };
    });

    watch(
      () => props.config.active,
      (newVal) => {
        if (newVal) {
          data.activeItem = newVal;
        }
      },
      {
        deep: true,
        immediate: true,
      }
    );

    watch(
      () => props.config.list,
      (newVal) => {
        if (newVal) {
          scrollRefresh();
        }
      },
      {
        deep: true,
        immediate: true,
      }
    );
    const windowBar = ref(null);

    onMounted(() => {
      const dom = windowBar.value;
      data.scroll = new Scroll(dom, {
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
        preventDefault: false,
      });
    });
    const refData = toRefs(data);
    return {
      Close,
      ...refData,
      windowBar,

      winList,
      winBarStyle,
      winItemStyle,

      bindClick,
      bindOperation,
      scrollRefresh,
    };

    function bindClick(play: any) {
      const { id } = play;
      data.activeItem = id;
      emit("click", { type: "winBar", data: play });
    }
    function bindOperation(play: any) {
      emit("click", { type: "winBtn", data: play });
    }
    function scrollRefresh() {
      if (!data.scroll) return;
      data.complete = setInterval(function () {
        // 判断文档和所有子资源(图片、音视频等)已完成加载
        if (document.readyState === "complete") {
          window.clearInterval(data.complete);
          (data.scroll as any).refresh();
        }
      }, 50);
    }
  },
});
</script>

<style lang="scss" scoped>
.windowBar {
  background: #fff;
  height: 100%;
  min-width: 150px;
  overflow: hidden;
  display: flex;
  border-right: 1px solid #dcdfe6;
  position: relative;
  .toolBarBox {
    $barSize: 60px;
    width: $barSize;
    border-right: 1px solid #dcdfe6;
    img {
      width: 50px;
    }
  }
  .winBarBox {
    padding: 0 5px;
    margin-top: 15px;
    width: calc(100% - 10px);
    height: calc(100% - 20px);
    overflow: hidden;
  }
  .winItem {
    display: flex;
    align-items: center;
    position: relative;
    transition: transform 0.6s;
    background: #fff;
    user-select: none;
    border: 1px solid #f9f9f9;
    overflow: hidden;
    &:hover {
      background: #f9f9f9;
      .itemOperation {
        opacity: 1;
        transform: translateY(0);
      }
    }
    &.winActive {
      background: #f0f0f0;
    }
    .itemOperation {
      position: absolute;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      height: 100%;
      padding: 0 5px;
      right: 0;
      opacity: 0;
      transform: translateY(100%);
      right: 0;
      :deep(.el-button) {
        margin: 0;
        padding: 0.06rem;
        margin-bottom: 0.4rem;
        &:hover {
          background-color: #f56c6c;
          border-color: #f56c6c;
        }
      }
    }
  }
  :deep(.el-divider__text) {
    padding: 0 5px;
  }
}
</style>
