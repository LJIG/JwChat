import ChatIndex from "./src/index";
import type { App, Plugin } from "vue";

export const ChatIndexPlugin: Plugin = {
  install(app: App) {
    app.component(ChatIndex.name as string, ChatIndex);
  },
};

export { ChatIndex };
