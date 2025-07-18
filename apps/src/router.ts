/*
 * @Author: Bian 389701057@qq.com
 * @Date: 2022-07-07 11:57:35
 * @LastEditors: Bian <389701057@qq.com>
 * @LastEditTime: 2022-10-11 19:06:00
 * @FilePath: \src\router.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/* eslint-disable prettier/prettier */

/**
 * !--------- FBI WARNING ----------!
 *
 * 根据 /packages 目录下的组件所生成的组件类侧边导航栏配置，请勿手动修改
 */

import { createRouter, createWebHashHistory, RouterOptions } from "vue-router";

const routes = [
  {
    title: "开始",
    name: "index",
    path: "/",
    component: () => import("./pages/index.md"),
  },
  {
    title: "聊天组件",
    name: "ChatSimple",
    path: "/components/ChatSimple",
    component: () => import("jwchat/ChatSimple/docs/README.md"),
  },
  {
    title: "图标",
    name: "JwChatIcon",
    path: "/components/JwChatIcon",
    component: () => import("jwchat/JwChatIcon/docs/README.md"),
  },
  {
    title: "组件主页",
    name: "ChatIndex",
    path: "/components/ChatIndex",
    component: () => import("jwchat/ChatIndex/docs/README.md"),
  },
  {
    title: "用户条目",
    name: "JwChatItem",
    path: "/components/JwChatItem",
    component: () => import("jwchat/JwChatItem/docs/README.md"),
  },
  {
    title: "右侧组件",
    name: "RightList",
    path: "/components/RightList",
    component: () => import("jwchat/RightList/docs/README.md"),
  },
  {
    title: "空状态",
    name: "Empty",
    path: "/components/Empty",
    component: () => import("jwchat/Empty/docs/README.md"),
  },
  {
    title: "快速回复",
    name: "QuickTalk",
    path: "/components/QuickTalk",
    component: () => import("jwchat/QuickTalk/docs/README.md"),
  },
];

const routerConfig = {
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to: any, from: any) {
    if (to.path !== from.path) {
      return { top: 0 };
    }
  },
};

const router = createRouter(routerConfig as RouterOptions);

export default router;
