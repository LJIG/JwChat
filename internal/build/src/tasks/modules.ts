/*
 * @Author            : Bian <389701057@qq.com>
 * @Date              : 2025-08-21 11:29:33
 * @LastEditors       : LJIG <389701057@qq.com>
 * @LastEditTime      : 2025-08-27 17:45:47
 * @FilePath          : /internal/build/src/tasks/modules.ts
 * @Description       :
 * Copyright (c) 2025 by Bian <389701057@qq.com>, All Rights Reserved.
 */
import { series } from "gulp";
// import glob from "fast-glob";
import { withTaskName } from "../utils";
// import { projRoot, excludeFiles, pkgRoot } from "@jwchat/build-utils";

import type { TaskFunction } from "gulp";

async function buildModulesComponents() {
  // const input = excludeFiles(
  //   await glob(["**/*.{js,ts,vue}", "!**/style/(index|css).{js,ts,vue}"], {
  //     cwd: pkgRoot,
  //   })
  // );
  // console.log({ projRoot });

  console.log("buildModulesComponents aaa");
}

export const buildModules: TaskFunction = series(
  withTaskName("buildModulesComponents", buildModulesComponents)
);
