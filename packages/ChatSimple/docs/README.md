<!-- 加载 demo 组件 start -->
<script setup>
import demo from './demo.vue'
</script>
<!-- 加载 demo 组件 end -->

<!-- 正文开始 -->

# Chat 组件（simple）

JwChat 聊天组件, 本组件只有一个聊天框

## 基础用法

<Preview comp-name="ChatSimple" demo-name="demo">
  <demo />
</Preview>

## 参数配置

### Attribute

|    参数     |           说明            |  类型  |         可选值          |        默认值         |
| :---------: | :-----------------------: | :----: | :---------------------: | :-------------------: |
|   v-model   |      输入框中的文字       | String |            -            |          ""           |
|  taleList   |       要渲染的数据        | Array  |            -            |          []           |
| toolConfig  |        工具栏配置         | Object |            -            |          {}           |
|    width    |        聊天框宽度         | string |            -            |         550px         |
|   height    |        聊天框高度         | string |            -            |         500px         |
|   config    |        组件配置项         | Object |            -            |          {}           |
| scrollType  |         滚动类型          | String | scroll (滚动到最新消息) | noroll (停留当期位置) |
|  quickList  | 快捷回复-根据输入内容显示 | Array  |            -            |          []           |
| placeholder |       输入框占位符        | string |            -            |    '请输入内容...'    |

### Methods

| 参数      | 说明                               | 参数           |
| --------- | ---------------------------------- | -------------- |
| enter     | 输入框点击就发送或者回车触发的事件 | 输入的原始数据 |
| clickTalk | 点击聊天框列中的用户和昵称触发事件 | 当前对话数据   |

### Event

| 事件           | 说明                 | 传参 |
| -------------- | -------------------- | ---- |
| finishPullDown | 通知组件关闭加载动画 | -    |

### Slot

| name     | 说明                           |
| -------- | ------------------------------ |
| tools    | 工具栏自定义插槽               |
| enter    | 舍弃组件输入框，用户自定义插槽 |
| downBtn  | 下拉按钮自定义插槽             |
| enterBtn | 发送按钮自定义插槽             |
| talkItem | 对话框自定义插槽               |

### `toolConfig` 说明

```js
{
    // 现在只配置了 ["file", "video", "img", "hongbao", "more", "history"]
    show: ['file', 'history', 'img', ['文件1', '', '美图']],// 二级数组中放自定义名称
    showEmoji: true, // 是否显示表情图标
     /**
     * @description: 点击按钮的回调函数
     * @param {*} type 当前点击的按钮
     * @param {*} plyload 附加文件或者需要处理的数据
     * @return {*}
     */
	callback: toolEvent (type, plyload) {
   		console.log('tools', type, plyload)
	}
}


```

### `config` 说明

```js
{
  historyConfig: {
    show: true,
    tip: '滚动到顶时候显示的提示',
    /**
     * @description: 点击加载更多的回调函数
     * @param {*}
     * @return {*}
     */
    callback: bindLoadHistory (done) {
      const history = new Array(3).fill().map((i, j) => {
        return {
          "date": "2020/05/20 23:19:07",
          "text": { "text": j + new Date() },
          "mine": false,
          "name": "JwChat",
          "img": "image/three.jpeg"
        }
      })
      let list = history.concat(this.list)
      this.list = list
      //  加载完成后通知组件关闭加载动画
      this.config.historyConfig.tip = "加载完成";
      this.$nextTick(() => {
        // 组件完成加载后需要需要告知组件 下列方法任选一种
        // 1.直接调用 done
        done()
        // 2.直接使用组件方法
        // this.$refs.jwChat.finishPullDown();
      });
    }
  },
  maxlength: 300, // 输入框长度，默认300
}
```

### `quickList` 说明

```js
[
  { text: "这里是jwchat，您想了解什么问题。" },
  { text: "jwchat是最好的聊天组件" },
  { text: "谁将烟焚散，散了纵横的牵绊；听弦断，断那三千痴缠。" },
  { text: "长夏逝去。山野间的初秋悄然涉足。" },
  { text: "江南风骨，天水成碧，天教心愿与身违。" },
  { text: "总在不经意的年生。回首彼岸。纵然发现光景绵长。" },
  { text: "外面的烟花奋力的燃着，屋里的人激情的说着情话" },
  { text: "假如你是云，我就是雨，一生相伴，风风雨雨；" },
  { text: "即使泪水在眼中打转，我依旧可以笑的很美，这是你学不来的坚强。" },
  { text: " 因为不知来生来世会不会遇到你，所以今生今世我会加倍爱你。" },
];
```
