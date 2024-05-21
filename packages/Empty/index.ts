import { App, Plugin } from "vue";
import Empty from "./src/index";

export const EmptyPlugin: Plugin = {
  install(app: App) {
    app.component(Empty.name as string, Empty);
  },
};

export { Empty };
