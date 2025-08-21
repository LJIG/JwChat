/*
 * @Author            : Bian <389701057@qq.com>
 * @Date              : 2025-08-15 17:32:11
 * @LastEditors       : LJIG <389701057@qq.com>
 * @LastEditTime      : 2025-08-18 15:11:39
 * @FilePath          : /internal/build/src/utils/process.ts
 * @Description       :
 * Copyright (c) 2025 by Bian <389701057@qq.com>, All Rights Reserved.
 */

import { spawn } from "child_process";
import chalk from "chalk";
import consola from "consola";
import { projRoot } from "@jwchat/build-utils";
// withTaskName("clean", () => run("pnpm run clean"))

/**
 * 在指定工作目录中执行命令，并将子进程输出直接透传到当前终端。
 *
 * 成功时（退出码为 0）返回 resolved Promise；失败时（非 0）返回 rejected Promise。
 *
 * 注意：使用 `command.split(" ")` 做参数拆分无法正确处理包含空格/引号的参数，
 * 如需健壮处理建议改为传入已拆分的 `cmd` 与 `args`，或改用 execa 等库。
 *
 * @param command 命令字符串（例如："pnpm -r run build"）
 * @param cwd 子进程工作目录，默认 monorepo 根目录 `projRoot`
 */
export const run = async (command: string, cwd: string = projRoot) =>
  new Promise<void>((resolve, reject) => {
    // 简单拆分命令与参数：存在带空格/引号场景的边界问题
    const [cmd, ...args] = command.split(" ");

    // 提示即将执行的命令
    consola.info(`run: ${chalk.green(`${cmd} ${args.join(" ")}`)}`);

    // 创建子进程：
    // - stdio: "inherit" 直接复用当前终端的 stdio，实时输出日志
    // - Windows 平台使用 shell 模式以兼容 .cmd/内部命令；其他平台保持非 shell 更安全
    const app = spawn(cmd, args, {
      cwd,
      stdio: "inherit",
      shell: process.platform === "win32",
    });

    // 父进程退出时，向子进程发送信号，避免产生孤儿进程
    const onProcessExit = () => app.kill("SIGHUP");

    app.on("close", (code) => {
      // 打印退出码，便于排查
      consola.log({ code });
      process.removeListener("exit", onProcessExit);

      // 约定：0 为成功，其它为失败
      if (code === 0) resolve();
      else
        reject(
          new Error(`Command failed. \n Command: ${command} \n Code: ${code}`)
        );
    });

    // 监听父进程退出，进行子进程清理
    process.on("exit", onProcessExit);
  });
