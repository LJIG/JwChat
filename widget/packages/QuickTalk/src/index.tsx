import { computed, defineComponent, nextTick, reactive, toRefs } from "vue";
import { CirclePlus, CircleCheck, CircleClose } from "@element-plus/icons-vue";
import "./index.module.scss";
import {
  ElMenu,
  ElDialog,
  ElMenuItem,
  ElIcon,
  ElRow,
  ElCol,
  ElInput,
  ElButton,
} from "element-plus";
import type { PropType } from "vue";
import { Empty } from "jwchat/packages/Empty";

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
  // components: {
  //   ElMenu,
  //   ElDialog,
  //   ElMenuItem,
  //   ElIcon,
  //   ElRow,
  //   ElCol,
  //   ElInput,
  //   ElButton,
  // },
  props: {
    taleList: {
      type: Array as PropType<string[]>,
      default: () => [""],
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
        <div class="wrapper">
          {showHeader.value && (
            <ElMenu
              default-active={data.activeIndex}
              class="elMenuDemo"
              ellipsis={false}
              mode="horizontal"
              onSelect={handleSelect}
            >
              {showNav.value.map((item, key) => (
                <ElMenuItem index={`${key + 1}`} key={item}>
                  {item}
                </ElMenuItem>
              ))}
              <div
                style={{ visibility: showAddBtn ? "visible" : "hidden" }}
                class="addBtn"
                onClick={() => {
                  data.visible = true;
                }}
                title="新增"
              >
                <ElIcon>
                  <CirclePlus />
                </ElIcon>
              </div>
            </ElMenu>
          )}
          {!props.taleList.length && <Empty />}
          <ul>
            {props.taleList.map((i, k) => (
              <li key={JSON.stringify(i)}>
                <ElRow>
                  <ElCol span={showDelete.value == false ? 19 + 2 : 19}>
                    <p>{i}</p>
                  </ElCol>
                  <ElCol
                    span={showDelete.value == false ? 5 - 2 : 5}
                    style="text-algin: right"
                  >
                    <ElIcon
                      title="发送"
                      onClick={() => {
                        emit("event", { key: "select", value: i });
                      }}
                    >
                      <CircleCheck />
                    </ElIcon>
                    {showDelete.value && (
                      <ElIcon
                        title="删除"
                        onClick={() => {
                          emit("event", { key: "delIndex", value: k });
                        }}
                      >
                        <CircleClose />
                      </ElIcon>
                    )}
                  </ElCol>
                </ElRow>
              </li>
            ))}
          </ul>
          <ElDialog title="新增快捷回复" v-model={data.visible} width="36%">
            <ElInput
              rows="3"
              show-word-limit
              maxlength={maxlength.value}
              placeholder="请输入快捷回复语"
              v-model={data.itemQuick}
              type="textarea"
            />
            <div style="text-align: right; margin: 0; margin-top: 10px">
              <ElButton
                size="small"
                type="text"
                onClick={() => {
                  data.visible = false;
                }}
              >
                取消
              </ElButton>
              <ElButton type="primary" size="small" onClick={AddQuickFn}>
                确定
              </ElButton>
            </div>
          </ElDialog>
        </div>
      </>
    );
  },
});
