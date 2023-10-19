import { App, Plugin } from 'vue';
import ChatIndex from './src/index';

export const ChatIndexPlugin: Plugin = {
  install(app: App) {
    app.component('my-chat-index', ChatIndex);
  },
};

export {
  ChatIndex,
};
