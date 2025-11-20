/*
 * @Author            : Bian <389701057@qq.com>
 * @Date              : 2025-11-09 23:09:25
 * @LastEditors       : LJIG <389701057@qq.com>
 * @LastEditTime      : 2025-11-20 14:58:47
 * @FilePath          : /internal/build/src/tasks/full-bundle.ts
 * @Description       : 完整构建任务（UMD + ESM），包含主包和 locale 文件的打包逻辑
 * Copyright (c) 2025 by Bian <389701057@qq.com>, All Rights Reserved. 
 */

import path from 'path'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { rollup } from 'rollup'
import replace from '@rollup/plugin-replace'
import commonjs from '@rollup/plugin-commonjs'
import vue from '@vitejs/plugin-vue'
import VueMacros from 'unplugin-vue-macros/rollup'
import vueJsx from '@vitejs/plugin-vue-jsx'
import esbuild, { minify as minifyPlugin } from 'rollup-plugin-esbuild'
import { parallel } from 'gulp'
// import scss from "rollup-plugin-scss";
import { epOutput, epRoot } from '@jwchat/build-utils'
import { version } from 'push_npm/version'
import {
  formatBundleFilename,
  generateExternal,
  withTaskName,
  writeBundles,
} from '../utils'
import { target } from '../build-info'

import type { TaskFunction } from 'gulp'
import type { Plugin } from 'rollup'

// 打包文件头部注释（banner），包含包名与版本号
const banner = `/*! JwChat v${version} */\n`

/**
 * 构建完整入口（主包），会生成 UMD 和 ESM 两种格式
 * @param minify 是否压缩（会开启 esbuild.minify 和 sourcemap）
 */
async function buildFullEntry(minify: boolean) {
  // Rollup 插件列表，按顺序添加以确保正确处理 Vue、TS、JS 等
  const plugins: Plugin[] = [
    // Vue 单文件组件、宏和 JSX 支持
    VueMacros({
      setupComponent: false,
      setupSFC: false,
      plugins: {
        vue: vue({
          isProduction: true,
          template: {
            compilerOptions: {
              // 禁用一些编译优化选项来保证输出行为可控
              hoistStatic: false,
              cacheHandlers: false,
            },
          },
        }),
        vueJsx: vueJsx(),
      },
    }),
    // 解析 node_modules 中的模块
    nodeResolve({
      extensions: ['.mjs', '.js', '.json', '.ts'],
    }),
    // 将 CommonJS 转换为 ES Module
    commonjs(),
    // 处理 scss，设置 output: false 表示不单独输出 css 文件，直接内联或忽略
    // scss({
    //   output: false, // 不输出单独的 CSS 文件
    //   processor: (css) => css, // 直接返回处理后的 CSS（可在此处做 postcss 处理）
    // }),
    // 使用 esbuild 加速 TS/JS 转换与类型级别的快速替换
    esbuild({
      exclude: [],
      sourceMap: minify,
      target,
      loaders: {
        '.tsx': 'ts',
      },
      define: {
        'process.env.NODE_ENV': '"production"',
      },
      treeShaking: true,
      legalComments: 'eof',
    }),
    // 将 process.env.NODE_ENV 等替换为生产值
    replace({
      'process.env.NODE_ENV': '"production"',
      preventAssignment: false,
    }),
  ]
  // 如果需要压缩，则加入 esbuild 的 minify 插件（rollup-plugin-esbuild 提供）
  if (minify) {
    plugins.push(
      minifyPlugin({
        target,
        sourceMap: true,
      })
    )
  }

  // 调用 rollup 生成 bundle 对象
  const bundle = await rollup({
    input: path.resolve(epRoot, 'packages/index.ts'), // 入口文件
    plugins,
    external: await generateExternal({ full: true }), // 排除外部依赖
    treeshake: true,
  })

  // 将 bundle 写入磁盘：同时输出 UMD 与 ESM 两种格式
  await writeBundles(bundle, [
    {
      format: 'umd',
      file: path.resolve(
        epOutput,
        'dist',
        formatBundleFilename('index.full', minify, 'js')
      ),
      exports: 'named',
      name: "JwChat", // UMD 全局变量名
      globals: {
        vue: 'Vue', // 将 vue 映射为全局 Vue
      },
      sourcemap: minify,
      banner,
    },
    {
      format: 'esm',
      file: path.resolve(
        epOutput,
        'dist',
        formatBundleFilename('index.full', minify, 'mjs')
      ),
      sourcemap: minify,
      banner,
    },
  ])
}


// 导出一个构建函数工厂，根据是否压缩同时构建主包与 locale
export const buildFull = (minify: boolean) => async () => buildFullEntry(minify)

// 导出 gulp 任务：并行执行压缩与非压缩两套构建
export const buildFullBundle: TaskFunction = parallel(
  withTaskName('buildFullMinified', buildFull(true)),
  withTaskName('buildFull', buildFull(false))
)
