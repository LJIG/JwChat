import { App, Plugin } from 'vue';
import Chat from './src/index';

export const ChatPlugin: Plugin = {
  install(app: App) {
    app.component('jw-chat', Chat);
  },
};

export {
  Chat,
};
