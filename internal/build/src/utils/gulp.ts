/*
 * @Author            : Bian <389701057@qq.com>
 * @Date              : 2025-08-15 10:34:10
 * @LastEditors       : LJIG <389701057@qq.com>
 * @LastEditTime      : 2025-08-18 14:22:32
 * @FilePath          : /internal/build/src/utils/gulp.ts
 * @Description       :
 * Copyright (c) 2025 by Bian <389701057@qq.com>, All Rights Reserved.
 */

import { buildRoot } from "@jwchat/build-utils";
import { run } from "./process";

import type { TaskFunction } from "gulp";


export const withTaskName = <T extends TaskFunction>(name: string, fn: T) =>
  Object.assign(fn, { displayName: name });

export const runTask = (name: string) =>
  withTaskName(`shellTask:${name}`, () => {
    debugger;
    console.log({ buildRoot });
    return run(`pnpm run start ${name}`, buildRoot);
  });
