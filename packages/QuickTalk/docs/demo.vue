<template>
  <div>
    <quick-talk :taleList="talk" :config="quickConfig" @event="bindTalk" />
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      active: "1",
      quickConfig: {
        nav: ["快捷回复", "超级回复"],
        showAdd: true,
        maxlength: 200,
        showHeader: true,
        showDeleteBtn: false,
      },
      talk: [
        "快捷回复1",
        "快捷回复2",
        "快捷回复3",
        "快捷回复4",
        "快捷回复5",
        "快捷回复6",
      ],
    };
  },

  watch: {
    active: {
      handler() {
        let config = {
          nav: ["快捷回复", "超级回复"],
          showAdd: true,
          maxlength: 200,
          showHeader: true,
          showDeleteBtn: true,
        };
        if (this.active === "2") {
          config.showAdd = false;
          config.showDeleteBtn = false;
        }
        this.quickConfig = config;
        this.talk = this.talkArr;
      },
      immediate: true,
    },
  },
  computed: {
    talkArr() {
      let talk = [
        "快捷回复1",
        "快捷回复2",
        "快捷回复3",
        "快捷回复4",
        "快捷回复5",
        "快捷回复6",
      ];
      if (this.active === "2") {
        talk = [
          "超级回复1",
          "超级回复2",
          "超级回复3",
          "超级回复4",
          "超级回复5",
          "超级回复6",
        ];
      }
      return talk;
    },
  },
  methods: {
    bindTalk(play) {
      console.log("talk", play);

      const { key, value } = play;
      if (key === "navIndex") {
        this.active = value;
      }
      if (key === "select") {
        console.log("当前选择", value);
      }
      if (key === "delIndex") {
        console.log("当前删除", value);
        this.talk.splice(value, 1);
      }
      if (key === "addTalk") {
        console.log("当前增加", value);
        this.talk.push(value);
      }
    },
  },
};
</script>
