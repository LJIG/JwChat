<template>
  <div>
    <JwChat-item :config="config" @click="bindCover" :size="size" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      size: "45",
      config: {
        img: "image/cover.png",
        name: "JwChat",
        dept: "最简单、最便捷",
        readNum: 12,
      },
    };
  },
  methods: {
    bindCover(event) {
      console.log("header", event);
    },
  },
};
</script>