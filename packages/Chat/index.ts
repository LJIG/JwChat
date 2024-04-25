import { App, Plugin } from "vue";
import Chat from "./src/index";

export const ChatPlugin: Plugin = {
  install(app: App) {
    app.component(Chat.name as string, Chat);
  },
};

export { Chat };
