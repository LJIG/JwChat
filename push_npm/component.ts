/*
 * @Author            : Bian <389701057@qq.com>
 * @Date              : 2025-08-05 17:23:42
 * @LastEditors       : LJIG <389701057@qq.com>
 * @LastEditTime      : 2025-12-07 16:16:16
 * @FilePath          : /push_npm/component.ts
 * @Description       :
 * Copyright (c) 2025 by Bian <389701057@qq.com>, All Rights Reserved.
 */
import type { Plugin } from "vue";

import { ChatIndexPlugin } from "jwchat/packages/ChatIndex";
import { ChatPlugin } from "jwchat/packages/ChatSimple";
import { EmptyPlugin } from "jwchat/packages/Empty";
import { JwChatIconPlugin } from "jwchat/packages/JwChatIcon";
import { JwChatItemPlugin } from "jwchat/packages/JwChatItem";
import { QuickTalkPlugin } from "jwchat/packages/QuickTalk";
import { RightListPlugin } from "jwchat/packages/RightList";

export default [
  ChatIndexPlugin,
  ChatPlugin,
  EmptyPlugin,
  JwChatIconPlugin,
  JwChatItemPlugin,
  QuickTalkPlugin,
  RightListPlugin
] as Plugin[];
