/*
 * @Author            : Bian <389701057@qq.com>
 * @Date              : 2025-08-28 17:53:50
 * @LastEditors       : LJIG <389701057@qq.com>
 * @LastEditTime      : 2025-09-01 11:17:59
 * @FilePath          : /internal/build/src/plugins/element-plus-alias.ts
 * @Description       :
 * Copyright (c) 2025 by Bian <389701057@qq.com>, All Rights Reserved.
 */

const PKG_NAME = "element-plus";
const PKG_PREFIX = "@element-plus";
// import { PKG_NAME, PKG_PREFIX } from '@element-plus/build-constants'


import type { Plugin } from "rollup";

export function ElementPlusAlias(): Plugin {
  const themeChalk = "theme-chalk";
  const sourceThemeChalk = `${PKG_PREFIX}/${themeChalk}` as const;
  const bundleThemeChalk = `${PKG_NAME}/${themeChalk}` as const;

  return {
    name: "element-plus-alias-plugin",
    resolveId(id: any) {
      if (!id.startsWith(sourceThemeChalk)) return;
      return {
        id: id.replaceAll(sourceThemeChalk, bundleThemeChalk),
        external: "absolute",
      };
    },
  };
}
