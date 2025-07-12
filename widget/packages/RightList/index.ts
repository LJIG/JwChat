import RightList from "./src/index";
import type { App, Plugin } from "vue";

export const RightListPlugin: Plugin = {
  install(app: App) {
    app.component(RightList.name as string, RightList);
  },
};

export { RightList };
