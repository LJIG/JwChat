import { App, Plugin } from "vue";
import RightList from "./src/index";

export const RightListPlugin: Plugin = {
  install(app: App) {
    app.component(RightList.name as string, RightList);
  },
};

export { RightList };
