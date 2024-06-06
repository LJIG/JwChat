import Scroll from "@/utils/scroll";
import { Close } from "@element-plus/icons-vue";
import style from "./windowBar.module.scss";
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
  watch,
} from "vue";
import { ElButton, ElDivider } from "element-plus";

interface DataProps {
  activeItem: number;
  moveObj: any;
  scroll: any;
  complete: any;
}
export default defineComponent({
  components: {
    ElButton,
    ElDivider,
  },
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

    return () => (
      <div class={style.windowBar} style={winBarStyle.value}>
        <div class={style.winBarBox} ref={windowBar}>
          <div>
            {winList.value.map((item, k) => {
              return (
                <div
                  key={k}
                  onClick={() => {
                    bindClick(item);
                  }}
                  style={winItemStyle.value}
                  class={{
                    [style.winItem]: true,
                    [style.winActive]: data.activeItem == item.id,
                  }}
                >
                  <JwChat-item config={item} />
                  <div class={style.itemOperation}>
                    <el-button
                      type="info"
                      icon={Close}
                      circle
                      size="small"
                      onClick={() => {
                        bindOperation({ type: "remove", target: item });
                      }}
                    />
                  </div>
                </div>
              );
            })}
            {!winList.value.length && (
              <>
                <div>
                  <JwChat-empty size="8rem" />
                </div>
                <el-divider style="padding: 0 5px">
                  <span style="font-size: 0.2rem">暂无会话</span>
                </el-divider>
              </>
            )}
          </div>
        </div>
      </div>
    );

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
