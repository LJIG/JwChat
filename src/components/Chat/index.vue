<template>
  <div class="chatPage" :style="{ height, width }">
    <div class="taleBox">
      <chatList ref="chatList" :list="taleList" @click="$emit('clickTalk', $event)" @loadHistory="loadHistoryHandler"
        :config="chatListConfig">
        <template v-if="$scopedSlots.downBtn" #downBtn="{ unread }">
          <slot :unread="unread" name="downBtn" />
        </template>
      </chatList>
    </div>
    <div class="toolBox">
      <div class="tools">
        <tools :tools="toolConfig" @emoji="bindEmoji">
          <slot name="tools" slot="tools" />
        </tools>
      </div>

      <div class="enterBox">
        <div class="quickList">
          <quickList :list="quickList" :msg="msg" @submit="quickSubmit" />
        </div>
        <EnterBox @submit="$emit('enter', $event)" v-model="msg" :insert="insert" :placeholder="placeholder">
          <slot name="enter" slot="enter" />
          <slot name="enterBtn" slot="enterBtn" />
        </EnterBox>
      </div>
    </div>
  </div>
</template>

<script>
import EnterBox from './enterBox.vue'
import chatList from './chatList.vue'
import tools from './tools.vue'
import quickList from './quickList.vue'
export default {
  name: "JwChat",
  components: { EnterBox, chatList, tools, quickList },
  props: {
    taleList: {
      type: Array,
      default: () => ([])
    },
    height: {
      default: '500px'
    },
    width: {
      default: '550px'
    },
    value: {
      default: ''
    },
    scrollType: {
      default: ''
    },
    toolConfig: {
      type: Object
      // default: () => ({
      //   show: [],
      //   showEmoji: true,
      //   callback: Function
      // })
    },
    config: {},
    quickList: {
      type: Array,
      default: () => ([])
    },
    placeholder: {
      type: String
    }
  },
  data() {
    return {
      msg: '',
      insert: ''
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
    }
  },
  computed: {
    talkHeight() {
      let height = this.height
      if (`${height}`.match(/\d$/)) {
        height -= 160
      } else
        height = `calc(${height} - 160px)`
      return height
    },
    chatListConfig() {
      const { width, talkHeight: height, scrollType, config: { historyConfig = {} } = {} } = this
      return { width, height, scrollType, historyConfig }
    }
  },
  methods: {
    bindEmoji(emoji) {
      this.insert = emoji
      this.$nextTick(() => {
        this.insert = ""
      })
    },
    loadHistoryHandler() {
      const { historyConfig: { callback = null } = {} } = this.chatListConfig
      callback && callback()
    },
    quickSubmit(target) {
      const { text } = target
      this.msg = text
      this.$nextTick(() => {
        this.$emit('enter', target)
        this.msg = ''
      })
    },
    finishPullDown() {
      this.$refs.chatList.finishPullDown()
    }
  },
}
</script>
<style lang="scss" scoped>
.chatPage {
  margin: 0 auto;
  position: relative;
  background: #fff;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .taleBox {
    width: 100%;
    flex: auto;
    overflow: hidden;
  }

  .toolBox {
    height: 160px;
    min-height: 160px;
    width: 100%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    position: relative;
    display: flex;
    flex-direction: column;

    .quickList {
      width: 100%;
      transform: translateY(-100%);
      background: #fff;
      position: absolute;
      z-index: 5;
    }

    .enterBox {
      flex: auto;
    }
  }
}
</style>