import { PropType, computed, defineComponent, reactive } from "vue";
import { getEmojis } from "wechat-emoji-parser";
import style from "./tools.module.scss";
import { ToolsProps, DataProps } from "../types/tools";

const emojis = getEmojis({ size: 26, emojiSpriteUrl: "/emoji-sprite.png" });

// interface DataProps {
//   emoji: Array<any>;
//   toolConfig: {
//     [key: string]: { icon: string; title: string };
//   };
//   newTitle: string[] | null;
//   emojiShow: Boolean;
// }

// type toolsProps = {
//   showEmoji?: Boolean;
//   show?: Array<string | string[]>;
//   callback?: Function;
// };

const Props = {
  tools: {
    type: Object as PropType<ToolsProps>,
    default: () => {
      return {
        show: ["file"],
        showEmoji: true,
        callback: () => {},
      };
    },
  },
};

export default defineComponent({
  name: "JwChat-tools",
  props: Props,
  setup(props, { emit, slots }) {
    const data = reactive<DataProps>({
      emoji: emojis,
      toolConfig: {
        file: { icon: "icon-wenjian", title: "文件" },
        video: { icon: "icon-shipin", title: "视频" },
        img: { icon: "icon-xiangce", title: "图片" },
        hongbao: { icon: "icon-hongbao", title: "红包" },
        history: { icon: "icon-lishi", title: "历史" },
        more: { icon: "icon-gengduo", title: "更多" },
      },
      newTitle: null,
      emojiShow: false,
    });

    const showEmoji = computed(() => {
      const { showEmoji = true } = props.tools || {};
      return showEmoji;
    });

    const showkeys = computed(() => {
      let keys = Object.keys(data.toolConfig);
      const { show = [] } = props.tools || {};
      const _key: Array<string> = [];
      if (show.length > 0) {
        show.forEach((i) => {
          if (Array.isArray(i)) {
            data.newTitle = i;
            return;
          }
          if (keys.includes(i)) _key.push(i);
        });
      }
      return _key;
    });

    return () => (
      <div class={style.toolsBox}>
        {showEmoji.value && (
          <el-popover
            placement="top-start"
            trigger="click"
            ref="popover"
            visible={data.emojiShow}
            v-slots={{
              reference: () => (
                <JwChat-icon
                  class={style.toolIcon}
                  type="icon-xiaolian"
                  title="表情"
                  onClick={() => {
                    data.emojiShow = !data.emojiShow;
                  }}
                />
              ),
            }}
          >
            <ul class={style.emjioBox}>
              <emojiDom />
            </ul>
          </el-popover>
        )}
        {showkeys.value.map((item, k) => (
          <>
            {data.toolConfig[item] ? (
              <span key={JSON.stringify(item)}>
                <span
                  onClick={() => {
                    bindButton(item);
                  }}
                >
                  <JwChat-icon
                    class={style.toolIcon}
                    type={data.toolConfig[item].icon}
                    title={iconTitle(item, k)}
                  />
                </span>
              </span>
            ) : (
              <i
                key={item + k}
                class={item}
                onClick={() => {
                  bindButton(item);
                }}
              ></i>
            )}
          </>
        ))}
        {/* <slot name="tools" /> */}
        {slots.tools?.()}
      </div>
    );

    function emojiDom() {
      const result: any = [];
      data.emoji.forEach((item, i) => {
        result.push(
          <li key={item.code}>
            <a
              title={item.cn}
              style={item.style}
              onClick={() => {
                selectEmit(item.cn);
              }}
            ></a>
          </li>
        );
      });
      return result;
    }

    function iconTitle(key: string, index: number) {
      let title = "";
      // newTitle = ['自定义标题1', '自定义标题2']
      if (data.newTitle) {
        title = data.newTitle[index] || "";
      }
      if (!title) {
        title = data.toolConfig[key].title;
      }
      return title;
    }

    function selectEmit(type: string) {
      data.emojiShow = false;
      emit("emoji", type);
    }

    function bindButton(type: string) {
      if (!props.tools.callback) return console.warn("callback not find");
      if (type === "file") {
        openFile(type, props.tools.callback);
      } else {
        props.tools.callback(type);
      }
    }

    function openFile(type: string, callback: Function) {
      var input: any = document.createElement("input");
      input.type = "file";
      input.multiple = "multiple";
      input.click();
      input.onchange = function () {
        var file = input.files;
        callback(type, file);
      };
    }

    function emojiStyle(item: any) {
      const emojiitem = data.emoji[item];
      if (!emojiitem) return {};
      return {
        display: "inline-block",
        background: `url('https://res.wx.qq.com/a/wx_fed/webwx/res/static/img/6AfH8-r.png')  no-repeat`,
        width: `28px`,
        height: `28px`,
        "background-position": emojiitem.position,
      };
    }
  },
});
