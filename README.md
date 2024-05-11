# JwChat

<!-- <p align="center">
  <a href="https://gitee.com/CodeGI/chat" rel="nofollow">
    <img src="https://img.shields.io/badge/JwChat-NPM-red" alt="JwChat css js vue 聊天组件">
  </a>
</p> -->

#### 介绍

**一款基于 Vue 和 ElementPlus 的极简的聊天框组件**
本项目是一款极简的数据驱动为主的聊天框组件。
新增表情包可自动匹配微信表情。
新增聊天窗口配置组件，可以自由配置 顶部状态栏 和 右侧信息栏
**Vue2 版本 请加群**

![](https://img-blog.csdnimg.cn/20210307230254986.gif)

![](https://img-blog.csdnimg.cn/20210307230254368.gif)

#### 安装

- 使用 `npm` 安装

  ```bash
  npm install jwchat
  ```

- 使用 `pnpm` 安装

  ```bash
  pnpm add jwchat
  ```

#### 使用

1. 因为本组件是基于 `element-plus` 开发。首先需要引入 `element-plus`。

   ```bash
   pnpm install element-plus
   ```

2. 在 `main.js` 中引入组件

   ```js
   import ElementUI from "element-plus";
   import "element-plus/dist/index.css";
   import Chat from "jwchat";
   import "jwchat/style.css";

   import App from "./App.vue";
   const app = createApp(App);

   app.use(ElementPlus);
   app.use(Chat);
   app.mount("#app");
   ```

3. 在 `*.vue` 中引入

   ```vue
   <JwChat-index
     :taleList="list"
     @enter="bindEnter"
     v-model="inputMsg"
     :toolConfig="tool"
   />
   ```

#### 文档

- [**官方文档**](https://codegi.gitee.io/jwchatdoc/)

#### 跟新公告

- `/ 修改` 样式优化

#### 参与贡献

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request

#### 推荐项目

- [AVue](https://avuejs.com/) **本代码借鉴项目**
- [JPower](https://gitee.com/gdzWork/JPower)

#### 交流学习

- QQ 群 ： 235689934 (已满)
- QQ 群 ： 791302027
