/* eslint-disable */

/**
 * !--------- FBI WARNING ----------!
 *
 * 根据 /packages 目录下的组件所生成的模块导出，请勿手动修改
 */
import { App, Plugin } from "vue";

import { ChatPlugin } from "./Chat";
import { JwChatIconPlugin } from "./JwChatIcon";
import { ChatIndexPlugin } from "./ChatIndex";
import { JwChatItemPlugin } from "./JwChatItem";
import { RightListPlugin } from "./RightList";
import { EmptyPlugin } from "./Empty";
import { QuickTalkPlugin } from "./QuickTalk";

const JwChatPlugin: Plugin = {
  install(app: App) {
    ChatPlugin.install?.(app);
    JwChatIconPlugin.install?.(app);
    ChatIndexPlugin.install?.(app);
    JwChatItemPlugin.install?.(app);
    RightListPlugin.install?.(app);
    EmptyPlugin.install?.(app);
    QuickTalkPlugin.install?.(app);
  },
};

export default JwChatPlugin;

export * from "./Chat";
export * from "./JwChatIcon";
export * from "./ChatIndex";
export * from "./JwChatItem";
export * from "./RightList";
export * from "./Empty";
export * from "./QuickTalk";
