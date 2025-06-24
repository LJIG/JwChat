<!-- 加载 demo 组件 start -->
<script setup>
import demo from './demo.vue'
</script>
<!-- 加载 demo 组件 end -->

<!-- 正文开始 -->

# 快速回复

默认：这是一个新组件

## 基础用法

<Preview comp-name="QuickTalk" demo-name="demo">
  <demo />
</Preview>

## 参数配置

---

### Attribute

| 参数   | 说明         | 类型   | 可选值 | 默认值 |
| ------ | :----------- | ------ | ------ | ------ |
| talk   | 快捷回复内容 | Array  | -      | []     |
| config | 工具栏配置   | Object | -      | {}     |

### Methods

| 参数  | 说明             | 参数 |
| ----- | ---------------- | ---- |
| event | 组件点击选中事件 | {}   |

#### `config`参数

```json
// 格式
{
  "nav": ["快捷回复", "超级回复"],
  "showAddBtn": true,
  "showHeader": true,
  "showDeleteBtn": true
}
```
