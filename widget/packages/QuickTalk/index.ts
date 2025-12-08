import QuickTalk from "./src/index";
import type { App, Plugin } from "vue";

export const QuickTalkPlugin: Plugin = {
  install(app: App) {
    app.component(QuickTalk.name as string, QuickTalk);
  },
};

export { QuickTalk };
