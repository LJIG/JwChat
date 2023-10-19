import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  reactive,
  toRefs,
} from "vue";
import style from "./itemTalk.module.scss";
import {
  configParseEmoji,
  parseEmoji as emojiParser,
} from "wechat-emoji-parser";
configParseEmoji({ size: 24, emojiSpriteUrl: "/emoji-sprite.png" }); // 设置一些参数
interface DataProps {
  tags: Array<string>;
  show: boolean;
  loadState: boolean;
  imgSrc: string;
  videoSrc: string;
  audioSrc: string;
  // [key: string]: string;
  // keyof: any;
}

export default defineComponent({
  inheritAttrs: false,
  props: {
    text: String,
  },
  // 定义抛出的事件名称
  emits: ["loadDone", "systemEvent"],
  setup(props, { emit }) {
    const data: DataProps = reactive({
      tags: ["img", "video", "audio"],
      /* 查看文件详情 */
      show: false,
      imgSrc: "",
      videoSrc: "",
      audioSrc: "",
      loadState: false,
    });

    const getData: any = computed(() => {
      const str = props.text || "";
      const dom = document.createElement("div");
      dom.innerHTML = str;
      const target: any = dom.firstChild;

      const src = target.getAttribute("data-src");
      const controls = target.getAttribute("controls") || false;
      return {
        src,
        controls,
      };
    });

    const getTag: any = computed(() => {
      const str = props.text || "";
      let tag: string = "span";
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
      const type = getTag;
      if (data.tags.includes(type)) return;
      nextTick(() => {
        emit("loadDone", { type, target: props.text });
      });
    });

    /* const refData = toRefs(data);
    return {
      ...refData,
      getData,
      getTag,
      load,
      handleClose,
      itemCallback,
      showDialog,
      parseText,
    }; */

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

    function load(type: any) {
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
    function showDialog({ tag }: { tag: string }): void {
      const { src } = getData;
      const callback = () => {
        const config: { [key: string]: { target: string; show: boolean } } = {
          FILE: { target: "", show: false },
          img: { target: "imgSrc", show: true },
          video: { target: "videoSrc", show: true },
          audio: { target: "audioSrc", show: true },
        };

        const current = config[tag];
        if (!current) return;

        if (tag === "FILE") {
          window.open(src);
          return;
        }
        data.show = current.show;
        (data as any)[current.target] = src;

        // if (tag === "img") {
        //   data.imgSrc = src;
        // }
        // if (tag === "video") {
        //   data.videoSrc = src;
        // }
        // if (tag === "audio") {
        //   data.audioSrc = src;
        // }
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

  methods: {
    //处理排版
    /*  handleDetail (html = '') {
       let tag = 'span'
       let options = {}
       if (this.isObject(html)) {
         const { type, content } = html
         tag = type
         options = content
       } else {
         tag = this.getTag(html)
       }
 
       this.createdElement(tag, content)
 
       let result = html;
       result = emojiParser(result).replace(/(<img src)/g, '<img data-class="iconBox" data-src')
       setTimeout(() => {
         const list = this.$refs.content;
         list.forEach(ele => {
           for (let i = 0; i < ele.children.length; i++) {
             const child = ele.children[i];
             child.onload = this.childnodeLoad
             // console.log(child.parentNode)
             if (child.getAttribute('data-flag') != 0) {
               child.setAttribute('data-flag', 0)
               child.onclick = () => {
                 this.handleEvent(child)
               };
               if (child.tagName === 'IMG') {
                 child.className = 'web__msg--img'
                 const icon = child.getAttribute('data-class')
                 if (icon !== 'iconBox') child.type = "IMG"
                 child.src = child.getAttribute('data-src')
               } else if (child.tagName === 'VIDEO') {
                 child.type = "VIDEO"
                 child.className = 'web__msg--video'
                 child.src = child.getAttribute('data-src')
               } else if (child.tagName === 'AUDIO') {
                 child.type = "AUDIO"
                 child.className = 'web__msg--audio'
                 child.controls = 'controls';
                 child.src = child.getAttribute('data-src')
               } else if (child.tagName === 'FILE') {
                 child.type = "FILE"
                 child.className = 'web__msg--file'
                 child.innerHTML = `<h2>File</h2><span>${child.getAttribute('data-name')}</span>`
               } else if (child.tagName === 'MAP') {
                 child.type = "MAP"
                 child.className = 'web__msg--file web__msg--map'
                 child.innerHTML = `<h2>Map</h2><span>${child.getAttribute('data-longitude')} , ${child.getAttribute('data-latitude')}<br />${child.getAttribute('data-address')}</span>`
               }
             }
           }
         });
         console.log('n')
       }, 200)
       return result;
     }, */
  },
});
