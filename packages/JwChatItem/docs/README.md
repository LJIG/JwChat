<!-- 加载 demo 组件 start -->
<script setup>
import demo from './demo.vue'
</script>
<!-- 加载 demo 组件 end -->

<!-- 正文开始 -->

# 单条人目录

默认：这是一个新组件

## 基础用法

<Preview comp-name="JwChatItem" demo-name="demo">
  <demo />
</Preview>

## 参数配置

---

### Attribute

| 参数   | 说明         | 类型          | 可选值 | 默认值 |
| ------ | :----------- | ------------- | ------ | ------ |
| config | 组件配置对象 | Object        | -      | {}     |
| size   | 封面图大小   | String/number | -      | 35     |

### Methods

| 参数  | 说明             | 参数 |
| ----- | ---------------- | ---- |
| click | 组件点击选中事件 | {}   |

- #### `config`

```json
// 格式
{
    img: '', // 头像
    name: 'JwChat',
    dept: '', // 下边文字
    callback: ()=>{}, // 点击回调函数
}
```
