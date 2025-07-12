import JwChatIcon from "./src/index";
import type { App, Plugin } from "vue";

export const JwChatIconPlugin: Plugin = {
  install(app: App) {
    app.component(JwChatIcon.name as string, JwChatIcon);
  },
};

export { JwChatIcon };
