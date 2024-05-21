import { App, Plugin } from "vue";
import ChatIndex from "./src/index";

export const ChatIndexPlugin: Plugin = {
  install(app: App) {
    app.component(ChatIndex.name as string, ChatIndex);
  },
};

export { ChatIndex };
