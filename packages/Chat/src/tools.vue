import { reactive } from 'vue';
<!--
 * @Author: Bian <389701057@qq.com>
 * @Date: 2022-04-18 14:49:03
 * @LastEditTime: 2022-07-07 17:15:53
 * @LastEditors: Bian 389701057@qq.com
 * @Description: 
 * @FilePath: \packages\Chat\src\tools.vue
 * hello 
-->
<template>
  <div class="toolsBox">
    <template v-if="showEmoji">
      <el-popover
        placement="top-start"
        trigger="click"
        ref="popover"
        :visible="emojiShow"
      >
        <ul class="emjioBox">
          <li v-for="item in emoji" :key="item.code">
            <a
              :title="item.cn"
              :style="item.style"
              @click="selectEmit(item.cn)"
            >
            </a>
          </li>
        </ul>
        <template #reference>
          <JwChat-icon
            class="toolIcon"
            type="icon-xiaolian"
            title="表情"
            @click="emojiShow = !emojiShow"
          />
        </template>
      </el-popover>
    </template>
    <template v-for="(item, k) in showkeys">
      <span v-if="toolConfig[item]" :key="item">
        <span @click="bindButton(item)">
          <JwChat-icon
            class="toolIcon"
            :type="toolConfig[item].icon"
            :title="iconTitle(item, k)"
          />
        </span>
      </span>
      <i v-else :key="item + k" :class="item" @click="bindButton(item)"></i>
    </template>
    <slot name="tools" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from "vue";
import { getEmojis } from "wechat-emoji-parser";

const emojis = getEmojis({ size: 26, emojiSpriteUrl: "/emoji-sprite.png" });

interface DataProps {
  emoji: Array<any>;
  toolConfig: {
    [key: string]: { icon: string; title: string };
  };
  newTitle: string | null;
  emojiShow: Boolean;
}

export default defineComponent({
  name: "JwChat-tools",
  props: {
    tools: {
      type: Object,
      default: () => {
        return {
          show: ["file"],
          showEmoji: true,
          callback: () => {},
        };
      },
    },
  },
  setup(props, { emit }) {
    const data: DataProps = reactive({
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
        show.forEach((i: string) => {
          if (Array.isArray(i)) {
            data.newTitle = i;
            return;
          }
          if (keys.includes(i)) _key.push(i);
        });
        // keys = _key
      }
      return _key;
    });

    const refData = toRefs(data);
    return {
      ...refData,
      showEmoji,
      showkeys,
      iconTitle,
      selectEmit,
      bindButton,
    };

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
</script>

<style lang="scss" scoped>
.toolsBox {
  position: relative;
  text-align: left;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  height: 30px;
}
.toolIcon {
  padding-left: 6px;
  font-size: 20px;
  color: #888a91;
  &:hover {
    color: #76b1f9;
  }
}
.emjioBox {
  background: #fff;
  height: 150px;
  width: 300px;
  overflow: auto;
  text-align: left;
  padding: 0;
  li {
    display: inline-block;
    width: 28px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    cursor: pointer;
  }
}
</style>
