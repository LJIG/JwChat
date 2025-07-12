/*
 * @Author            : Bian <389701057@qq.com>
 * @Date              : 2025-06-24 22:44:04
 * @LastEditors       : LJIG <389701057@qq.com>
 * @LastEditTime      : 2025-06-24 22:44:05
 * @FilePath          : /packages/env.d.ts
 * @Description       : 
 * Copyright (c) 2025 by Bian <389701057@qq.com>, All Rights Reserved. 
 */

declare module "*.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "*.md" {
  import { ComponentOptions } from "vue";
  const Component: ComponentOptions;
  export default Component;
}

declare module "wechat-emoji-parser";

declare module "@/utils/scroll";

declare module "*.scss" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module "*.png";
declare module "@/utils/imgUrl";
