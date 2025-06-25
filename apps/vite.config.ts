/*
 * @Author: Bian 389701057@qq.com
 * @Date: 2022-07-13 10:24:29
 * @LastEditors: Bian <389701057@qq.com>
 * @LastEditTime: 2022-10-11 18:03:32
 * @FilePath: \vite.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineConfig, loadEnv, UserConfigExport } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import Markdown from "vite-plugin-md";
import dts from "vite-plugin-dts";
import vueJsx from "@vitejs/plugin-vue-jsx";
import ElementPlus from "unplugin-element-plus/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd()).VITE_NODE_ENV;

  const baseConfig: UserConfigExport = {
    plugins: [
      vue({ include: [/\.vue$/, /\.md$/] }),
      Markdown(),
      vueJsx(),
      ElementPlus({
        useSource: true,
      }),
    ],
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
        packages: resolve(__dirname, "./packages"),
      },
    },
    server: {
      port: 8080,
    },
    css: {
      preprocessorOptions: {
        scss: {
          charset: false,
        },
      },
      postcss: {
        plugins: [
          {
            postcssPlugin: "internal:charset-removal",
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === "charset") {
                  atRule.remove();
                }
              },
            },
          },
        ],
      },
    },
  };
  let config: UserConfigExport = baseConfig;

  // 根据command动态配置base
  if (env === "lib") {
    config = {
      ...baseConfig,
      // 打包配置
      build: {
        outDir: "lib",
        lib: {
          entry: resolve(__dirname, "./packages/index.ts"),
          name: "JwChat",
          fileName: (format: string) => `JwChat.${format}.js`,
        },
        // assetsInlineLimit: 0,
        sourcemap: false,
        rollupOptions: {
          // 确保外部化处理那些你不想打包进库的依赖
          external: ["vue" /* , "element-plus" */],
          output: {
            // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
            globals: {
              vue: "Vue",
              // "element-plus": "elementPlus",
            },
            exports: "named",
          },
        },
      },
      plugins: [...(baseConfig as any).plugins, dts()],
      esbuild: {
        pure: ["console.log"], // 删除 console.log
        // drop: ["debugger"], // 删除 debugger
      },
    };
  }

  if (env === "build") {
    config = {
      ...baseConfig,
      base: "./",
      build: {
        outDir: "docs",
      },
    };
  }

  // 返回 UserConfig
  return config;
});
