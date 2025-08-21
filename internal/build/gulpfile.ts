/*
 * @Author            : Bian <389701057@qq.com>
 * @Date              : 2025-08-14 15:35:07
 * LastEditors        LJIG <389701057@qq.com>
 * LastEditTime       2025-08-14 16:34:13
 * FilePath           /internal/build/rollup.config.js
 * @Description       :
 * Copyright (c) 2025 by Bian <389701057@qq.com>, All Rights Reserved.
 */

import { buildConfig, run, runTask, withTaskName } from "./src";
import { parallel, series } from "gulp";
import { copyFile, mkdir } from "fs/promises";
import { epOutput, projRoot } from "@jwchat/build-utils";

// console.log({epOutput,projRoot});


export default series(
  withTaskName("clean", () => run("pnpm run clean")),
  withTaskName("createOutput", () => mkdir(epOutput, { recursive: true })),

  parallel(
    runTask("buildModules")
    //   runTask("buildFullBundle"),
    //   runTask("generateTypesDefinitions"),
    //   runTask("buildHelper"),
    //   series(
    //     withTaskName("buildThemeChalk", () =>
    //       run("pnpm run -C packages/theme-chalk build")
    //     ),
    //     copyFullStyle
    //   )
  )

  // parallel(copyTypesDefinitions, copyFiles)
);

export * from './src'
