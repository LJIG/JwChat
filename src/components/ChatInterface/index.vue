<template>
  <div class="ChatPage" :style="{ width, height }">
    <div v-if="JSON.stringify(winBarConfig) !== '{}'" class="winBar">
      <WinBar :config="winBarConfig" @click="winBarClick" />
    </div>
    <div class="ChatPage-main">
      <div class="header">
        <JwChat-item :config="config" @click="bindClick" />
        <slot name="header" />
      </div>
      <div class="main" :style="{ width: winBarWidth ? `calc(${width} - ${winBarWidth})` : width }">
        <div class="chatBox">
          <JwChat ref="jwChatEmpty" :taleList="taleList" @enter="$emit('enter', $event)" v-model="msg"
            :toolConfig="toolConfig" :scrollType="scrollType" width="100%" :height="`calc(${height} - 60px)`"
            :config="chatConfig" :quickList="quickList" :placeholder="placeholder"
            @clickTalk="$emit('clickTalk', $event)">
            <slot name="tools" slot="tools" />
            <slot name="enterBtn" slot="enterBtn" />
            <slot name="enter" slot="enter" />
            <template v-if="$scopedSlots.downBtn" #downBtn="{ unread }">
              <slot :unread="unread" name="downBtn" />
            </template>
          </JwChat>
        </div>
        <div class="rightBox" v-if="showRightBox" :style="`${!switchBox ? 'width:0;padding:0;' : ''}`">
          <span @click="switchBox = !switchBox">
            <JwChat-icon v-if="switchBox" class="switch" type="icon-jiantou-xiangyou" />
            <JwChat-icon v-else class="switch" type="icon-jiantou-xiangzuo" />
          </span>
          <slot v-if="switchBox" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WinBar from './windowBar'
export default {
  name: "JwChat-index",
  components: {
    WinBar
  },
  props: {
    config: {
      type: Object,
      default: () => ({
        img: 'image/cover.png',
        name: 'JwChat',
        dept: '最简单、最便捷',
        callback: () => { }
      })
    },
    showRightBox: {
      type: Boolean,
      default: true
    },
    taleList: {
      type: Array,
      default: () => {
        return []
      }
    },
    height: {
      type: String,
      default: "560px"
    },
    width: {
      default: "900px"
    },
    value: {
      default: ''
    },
    toolConfig: {
      type: Object
    },
    winBarConfig: {
      type: Object,
      default: () => ({})
    },
    scrollType: {
      default: "noroll"
    },
    placeholder: {
      type: String
    }
  },
  data() {
    return {
      msg: '',
      switchBox: true,
    }
  },
  computed: {
    chatConfig() {
      const { historyConfig = {} } = this.config || {}
      return { historyConfig }
    },
    winBarWidth() {
      let width = 0
      if (JSON.stringify(this.winBarConfig) !== '{}') {
        width = this.winBarConfig.width
      }
      return width
    },
    quickList() {
      const { quickList = [] } = this.config
      return quickList
    }
  },
  watch: {
    value: {
      handler() {
        this.msg = this.value;
      },
      immediate: true
    },
    msg: {
      handler() {
        this.$emit('input', this.msg);
      },
      immediate: true
    },
    showRightBox: {
      handler(newval) {
        if (typeof newval === 'boolean')
          this.switchBox = newval
      },
      immediate: true
    }
  },
  methods: {
    bindClick(type) {
      const { callback } = this.config || {}
      if (callback) {
        callback(type)
      }
    },
    winBarClick(play) {
      const { callback = null } = this.winBarConfig
      if (callback) {
        callback(play)
      }
    },
    finishPullDown() {
      this.$refs.jwChatEmpty.finishPullDown()
    }
  },
}
</script>

<style  scoped lang="scss">
.ChatPage {
  background: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;


  .winBar {
    flex: none;
    min-width: 150px;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
  }

  .ChatPage-main {
    flex: auto;
    display: flex;
    flex-direction: column;


    .header {
      box-sizing: border-box;
      background-color: #409eff;
      display: flex;
      margin: 0 auto;
      padding-left: 12px;
      align-items: center;
      height: 60px;
      width: 100%;
      position: relative;
      color: #fff;
    }

    .main {
      display: flex;
      height: calc(100% - 60px);

      .chatBox {
        flex: auto;
      }

      .rightBox {
        box-shadow: 0 -3px 3px 0 rgba(0, 0, 0, 0.1);
        max-width: 45%;
        width: 220px;
        box-sizing: border-box;
        position: relative;

        .switch {
          position: absolute;
          left: 0;
          top: 20%;
          transform: translate(-130%, 0);
          background: rgba(204, 204, 204, 0.5);
          padding: 0.3rem 0 0.3rem 0.1rem;
          border-radius: 100% 0 0 100%;
          color: #fff;
          cursor: pointer;

          &:hover {
            background: #409eff;
          }
        }

      }
    }
  }

}
</style>
