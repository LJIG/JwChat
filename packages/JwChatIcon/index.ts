import { App, Plugin } from 'vue';
import JwChatIcon from './src/index';

export const JwChatIconPlugin: Plugin = {
  install(app: App) {
    app.component('JwChat-icon', JwChatIcon);
  },
};

export {
  JwChatIcon,
};
