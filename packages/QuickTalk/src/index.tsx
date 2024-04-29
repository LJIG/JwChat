import { computed, defineComponent, nextTick, reactive, toRefs } from "vue";
import { CirclePlus, CircleCheck, CircleClose } from "@element-plus/icons-vue";
import style from "./index.module.scss";
import type { PropType } from "vue";

interface DataProps {
  activeIndex: string | number;
  visible: boolean;
  itemQuick: string;
}

export type ConfigProps = {
  maxlength: number;
  showAdd: boolean;
  nav: string[];
  showDeleteBtn: boolean;
  showHeader: boolean;
};

export default defineComponent({
  name: "JwChat-talk",
  props: {
    taleList: {
      type: Object as PropType<string[]>,
      default: () => [],
    },
    config: {
      type: Object as PropType<ConfigProps>,
      default: () => ({}),
    },
  },
  emits: ["event"],
  setup(props, { emit }) {
    const data = reactive<DataProps>({
      activeIndex: "1",
      visible: false,
      itemQuick: "",
    });

    const maxlength = computed(() => {
      return props.config?.maxlength || 300;
    });

    const showAddBtn = computed(() => {
      const { showAdd } = props.config;
      if (showAdd === false) {
        return false;
      }
      return true;
    });

    const showNav = computed(() => {
      const { nav = [] } = props.config;
      if (nav.length) {
        return nav;
      }
      return ["快捷回复", "常用回复"];
    });

    const showDelete = computed(() => {
      const { showDeleteBtn } = props.config;
      if (showDeleteBtn === false) {
        return false;
      }
      return true;
    });

    const showHeader = computed(() => {
      const { showHeader } = props.config;
      if (showHeader === false) {
        return false;
      }
      return true;
    });

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
          {!props.taleList.length && <JwChat-empty />}
          <ul>
            {props.taleList.map((i, k) => (
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
