import { App, Plugin } from 'vue';
import QuickTalk from './src/index';

export const QuickTalkPlugin: Plugin = {
  install(app: App) {
    app.component('quick-talk', QuickTalk);
  },
};

export {
  QuickTalk,
};
