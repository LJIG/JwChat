import JwChatIcon from "./src/index";
import type { App, Plugin } from "vue";
import type { IconProps } from "./src/icon";

export const JwChatIconPlugin: Plugin = {
  install(app: App) {
    app.component(JwChatIcon.name as string, JwChatIcon);
  },
};

export { JwChatIcon };
export type { IconProps };
