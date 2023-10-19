<!--
 * @Author       : Bian <389701057@qq.com>
 * @Date         : 2022-10-20 23:42:28
 * @LastEditors  : Bian <389701057@qq.com>
 * @LastEditTime : 2022-10-20 23:54:34
 * @FilePath     : \src\pages\index.md
 * @Description  : 主页
 * Copyright (c) 2022 by Bian <389701057@qq.com>, All Rights Reserved. 
-->
# 介绍

JwChat 是借鉴 [AVue](https://avuejs.com/) 。[element-plus](https://element-plus.gitee.io/zh-CN/) 进行开发的 `IM` 组件。

### 效率 Efficiency

*   **简化流程：** 设计简洁直观的操作流程；
*   **清晰明确：** 语言表达清晰且表意明确，让用户快速理解进而作出决策；
*   **帮助用户识别：** 界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。

### 可控 Controllability

*   **用户决策：** 根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；
*   **结果可控：** 用户可以自由的进行操作，包括撤销、回退和终止当前操作等。

----

# 使用

1. 因为本组件是基于 `element-plus` 开发。首先需要引入 `element-plus`。

```js
npm install element-ui
```

2. 在 `main.js` 中引入组件

``` js
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
app.use(ElementPlus)

import JwChat from 'jwchat';
app.use(JwChat)
```

3. 在 *.vue 中引入
``` xml
<JwChat-index
    :taleList="list"
    @enter="bindEnter"
    v-model="inputMsg"
    :showRightBox='true'
    scrollType="noscroll"
 />
 ```

 ----
 # 安装


使用`yarn`安装。
``` bash
yarn add jwchat
```

使用`npm`安装。
``` bash
npm i jwchat
```

国内网络不好的同学可使用`cnpm`安装。
::: tip
``` bash
cnpm i jwchat -S
``` 
:::