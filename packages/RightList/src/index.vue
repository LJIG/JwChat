<template>
  <div class="wrapper">
    <div class="notice" style="resolve">
      <div class="empty">
      <JwChat-empty v-if="!info.notice" size="8rem" />

      </div>
      <P style="padding-left: 0.2rem">{{ info.tip }}+</P>
      <p style="font-size: 0.8rem; margin-top: 0.5rem; padding: 0 0.2rem">
        {{ info.notice }}
      </p>
    </div>
    <div class="userList">
      <div>{{ info.listTip }} ({{ dataList.length }})</div>
      <div>
        <el-input
          :placeholder="info.filterTip"
          v-model="filter"
          clearable
          size="mini"
        />
      </div>
      <div class="listBox">
        <div class="scrollBox" ref="scrollBox">
          <ul>
            <li v-for="(item, k) in dataList" :key="k">
              <JwChat-item size="25" :config="item" @click="bindClick" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Scroll from "@/utils/scroll";
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
  filter: string;
  scroll: any;
  complete: any;
}
export default defineComponent({
  name: "JwChat-rightbox",
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ["click"],
  setup(props, { emit }) {
    const scrollBox = ref(null);
    const data: DataProps = reactive({
      filter: "",
      scroll: null,
      complete: null,
    });

    onMounted(() => {
      const dom = scrollBox.value;
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

    watch(
      () => props.config?.list,
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

    function bindClick(type: any) {
      emit("click", type);
    }
    function scrollRefresh() {
      if (!data.scroll) return;
      data.complete = setInterval(function () {
        // 判断文档和所有子资源(图片、音视频等)已完成加载
        if (document.readyState === "complete") {
          window.clearInterval(data.complete);
          data.scroll.refresh();
        }
      }, 50);
    }
    const info = computed(() => {
      const {
        tip = "群公告:",
        notice = "",
        listTip = "组成员",
        filterTip = "搜索好友",
      } = props.config;
      return {
        tip,
        notice,
        listTip,
        filterTip,
      };
    });

    const dataList = computed(() => {
      const { list = [] } = props.config;
      const filter = data.filter;
      if (!filter) return list;

      const filterArr: Array<any> = [];
      const reg = new RegExp(filter, "g");
      list.forEach((i: any) => {
        const { name } = i;
        if (reg.test(name)) filterArr.push(i);
      });

      return filterArr;
    });

    const refData = toRefs(data);
    return {
      ...refData,
      dataList,
      info,
      bindClick,
      scrollBox,
    };
  },
});
</script>
<style scoped lang="scss">
.wrapper {
  padding: 0px;
  height: 100%;
  max-width: 100%;
  width: 0;
  min-width: 220px;
  margin: 0 auto;
  .notice {
    height: 30%;
    text-align: left;
    position: relative;
    .empty {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      height: 100%;;
    }
  }
  .userList {
    height: 70%;
    text-align: left;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    & > div {
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
    .listBox {
      overflow: hidden;
      height: calc(100% - 60px);
      position: relative;
      .scrollBox {
        width: 100%;
        height: 98%;
        overflow: hidden;
      }
    }
    li {
      list-style: none;
      height: 2rem;
      line-height: 2rem;
      padding: 0.2rem;
    }
  }
}
</style>
