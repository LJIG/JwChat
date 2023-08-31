# 基础组件 Chat


## JwChat

<div class="tip" />
<JwChat
  class="jwChat"
  ref="jwChat"
  v-model="inputMsg"
  :taleList="taleList"
  :scrollType="scrollType"
  :toolConfig="tool"
  :placeholder="placeholder"
  :config="config"
  @enter="bindEnter"
  @clickTalk="talkEvent"
>
</JwChat>

<script>
export default {
  data () {
    return {
      scrollType: 'noroll', // scroll  noroll 俩种类型
      placeholder: "欢迎使用JwChat...",
      inputMsg: '',
      taleList: [],
      tool: {
        callback: this.toolEvent
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
      config: {
        historyConfig: {
          show: false,
          tip: "加载更多提示框,可以直接使用组件的",
          callback: this.bindLoadHistory,
        }
      },
    }
  },
  methods: {
    /**
     * @description: 点击加载更多的回调函数
     * @param {*}
     * @return {*}
     */
    async bindLoadHistory() {
      const history = new Array(3).fill().map((i, j) => {
        return {
          date: "2020/05/20 23:19:07",
          text: { text: j + new Date() },
          mine: false,
          name: "JwChat",
          img: "image/three.jpeg",
        };
      });
      let list = history.concat(this.taleList);
      this.taleList = list;
      console.log("加载历史", list, history);
      //  加载完成后通知组件关闭加载动画
      this.config.historyConfig.tip = "加载完成";
      this.$nextTick(() => {
        this.$refs.jwChat.finishPullDown();
      });
    },
    bindEnter (e) {
      console.log(e)
      const msg = this.inputMsg
      if (!msg) return;
      const msgObj = {
        "date": "2020/05/20 23:19:07",
        "text": { "text": msg },
        "mine": true,
        "name": "JwChat",
        "img": "../image/three.jpeg"
      }
      this.list.push(msgObj)
    },
    toolEvent (type, obj) {
      console.log('tools', type, obj)
    },
    talkEvent (play) {
      console.log(play)
    },
  },
   mounted () {
    const img = 'https://www.baidu.com/img/flexible/logo/pc/result.png'
    const list = [
        {
          "date": "2020/04/25 21:19:07",
          "text": { "text": "起床不" },
          "mine": false,
          "name": "留恋人间不羡仙",
          "img": "../image/one.jpeg"
        },
        {
          "date": "2020/04/25 21:19:07",
          "text": { "text": "<audio data-src='https://www.w3school.com.cn/i/horse.mp3'/>" },
          "mine": false,
          "name": "只盼流星不盼雨",
          "img": "../image/two.jpeg"
        },
        {
          "date": "2020/04/25 21:19:07",
          "text": { "text": "<img data-src='"+img+"'/>" },
          "mine": false,
          "name": "只盼流星不盼雨",
          "img": "../image/two.jpeg"
        },
        {
          "date": "2020/04/25 21:19:07",
          "text": { "text": "<img data-src='../image/three.jpeg'/>" },
          "mine": false,
          "name": "只盼流星不盼雨",
          "img": "../image/two.jpeg"
        },
        {
          "date": "2020/04/16 21:19:07",
          "text": { "text": "<video data-src='https://www.w3school.com.cn/i/movie.mp4' controls='controls' />" },
          "mine": true,
          "name": "JwChat",
          "img": "../image/three.jpeg"
        },
        {
          "date": "2021/03/02 13:14:21",
          "mine": false,
          "name": "留恋人间不羡仙",
          "img": "../image/one.jpeg",
          "text": {
            system: {
              title: '在接入人工前，智能助手将为您首次应答。',
              subtitle: '猜您想问:',
              content: [
                {
                  id: `system1`,
                  text: '组件如何使用'
                },
                {
                  id: `system2`,
                  text: '组件参数在哪里查看'
                },
                {
                  id: 'system',
                  text: '我可不可把组件用在商业'
                }
              ]
            }
          }
        },
        {
          "date": "2020/04/25 21:19:07",
          "text": {
            "text": "<i class='el-icon-document-checked' style='font-size:2rem;'/>",
            "subLink":{
              "text": "a.txt",
              "prop": {
                underline: false
              }
            },
          },
          "mine": false,
          "name": "留恋人间不羡仙",
          "img": "../image/one.jpeg"
        },
      ]
    this.taleList = list
  }
}
</script>

<style scoped>
.tip{
  margin: 1rem 0;
}
.jwChat{
  margin: 1rem 0;
  box-shadow: 0 0px 0px rgba(0, 0, 0, 0.25), 0 1px 2px rgba(0, 0, 0, 0.22);
}
</style>


:::details 点击查看代码
``` vue
<JwChat
  ref="jwChat"
  v-model="inputMsg"
  :config="config"
  :taleList="list"
  :scrollType="scrollType"
  :toolConfig="tool"
  :placeholder="placeholder"
  :quickList="quickList"
  @enter="bindEnter"
  @clickTalk="talkEvent"
>

  <!-- <template slot="enter">
    <div>自定义输入框</div>
  </template> -->
  <!-- <template slot="enterBtn">
    <div>自定义按钮</div>
  </template> -->
  <!-- <template #downBtn="{unread}">
    <div>
      未读{{unread}}
    </div>
  </template> -->
  <!-- <template slot="tools">
    <div style="width: 20rem; text-align: right" @click="toolEvent(12)">
      <JwChat-icon type="icon-lishi" title="自定义" />
    </div>
  </template> -->
</JwChat>

<script>
export default {
  data () {
    return {
      scrollType: 'noroll', // scroll  noroll 俩种类型
      placeholder: "欢迎使用JwChat...",
      inputMsg: '',
      taleList: [],
      tool: {
        callback: this.toolEvent
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
      config: {
        historyConfig: {
          show: false,
          tip: "加载更多提示框,可以直接使用组件的",
          callback: this.bindLoadHistory,
        }
      },
    }
  },
  methods: {
    /**
     * @description: 点击加载更多的回调函数
     * @param {*}
     * @return {*}
     */
    async bindLoadHistory() {
      const history = new Array(3).fill().map((i, j) => {
        return {
          date: "2020/05/20 23:19:07",
          text: { text: j + new Date() },
          mine: false,
          name: "JwChat",
          img: "image/three.jpeg",
        };
      });
      let list = history.concat(this.taleList);
      this.taleList = list;
      console.log("加载历史", list, history);
      //  加载完成后通知组件关闭加载动画
      this.config.historyConfig.tip = "加载完成";
      this.$nextTick(() => {
        this.$refs.jwChat.finishPullDown();
      });
    },
    bindEnter (e) {
      console.log(e)
      const msg = this.inputMsg
      if (!msg) return;
      const msgObj = {
        "date": "2020/05/20 23:19:07",
        "text": { "text": msg },
        "mine": true,
        "name": "JwChat",
        "img": "../image/three.jpeg"
      }
      this.list.push(msgObj)
    },
    toolEvent (type, obj) {
      console.log('tools', type, obj)
    },
    talkEvent (play) {
      console.log(play)
    },
  },
   mounted () {
    const img = 'https://www.baidu.com/img/flexible/logo/pc/result.png'
    const list = [
        {
          "date": "2020/04/25 21:19:07",
          "text": { "text": "起床不" },
          "mine": false,
          "name": "留恋人间不羡仙",
          "img": "../image/one.jpeg"
        },
        {
          "date": "2020/04/25 21:19:07",
          "text": { "text": "<audio data-src='https://www.w3school.com.cn/i/horse.mp3'/>" },
          "mine": false,
          "name": "只盼流星不盼雨",
          "img": "../image/two.jpeg"
        },
        {
          "date": "2020/04/25 21:19:07",
          "text": { "text": "<img data-src='"+img+"'/>" },
          "mine": false,
          "name": "只盼流星不盼雨",
          "img": "../image/two.jpeg"
        },
        {
          "date": "2020/04/25 21:19:07",
          "text": { "text": "<img data-src='../image/three.jpeg'/>" },
          "mine": false,
          "name": "只盼流星不盼雨",
          "img": "../image/two.jpeg"
        },
        {
          "date": "2020/04/16 21:19:07",
          "text": { "text": "<video data-src='https://www.w3school.com.cn/i/movie.mp4' controls='controls' />" },
          "mine": true,
          "name": "JwChat",
          "img": "../image/three.jpeg"
        },
        {
          "date": "2021/03/02 13:14:21",
          "mine": false,
          "name": "留恋人间不羡仙",
          "img": "../image/one.jpeg",
          "text": {
            system: {
              title: '在接入人工前，智能助手将为您首次应答。',
              subtitle: '猜您想问:',
              content: [
                {
                  id: `system1`,
                  text: '组件如何使用'
                },
                {
                  id: `system2`,
                  text: '组件参数在哪里查看'
                },
                {
                  id: 'system',
                  text: '我可不可把组件用在商业'
                }
              ]
            }
          }
        },
        {
          "date": "2020/04/25 21:19:07",
          "text": {
            "text": "<i class='el-icon-document-checked' style='font-size:2rem;'/>",
            "subLink":{
              "text": "a.txt",
              "prop": {
                underline: false
              }
            },
          },
          "mine": false,
          "name": "留恋人间不羡仙",
          "img": "../image/one.jpeg"
        },
      ]
    this.taleList = list
  }
}
</script>

```
:::

## 参数配置

### Attribute

| 参数       | 说明           | 类型   | 可选值 | 默认值 |
| :--------: | :------------: | :----: | :----: | :----: |
| v-model    | 输入框中的文字 | String | -      | ""     |
| taleList   | 要渲染的数据 | Array  | -      | []     |
| toolConfig | 工具栏配置     | Object | -      | {}     |
| width      | 聊天框宽度     | string | -      | 550px  |
| height     | 聊天框高度     | string | -      | 500px  |
| config     | 组件配置项     | Object | -      | {}     |
| scrollType | 滚动类型 | String | scroll (滚动到最新消息) | noroll (停留当期位置) |
| quickList | 快捷回复-根据输入内容显示 | Array | - | [] |
| placeholder | 输入框占位符 | string | - | '请输入内容...' |

### Methods

| 参数      | 说明                               | 参数           |
| --------- | ---------------------------------- | -------------- |
| enter     | 输入框点击就发送或者回车触发的事件 | 输入的原始数据 |
| clickTalk | 点击聊天框列中的用户和昵称触发事件 | 当前对话数据   |

### Event

| 事件           | 说明                 | 传参 |
| -------------- | -------------------- | ---- |
| finishPullDown | 通知组件关闭加载动画 | -    |



###  Slot

| name   | 说明           |
| ------ | -------------- |
| tools | 工具栏自定义插槽 |
| enter | 舍弃组件输入框，用户自定义插槽 |
| downBtn | 下拉按钮自定义插槽 |
| enterBtn | 发送按钮自定义插槽 |
| talkItem | 对话框自定义插槽 ｜

### `toolConfig` 说明

``` js
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

``` js
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

``` js
[
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
]
```