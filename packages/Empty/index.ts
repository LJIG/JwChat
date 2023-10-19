import { App, Plugin } from 'vue';
import Empty from './src/index';

export const EmptyPlugin: Plugin = {
  install(app: App) {
    app.component('JwChat-empty', Empty);
  },
};

export {
  Empty,
};
