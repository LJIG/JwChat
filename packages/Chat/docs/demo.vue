<template>
  <div style="border: 1px solid #ccc;">
    <jw-chat ref="jwChat" v-model="inputMsg" :toolConfig="tool" :taleList="list" :config="config" scrollType="noroll"
      :quickList="quickList" @enter="bindEnter" @clickTalk="talkEvent" />
  </div>
</template>

<script>
import { reactive, ref, nextTick, defineComponent } from 'vue'
export default defineComponent({
  setup() {

    const img = "https://www.baidu.com/img/flexible/logo/pc/result.png";
    const listData = [
      {
        date: "2020/04/25 21:19:07",
        text: {
          text: "<i class='el-icon-document-checked' style='font-size:2rem;'/>",
          subLink: {
            text: "a.txt",
            prop: {
              underline: false,
            },
          },
        },
        mine: false,
        name: "留恋人间不羡仙",
        img: "image/one.jpeg",
      },
      {
        date: "",
        text: { text: "起床不" },
        mine: false,
        name: "留恋人间不羡仙",
        img: "image/one.jpeg",
      },
      {
        text: "2020/04/25 21:19:07",
        type: "tip",
      },
      {
        date: "2020/04/25 21:19:07",
        text: {
          text: "<audio data-src='https://www.w3school.com.cn/i/horse.mp3'/>",
        },
        mine: false,
        name: "只盼流星不盼雨",
        img: "image/two.jpeg",
      },
      {
        date: "2020/04/25 21:19:07",
        text: { text: "<img data-src='" + img + "'/>" },
        mine: false,
        name: "只盼流星不盼雨",
        img: "image/two.jpeg",
      },
      {
        date: "2020/04/16 21:19:07",
        text: {
          text: "<video data-src='https://www.w3school.com.cn/i/movie.mp4' controls='controls' />",
        },
        mine: true,
        name: "JwChat",
        img: "image/three.jpeg",
      },
      {
        date: "2021/03/02 13:14:21",
        mine: false,
        name: "留恋人间不羡仙",
        img: "image/one.jpeg",
        text: {
          system: {
            title: "在接入人工前，智能助手将为您首次应答。",
            subtitle: "猜您想问:",
            content: [
              {
                id: `system1`,
                text: "组件如何使用",
              },
              {
                id: `system2`,
                text: "组件参数在哪里查看",
              },
              {
                id: "system",
                text: "我可不可把组件用在商业",
              },
            ],
          },
        },
      },
      {
        date: "2020/04/25 21:19:07",
        mine: false,
        name: "留恋人间不羡仙",
        img: "image/one.jpeg",
        text: {
          shop: {
            title: `2022年寒假读一本好书小学生三四五六年级课外读
        物阅读书籍经典儿童文学 回到远古和神仙们聊天 王云超著`,
            describe:
              "购买1-3件时享受单件价￥18.20，超出数量以结算价为准，仅限购买一次:",
            price: "999.99",
            cover: "image/two.jpeg",
            // queue: 'col',
            // queue: 'row',
            tags: [
              { name: "第二件半价" },
              { name: "送50元优惠" },
              { name: "满1件,送50元优惠" },
            ],
          },
        },
      },
      {
        date: "",
        text: { text: "起床不" },
        mine: false,
        name: "留恋人间不羡仙",
        img: "image/one.jpeg",
      },
    ];
    const jwChat = ref(null)

    const config = reactive({
      historyConfig: {
        show: true,
        // tip: "加载更多提示框,可以直接使用组件的",
        callback: bindLoadHistory,
      },
    })

    const inputMsg = ref('');

    const list = ref([]);

    const tool = reactive({
      show: ["file", "history", "img", ["文件1", "", "美图"]],
      // showEmoji: false,
      callback: toolEvent,
    });

    const quickList = ref([
      { text: "这里是jwchat，您想了解什么问题。", id: 3 },
      { text: "jwchat是最好的聊天组件", id: 4 },
      { text: "谁将烟焚散，散了纵横的牵绊；听弦断，断那三千痴缠。", id: 5 },
      { text: "长夏逝去。山野间的初秋悄然涉足。", id: 6 },
      { text: "江南风骨，天水成碧，天教心愿与身违。", id: 7 },
      { text: "总在不经意的年生。回首彼岸。纵然发现光景绵长。", id: 8 },
      { text: "外面的烟花奋力的燃着，屋里的人激情的说着情话", id: 10 },
      { text: "假如你是云，我就是雨，一生相伴，风风雨雨；", id: 11 },
      {
        text: "即使泪水在眼中打转，我依旧可以笑的很美，这是你学不来的坚强。",
        id: 12,
      },
      {
        text: " 因为不知来生来世会不会遇到你，所以今生今世我会加倍爱你。",
        id: 13,
      },
    ])

    list.value = getListArr();

    function getListArr(size) {
      const listSize = listData.length;
      if (!size) {
        size = listSize;
      }
      let result = [];
      for (let i = 0; i < size; i++) {
        const item = listData[i]; //[Math.random()*listSize>>0]
        item.id = Math.random().toString(16).substr(-6);
        result.push(item);
      }
      return result;
    }

    /**
     * @description:
     * @param {*} type 当前点击的按钮
     * @param {*} plyload 附加文件或者需要处理的数据
     * @return {*}
     */
    function toolEvent(type, plyload) {
      console.log("tools", type, plyload);
    }

    /**
     * @description: 点击加载更多的回调函数
     * @param {*}
     * @return {*}
     */
    async function bindLoadHistory() {
      const history = new Array(3).fill().map((i, j) => {
        return {
          date: "2020/05/20 23:19:07",
          text: { text: j + new Date() },
          mine: false,
          name: "JwChat",
          img: "image/three.jpeg",
        };
      });
      let concatList = history.concat(list.value);
      list.value = concatList;
      // console.log("加载历史", list.value, history);
      //  加载完成后通知组件关闭加载动画
      config.historyConfig.tip = "加载完成";
      nextTick(() => {
        jwChat.value.finishPullDown();
      });
    }

    function talkEvent(play) {
      console.log(play);
    }

    function bindEnter(str) {
      const msg = inputMsg.value;
      if (!msg) return;
      const msgObj = {
        date: "2020/05/20 23:19:07",
        text: { text: msg },
        mine: true,
        name: "JwChat",
        img: "image/three.jpeg",
      };
      list.value.push(msgObj);
    }

    return {
      jwChat,
      /* variable */
      config,
      inputMsg,
      list,
      tool,
      quickList,
      /* function */
      toolEvent,
      bindLoadHistory,
      talkEvent,
      bindEnter
    };
  }
});
</script>
