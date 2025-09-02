/*
 * @Author            : Bian <389701057@qq.com>
 * @Date              : 2025-08-15 11:03:13
 * @LastEditors       : LJIG <389701057@qq.com>
 * @LastEditTime      : 2025-09-01 18:07:29
 * @FilePath          : /internal/build-utils/src/paths.ts
 * @Description       :
 * Copyright (c) 2025 by Bian <389701057@qq.com>, All Rights Reserved.
 */

import { resolve } from "path";

export const projRoot = resolve(__dirname, "..", "..", "..");
export const buildRoot = resolve(projRoot, "internal", "build");
export const pkgRoot = resolve(projRoot, "widget");
// export const epRoot = resolve(pkgRoot, 'element-plus')
export const epRoot = resolve(pkgRoot, '')

/** `/dist` */
export const buildOutput = resolve(projRoot, "dist");
/** `/dist/element-plus` */
export const epOutput = resolve(buildOutput, "widget");

export const epPackage = resolve(epRoot, 'package.json')

const windowsSlashRE = /\\/g;

/**
 * 规范化路径以使用正斜杠。
 * 这对于确保不同平台之间的路径格式一致非常有用。
 */
export function normalizePath(p: string): string {
  if (typeof process !== "undefined" && process.platform === "win32") {
    return p.replace(windowsSlashRE, "/");
  }
  return p;
}
