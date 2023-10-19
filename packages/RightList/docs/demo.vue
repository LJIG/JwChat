<template>
  <el-button @click="showNotice" size="small" style="margin-top: 1rem">
    传入公告
  </el-button>
  <div>
    <my-right-list
      class="rightSlot"
      :config="rightConfig"
      @click="rightClick"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      rightConfig: {},
    };
  },
  watch: {
    show: {
      handler(newVal) {
        let _c = {
          listTip: "当前在线",
          // notice: '【公告】这是一款高度自由的聊天组件，基于AVue、Vue、
          // Element-ui开发。点个赞再走吧 ',
          list: [
            {
              name: "JwChat",
              img: "../image/three.jpeg",
            },
            {
              name: "留恋人间不羡仙",
              img: "../image/one.jpeg",
            },
            {
              name: "只盼流星不盼雨",
              img: "../image/two.jpeg",
            },
            {
              name: "JwChat",
              img: "../image/three.jpeg",
            },
            {
              name: "留恋人间不羡仙",
              img: "../image/one.jpeg",
            },
            {
              name: "只盼流星不盼雨",
              img: "../image/two.jpeg",
            },
            {
              name: "JwChat",
              img: "../image/three.jpeg",
            },
            {
              name: "留恋人间不羡仙",
              img: "../image/one.jpeg",
            },
            {
              name: "只盼流星不盼雨",
              img: "../image/two.jpeg",
            },
            {
              name: "JwChat",
              img: "../image/three.jpeg",
            },
            {
              name: "留恋人间不羡仙",
              img: "../image/one.jpeg",
            },
            {
              name: "只盼流星不盼雨",
              img: "../image/two.jpeg",
            },
          ],
        };
        if (newVal) {
          _c.notice = `【公告】这是一款高度自由的聊天组件，基于
            AVue、Vue、Element-ui开发。点个赞再走吧 `;
        }
        this.rightConfig = _c;
      },
      immediate: true,
    },
  },
  methods: {
    rightClick(type) {
      console.log("rigth", type);
    },
    showNotice() {
      this.show = !this.show;
    },
  },
};
</script>
<style scoped>
.rightSlot {
  width: 200px;
  height: 440px !important;
  margin: 2rem auto;
  overflow: hidden;
  flex-direction: column;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}
.rightSlot >>> li {
  list-style: none;
}
</style>
