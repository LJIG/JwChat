/*
 * @Author            : Bian <389701057@qq.com>
 * @Date              : 2025-08-05 17:31:41
 * @LastEditors       : LJIG <389701057@qq.com>
 * @LastEditTime      : 2025-12-08 10:21:24
 * @FilePath          : /push_npm/make-installer.ts
 * @Description       : 组件库安装器
 * Copyright (c) 2025 by Bian <389701057@qq.com>, All Rights Reserved.
 */

import { INSTALLED_KEY } from "./constants";
// import { version } from './version'
import type { App, Plugin } from "vue";

export const makeInstaller = (components: Plugin[] = []) => {
  const install = (app: App) => {
    if ((app as any)[INSTALLED_KEY]) return;
    (app as any)[INSTALLED_KEY] = true;
    components.forEach((c) =>
      // c.install?.(app)
      app.use(c)
    );
  };
  return { install /* version */ };
};
