/*
 * @Author            : Bian <389701057@qq.com>
 * @Date              : 2025-08-29 15:48:54
 * @LastEditors       : LJIG <389701057@qq.com>
 * @LastEditTime      : 2025-12-15 14:42:37
 * @FilePath          : /internal/build/src/build-info.ts
 * @Description       :
 * Copyright (c) 2025 by Bian <389701057@qq.com>, All Rights Reserved.
 */
import path from 'path'
// import { PKG_NAME } from '@jwchat/build-constants'
const PKG_NAME = 'element-plus'
import { epOutput } from '@jwchat/build-utils'

// console.log({epOutput})

export const modules = ["esm", "cjs"] as const;
export type Module = typeof modules[number];

export interface BuildInfo {}

export const buildConfig: Record<Module, BuildInfo> = {
  esm: {
    module: 'ESNext',
    format: 'esm',
    ext: 'mjs',
    output: {
      name: 'es',
      path: path.resolve(epOutput, 'es'),
    },
    bundle: {
      path: `${PKG_NAME}/es`,
    },
  },
  cjs: {
    module: 'CommonJS',
    format: 'cjs',
    ext: 'js',
    output: {
      name: 'lib',
      path: path.resolve(epOutput, 'lib'),
    },
    bundle: {
      path: `${PKG_NAME}/lib`,
    },
  },
}

export const buildConfigEntries = Object.entries(
  buildConfig
) as BuildConfigEnteries;

export type BuildConfigEnteries = [Module, BuildInfo][];

export const target = "es2018";
