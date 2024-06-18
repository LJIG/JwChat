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

- **简化流程：** 设计简洁直观的操作流程；
- **清晰明确：** 语言表达清晰且表意明确，让用户快速理解进而作出决策；
- **帮助用户识别：** 界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。

### 可控 Controllability

- **用户决策：** 根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；
- **结果可控：** 用户可以自由的进行操作，包括撤销、回退和终止当前操作等。

---

# 安装

建议您使用包管理器（如 NPM、Yarn 或 pnpm）安装 JwChat，

使用`npm`安装。

```bash
npm install jwchat
```

使用`yarn`安装。

```bash
yarn add jwchat
```

使用`pnpm`安装。

```bash
pnpm install jwchat
```

如果您的网络环境不好，建议使用相关镜像服务 cnpm 或 中国 NPM 镜像。

---

# 使用

1. 在 `main.js` 中引入组件

```js
import JwChat from "jwchat";
import "jwchat/lib/style.css";

app.use(JwChat);
```

2. 在 `\*.vue` 中引入

```vue
<JwChat
  :taleList="list"
  @enter="bindEnter"
  v-model="inputMsg"
  :showRightBox="true"
  scrollType="noscroll"
/>
```

---

# 以文件的形式在本地直接引入

_请不要放在`public` 文件夹中。` import``public ` 文件夹中的文件中的 js，在打包时候会报错_

1. 将`lib`代码放在`/src/assets`文件夹中

2. 在 `main.ts` 中引入组件

```js
import JwChat from "./assets/lib/JwChat.es.js";
import "./assets/lib/style.css";

createApp(App).use(JwChat).mount("#app");
```

3. 在 `\*.vue` 中引入

```vue
<JwChat
  :taleList="list"
  @enter="bindEnter"
  v-model="inputMsg"
  :showRightBox="true"
  scrollType="noscroll"
/>
```

4. 如果项目使用的是`typescript` 需要在`src`目录下`*.d.ts`中声明类型。

```
// env.d.ts 或者 vite-env.d.ts
declare module "*/JwChat.es.js";
```
