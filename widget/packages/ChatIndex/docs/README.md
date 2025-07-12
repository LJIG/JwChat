<!-- 加载 demo 组件 start -->
<script setup>
import demo from './demo.vue'
</script>
<!-- 加载 demo 组件 end -->

<!-- 正文开始 -->

# Chat 组件

JwChat 聊天组件，简单集成。1111

## 基础用法

<Preview comp-name="ChatIndex" demo-name="demo">
  <demo />
</Preview>

## 参数配置

### Attribute

|     参数     |       说明        |  类型   |         可选值          |        默认值         |
| :----------: | :---------------: | :-----: | :---------------------: | :-------------------: |
|   v-model    |  输入框中的文字   | String  |            -            |          ""           |
|   taleList   |     会话内容      |  Array  |            -            |          []           |
|  toolConfig  |    工具栏配置     | Object  |            -            |          {}           |
|    width     | JwChat 界面框宽度 | string  |            -            |         750px         |
|    height    | JwChat 界面框高度 | string  |            -            |         570px         |
|    config    | 聊天组件基础配置  | Object  |            -            |          {}           |
|  scrollType  |     滚动类型      | String  | scroll (滚动到最新消息) | noroll (停留当期位置) |
| showRightBox |   显示右边内容    | Boolean |          false          |         true          |
| winBarConfig |    多窗口配置     | Object  |            -            |          {}           |
| placeholder  |   输入框占位符    | string  |            -            |    '请输入内容...'    |

### Methods

| 参数      | 说明                               | 参数           |
| --------- | ---------------------------------- | -------------- |
| enter     | 输入框点击就发送或者回车触发的事件 | 输入的原始数据 |
| clickTalk | 点击聊天框列中的用户和昵称触发事件 | 当前对话数据   |

### Slot

| name      | 说明                             |
| --------- | -------------------------------- |
| header    | 头部自定义插槽                   |
| -         | 右侧自定义插槽(不需要 name 属性) |
| tools     | 工具栏自定义插槽                 |
| enter     | 舍弃组件输入框，用户自定义插槽   |
| downBtn   | 下拉按钮自定义插槽               |
| enterBtn  | 发送按钮自定义插槽               |
| talkItem  | 对话框自定义插槽                 |
| winBarBtn | 删除按钮自定义插槽               |

### `config` 说明

```js
{
  img: '../image/cover.png',
  name: 'JwChat',
  dept: '最简单、最便捷',
  callback: bindCover (event) {
    console.log('header', event)
  },
  historyConfig: {
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
  quickList: [
    {text: '这里是jwchat，您想了解什么问题。'},
    {text: 'jwchat是最好的聊天组件'},
    {text: '谁将烟焚散，散了纵横的牵绊；听弦断，断那三千痴缠。'},
    {text: '长夏逝去。山野间的初秋悄然涉足。'},
    {text: '江南风骨，天水成碧，天教心愿与身违。'},
    {text: '总在不经意的年生。回首彼岸。纵然发现光景绵长。'},
    {text: '外面的烟花奋力的燃着，屋里的人激情的说着情话'},
    {text: '假如你是云，我就是雨，一生相伴，风风雨雨；'},
    {text: '即使泪水在眼中打转，我依旧可以笑的很美，这是你学不来的坚强。'},
    {text: ' 因为不知来生来世会不会遇到你，所以今生今世我会加倍爱你。'},
  ],
  maxlength: 30,
}
```

### `toolConfig` 说明

**具体请查看 `chat` 组件介绍**

### `winBarConfig` 说明

```js
{
  active: 'win00', // 当前选中
  width: '160px', // 宽度大小
  listHeight: '60px', // 单个高度
  list: [ {
    id: 'win00',
    img: '/image/cover.png',
    name: 'JwChat',
    dept: '最简单、最便捷'
  },
  {
    id: 'win01',
    img: '/image/three.jpeg',
    name: '阳光明媚爱万物',
    dept: '沙拉黑油'
  },
  {
    id: 'win02',
    img: '/image/two.jpeg',
    name: '只盼流星不盼雨',
    dept: '最后说的话'
  },
  {
    id: 'win03',
    img: '/image/one.jpeg',
    name: '留恋人间不羡仙',
    dept: '这里可以放万物'
  },
  {
    id: 'win04',
    img: '/image/three.jpeg',
    name: '阳光明媚爱万物',
    dept: '官方客服'
  }],
  callback: (play = {}) {
    const {type, data={}} = play
    console.log(data);
    if(type==='winBar'){
      const { id, dept, name, img } = data
      this.winBarConfig.active = id
    }
  }
}
```
