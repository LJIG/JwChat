/*
 * @Author            : Bian <389701057@qq.com>
 * @Date              : 2025-08-21 11:29:33
 * @LastEditors       : LJIG <389701057@qq.com>
 * @LastEditTime      : 2025-09-02 15:01:00
 * @FilePath          : /internal/build/src/tasks/modules.ts
 * @Description       :
 * Copyright (c) 2025 by Bian <389701057@qq.com>, All Rights Reserved.
 */
import { series } from "gulp";
import { rollup } from "rollup";
import glob from "fast-glob";
import { generateExternal, withTaskName, writeBundles } from "../utils";
import VueMacros from "unplugin-vue-macros/rollup";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import esbuild from "rollup-plugin-esbuild";
import scss from "rollup-plugin-scss";
import url from "@rollup/plugin-url";
import json from "@rollup/plugin-json";
import alias from "@rollup/plugin-alias";
import { projRoot, excludeFiles, pkgRoot, epRoot } from "@jwchat/build-utils";
import { buildConfigEntries, target } from "../build-info";
import { ElementPlusAlias } from "../plugins/element-plus-alias";

import type { TaskFunction } from "gulp";
import type { Plugin, OutputOptions } from "rollup";

const plugins: Plugin[] = [
  // alias({
  //   entries: [
  //     { find: '@', replacement: pkgRoot },
  //     { find: '@/utils', replacement: `${pkgRoot}/utils` },
  //   ],
  // }),
  ElementPlusAlias(),
  VueMacros({
    setupComponent: false,
    setupSFC: false,
    plugins: {
      vue: vue({
        isProduction: true,
        template: {
          compilerOptions: {
            hoistStatic: false,
            cacheHandlers: false,
          },
        },
      }),
      vueJsx: vueJsx(),
    },
  }),
  nodeResolve({
    extensions: [".mjs", ".js", ".json", ".ts", ".tsx"],
  }),
  commonjs(),
  json(),
  url({
    include: ["**/*.png", "**/*.jpg", "**/*.jpeg", "**/*.gif", "**/*.svg"],
    limit: 8192, // 小于 8KB 的文件会被内联为 base64
  }),
  scss({
    output: false, // 不输出单独的 CSS 文件
    processor: (css) => css, // 直接返回处理后的 CSS
  }),
  esbuild({
    sourceMap: true,
    target,
    loaders: {
      ".vue": "ts",
      ".tsx": "tsx",
    },
    define: {
      "process.env.NODE_ENV": '"production"',
    },
  }),
];

async function buildModulesComponents() {
  const input = excludeFiles(
    await glob(["**/src/index.{ts,tsx,vue}", "!**/style/(index|css).{js,ts,vue}"], {
      cwd: pkgRoot,
      absolute: true,
      onlyFiles: true,
    })
  );
  console.log("00");
  const bundle = await rollup({
    input,
    plugins,
    external: await generateExternal({ full: false }),
    treeshake: { moduleSideEffects: false },
  });

  console.log(11, bundle);

  await writeBundles(
    bundle,
    buildConfigEntries.map(([module, config]): OutputOptions => {
      return {
        format: config.format,
        dir: config.output.path,
        exports: module === "cjs" ? "named" : undefined,
        preserveModules: true,
        preserveModulesRoot: epRoot,
        sourcemap: true,
        entryFileNames: `[name].${config.ext}`,
      };
    })
  );
}

export const buildModules: TaskFunction = series(
  withTaskName("buildModulesComponents", buildModulesComponents)
);
