import { createApp } from "vue";
import App from "./App";
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import "./assets/markdown.css";

import JwChat from "../packages";
import Preview from "./components/Preview.vue";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(ElementPlus);
app.component("Preview", Preview);
app.use(JwChat).use(router).mount("#app");
