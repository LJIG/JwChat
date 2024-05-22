import Empty from "./src/index";
import type { App, Plugin } from "vue";

export const EmptyPlugin: Plugin = {
  install(app: App) {
    app.component(Empty.name as string, Empty);
  },
};

export { Empty };
