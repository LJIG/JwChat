<!-- 加载 demo 组件 start -->
<script setup>
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css';
import fontIcons from '../src/fonts/iconfont.json'
import { useClipboard } from "@vueuse/core";

const { copy, isSupported } = useClipboard()

const copyIcon = async (text) => {
   if (!isSupported.value) return showToast('未授权，不支持')
  await copy(text || '')
  ElMessage({
    message: `'${text}' 图标复制成功`,
    type: 'success',
  })
}
</script>

<template>
  <div class="iconBox">
    <template v-for="i in fontIcons.glyphs" :key="i.font_class">
      <div class="iconItem" @click="copyIcon(`${fontIcons.css_prefix_text}${i.font_class}`)">
        <JwChat-icon :type="`${fontIcons.css_prefix_text}${i.font_class}`" class="icon" />
        <div class="icon-text">{{ `${i.font_class}`}}</div>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.iconBox{
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(6,1fr);
  justify-items: center;
  align-items: center;
}
.iconItem{
  border: 1px solid #eee;
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.icon{
  display: flex;
  font-size: 3rem;
  align-items: center;
  justify-content: center;
  transition: all .5s;
  &:hover{
    font-size: 6rem;
  }
  &:hover +div.icon-text{
    display: none;
  }
}
</style>