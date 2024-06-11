import { computed, defineComponent, nextTick, onMounted, reactive } from "vue";
import style from "./itemTalk.module.scss";
import { emojiImg } from "@/utils/imgUrl";
import {
  configParseEmoji,
  parseEmoji as emojiParser,
} from "wechat-emoji-parser";
configParseEmoji({ size: 24, emojiSpriteUrl: emojiImg }); // 设置一些参数
import { ElDialog } from "element-plus";
import type { PropType } from "vue";

interface DataProps {
  tags: Array<string>;
  show: boolean;
  loadState: boolean;
  imgSrc: string;
  videoSrc: string;
  audioSrc: string;
}

export default defineComponent({
  inheritAttrs: false,
  components: { ElDialog },
  props: {
    text: {
      type: String as PropType<string>,
      default: "",
    },
  },
  // 定义抛出的事件名称
  emits: ["loadDone", "systemEvent"],
  setup(props, { emit }) {
    const data = reactive<DataProps>({
      tags: ["img", "video", "audio"],
      /* 查看文件详情 */
      show: false,
      imgSrc: "",
      videoSrc: "",
      audioSrc: "",
      loadState: false,
    });

    const getData = computed<{ src: string; controls: boolean }>(() => {
      const str = props.text;
      const dom = document.createElement("div") as HTMLDivElement;
      dom.innerHTML = str;
      const target = dom.firstChild as HTMLElement;

      const src = target.getAttribute("data-src") || "";
      const controls = (target.getAttribute("controls") && true) || false;
      return {
        src,
        controls,
      };
    });

    const getTag = computed<string>(() => {
      const str = props.text;
      let tag = "span";
      let type = "";
      if (str.match(/<\/?[^>]+>/)) {
        type = str.split(" ")[0].replace(/<|>/, "") || "";
        if (data.tags.includes(type)) {
          tag = type;
        }
      }
      return tag;
    });

    onMounted(() => {
      const type = getTag.value;
      if (data.tags.includes(type)) return;
      nextTick(() => {
        emit("loadDone", { type, target: props.text });
      });
    });

    return () => (
      <>
        <span class={style.item_msg} onClick={itemCallback}>
          {getTag.value === "span" && <span v-html={parseText()} />}
          {getTag.value === "img" && (
            <img
              class={style["web__msg--img"]}
              src={getData.value.src}
              onClick={() => {
                showDialog({ tag: "img" });
              }}
              onLoad={() => {
                load("img");
              }}
            />
          )}
          {getTag.value === "video" && (
            <video
              class={style["web__msg--video"]}
              src={getData.value.src}
              controls
              onClick={() => {
                showDialog({ tag: "video" });
              }}
              onCanplaythrough={() => {
                load("video");
              }}
            />
          )}
          {getTag.value === "audio" && (
            <audio
              class={style["web__msg--audio"]}
              style="width: 20rem; height: 20px"
              src={getData.value.src}
              controls
              onCanplaythrough={() => {
                load("audio");
              }}
            />
          )}
        </span>
        {/* <!-- 查看区域 --> */}
        {["video", "img"].includes(getTag.value) && (
          <el-dialog
            v-model={data.show}
            append-to-body
            width="40%"
            onClose={handleClose}
          >
            {data.imgSrc && (
              <img src={data.imgSrc} style="width: 100%; object-fit: cover" />
            )}
            {data.videoSrc && (
              <video
                src={data.videoSrc}
                style="width: 100%; object-fit: cover"
                controls
              ></video>
            )}
            {data.audioSrc && (
              <audio
                src={data.audioSrc}
                style="width: 100%; object-fit: cover"
                controls
              ></audio>
            )}
          </el-dialog>
        )}
      </>
    );

    function load(type: string) {
      if (data.loadState) return;
      data.loadState = true;
      emit("loadDone", { type, target: props.text });
    }
    function handleClose(done: Function) {
      data.imgSrc = "";
      data.videoSrc = "";
      data.audioSrc = "";
      // done();
    }
    // getInfo<T extends keyof DataProps>(key: T): Person[T]
    function showDialog({ tag }: { tag: "img" | "video" | "FILE" }): void {
      const { src } = getData.value;
      const callback = () => {
        const config = {
          FILE: { target: "", show: false },
          img: { target: "imgSrc", show: true },
          video: { target: "videoSrc", show: true },
          audio: { target: "audioSrc", show: true },
        };

        const current = config[tag];
        if (!current) return;

        // TODO: 未发现调用
        if (tag === "FILE") {
          window.open(src);
          return;
        }
        data.show = current.show;
        data[current.target] = src;
      };

      callback();
    }
    function itemCallback() {
      emit("systemEvent", props.text);
    }

    function parseText() {
      let { text } = props;
      if (!text) return;
      text = text.replace(/\n/g, "<br/>");
      const html = emojiParser(text);
      return html;
    }
  },
});
