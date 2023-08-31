<template>
  <div class="item_msg" @click="itemCallback">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props:{
    data: {
      type: Object,
      default: ()=>({})
    }
  },
  methods: {
    itemCallback() {
      this.$emit('systemEvent', this.data)
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$emit('loadDone', { type: 'custom', target: this.data })
    })
  }
}
</script>
