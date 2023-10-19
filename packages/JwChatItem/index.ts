import { App, Plugin } from 'vue';
import JwChatItem from './src/index';

export const JwChatItemPlugin: Plugin = {
  install(app: App) {
    app.component('JwChat-item', JwChatItem);
  },
};

export {
  JwChatItem,
};
