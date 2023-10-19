<!--
 * @Author: Bian <389701057@qq.com>
 * @Date: 2022-04-18 16:37:08
 * @LastEditTime: 2022-07-07 15:16:58
 * @LastEditors: Bian 389701057@qq.com
 * @Description: 
 * @FilePath: \packages\Chat\src\itemTalk.vue
 * hello 
-->
<template>
  <!-- <div> -->
  <span class="item_msg" @click="itemCallback">
    <span v-if="getTag === 'span'" v-html="parseText()" />
    <img
      class="web__msg--img"
      v-if="getTag === 'img'"
      :src="getData.src"
      @click="showDialog({ tag: 'img' })"
      @load="load('img')"
    />
    <video
      class="web__msg--video"
      v-if="getTag === 'video'"
      :src="getData.src"
      controls
      @click="showDialog({ tag: 'video' })"
      @canplaythrough="load('video')"
    />
    <audio
      class="web__msg--audio"
      v-if="getTag === 'audio'"
      style="width: 20rem; height: 20px"
      :src="getData.src"
      controls
      @canplaythrough="load('audio')"
    />
  </span>
  <!-- 查看区域 -->
  <el-dialog
    v-if="['video', 'img'].includes(getTag)"
    v-model="show"
    append-to-body
    width="40%"
    @close="handleClose"
  >
    <img :src="imgSrc" v-if="imgSrc" style="width: 100%; object-fit: cover" />
    <video
      :src="videoSrc"
      v-if="videoSrc"
      style="width: 100%; object-fit: cover"
      controls
    ></video>
    <audio
      :src="audioSrc"
      v-if="audioSrc"
      style="width: 100%; object-fit: cover"
      controls
    ></audio>
  </el-dialog>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  reactive,
  toRefs,
} from "vue";
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

    const refData = toRefs(data);
    return {
      ...refData,
      getData,
      getTag,
      load,
      handleClose,
      itemCallback,
      showDialog,
      parseText,
    };

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
</script>
<style lang="scss" scoped>
.item_msg {
  padding: 0px;
  margin: 0px;
  display: inline-block;
  display: flex;
  .web__msg--img,
  .web__msg--video,
  .web__msg--file {
    max-width: 250px;
    min-width: 50px;
    width: 100%;
    margin: 10px 0;
    border: 1px solid #eee;
    overflow: hidden;
    border-radius: 5px;
    cursor: pointer;
    display: block;
  }
  // .web__msg--img[data-class="iconBox"] {
  //   max-width: 24px;
  //   min-width: unset;
  //   border: none;
  //   margin: 0;
  //   vertical-align: bottom;
  //   display: inline-block;
  // }
}
</style>