import Scroll from "@/utils/scroll";
import style from "./index.module.scss";
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
  // toRefs,
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

    // const refData = toRefs(data);
    // return {
    //   ...refData,
    //   dataList,
    //   info,
    //   bindClick,
    //   scrollBox,
    // };

    return () => (
      <div class={style.wrapper}>
        <div class={style.notice} style="resolve">
          {!info.value.notice && (
            <div class={style.empty}>
              <JwChat-empty size="8rem" />
            </div>
          )}
          <p style="padding-left: 0.2rem">{info.value.tip}</p>
          <p style="font-size: 0.8rem; margin-top: 0.5rem; padding: 0 0.2rem">
            {info.value.notice}
          </p>
        </div>
        <div class={style.userList}>
          <div>
            {info.value.listTip} ({dataList.value.length})
          </div>
          <div>
            <el-input
              placeholder={info.value.filterTip}
              v-model={data.filter}
              clearable
              size="small"
            />
          </div>
          <div class={style.listBox}>
            <div class={style.scrollBox} ref={scrollBox}>
              <ul>
                {dataList.value.map((item: any, k: number) => (
                  <li key={k}>
                    <JwChat-item size="25" config={item} onClick={bindClick} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  },
});
