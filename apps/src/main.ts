import { createApp } from "vue";
import App from "./App";
import router from "./router";
/* import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue"; */


import Preview from "./components/Preview.vue";
import "./assets/markdown.css";

/* 代码引入测试 */
/* 1. */
import JwChat from "jwchat";
// import "jwchat/index.css";
/* 2. */
// import JwChat from "/public/dist/index.full.min.mjs"; //  mjs

/* 3. */
// import JwChat from "/public/dist/es/packages/Empty/src/index"; 
// const JwChat = require("/public/dist/lib/packages/Empty/src/index") ; 

console.log('%capps/src/main.ts:20 JwChat', 'color: #007acc;', JwChat);

const app = createApp(App);

/* app.use(ElementPlus);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
} */

app.component("Preview", Preview);

/* 1. 2. */
app.use(JwChat);

/* 3. */
// app.component(JwChat.name, JwChat)

/* 本地引入 */
// console.log(window.JwChat);
// app.use(window.JwChat.default)

app.use(router).mount("#app");
