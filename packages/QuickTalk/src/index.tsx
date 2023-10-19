import { computed, defineComponent, nextTick, reactive, toRefs } from "vue";
import { CirclePlus, CircleCheck, CircleClose } from "@element-plus/icons-vue";
import style from "./index.module.scss";
interface DataProps {
  activeIndex: string | number;
  visible: boolean;
  itemQuick: string;
}
export default defineComponent({
  name: "JwChat-talk",
  props: {
    Talelist: {
      type: Array,
      default: () => [],
    },
    config: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ["event"],
  setup(props, { emit }) {
    const data: DataProps = reactive({
      activeIndex: "1",
      visible: false,
      itemQuick: "",
    });

    const maxlength = computed(() => {
      const maxlength = props.config?.maxlength || 300;
      return maxlength;
    });

    const showAddBtn = computed(() => {
      let result = true;
      const { showAdd = true } = props.config;
      if (!showAdd) {
        result = false;
      }
      return result;
    });

    const showNav = computed(() => {
      let navList = ["快捷回复", "常用回复"];
      const { nav } = props.config;
      if (nav) {
        const [a, b] = nav;
        navList = [a, b];
      }
      return navList;
    });

    const showDelete = computed(() => {
      let show = true;
      const { showDeleteBtn } = props.config || {};
      if (showDeleteBtn === false) {
        show = false;
      }
      return show;
    });

    const showHeader = computed(() => {
      let heder = true;
      const { showHeader = true } = props.config || {};
      if (showHeader === false) {
        heder = false;
      }
      return heder;
    });

    const refData = toRefs(data);
    // return {
    //   CirclePlus,
    //   CircleCheck,
    //   CircleClose,
    //   ...refData,
    //   maxlength,
    //   showAddBtn,
    //   showNav,
    //   showDelete,
    //   showHeader,

    //   handleSelect,
    //   AddQuickFn,
    //   show,
    // };
    function show() {
      data.visible = true;
    }

    function handleSelect(index: number) {
      data.activeIndex = index;
      emit("event", { key: "navIndex", value: index });
    }

    function AddQuickFn() {
      emit("event", { key: "addTalk", value: data.itemQuick });
      data.visible = false;
      nextTick(() => {
        data.itemQuick = "";
      });
    }

    return () => (
      <>
        <div class={style.wrapper}>
          {showHeader.value && (
            <el-menu
              default-active={data.activeIndex}
              class={style.elMenuDemo}
              ellipsis={false}
              mode="horizontal"
              onSelect={handleSelect}
            >
              {showNav.value.map((item, key) => (
                <el-menu-item index={`${key + 1}`} key={item}>
                  {item}
                </el-menu-item>
              ))}
              <div
                style={{ visibility: showAddBtn ? "visible" : "hidden" }}
                class={style.addBtn}
                onClick={() => {
                  data.visible = true;
                }}
                title="新增"
              >
                <el-icon>
                  <CirclePlus />
                </el-icon>
              </div>
            </el-menu>
          )}
          {!props.Talelist.length && <JwChat-empty />}
          <ul>
            {props.Talelist.map((i, k) => (
              <li key={JSON.stringify(i)}>
                <el-row>
                  <el-col span={showDelete.value == false ? 19 + 2 : 19}>
                    <p>{i}</p>
                  </el-col>
                  <el-col
                    span={showDelete.value == false ? 5 - 2 : 5}
                    style="text-algin: right"
                  >
                    <el-icon
                      title="发送"
                      onClick={() => {
                        emit("event", { key: "select", value: i });
                      }}
                    >
                      <CircleCheck />
                    </el-icon>
                    {showDelete.value && (
                      <el-icon
                        title="删除"
                        onClick={() => {
                          emit("event", { key: "delIndex", value: k });
                        }}
                      >
                        <CircleClose />
                      </el-icon>
                    )}
                  </el-col>
                </el-row>
              </li>
            ))}
          </ul>
          <el-dialog title="新增快捷回复" v-model={data.visible} width="36%">
            <el-input
              rows="3"
              show-word-limit
              maxlength={maxlength.value}
              placeholder="请输入快捷回复语"
              v-model={data.itemQuick}
              type="textarea"
            />
            <div style="text-align: right; margin: 0; margin-top: 10px">
              <el-button
                size="small"
                type="text"
                onClick={() => {
                  data.visible = false;
                }}
              >
                取消
              </el-button>
              <el-button type="primary" size="small" onClick={AddQuickFn}>
                确定
              </el-button>
            </div>
          </el-dialog>
        </div>
      </>
    );
  },
});
