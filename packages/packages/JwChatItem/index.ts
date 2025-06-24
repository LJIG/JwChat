import JwChatItem from "./src/index";
import type { App, Plugin } from "vue";

export const JwChatItemPlugin: Plugin = {
  install(app: App) {
    app.component(JwChatItem.name as string, JwChatItem);
  },
};

export { JwChatItem };
