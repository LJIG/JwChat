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
export const run = async (command: string, cwd: string = projRoot) =>
  new Promise<void>((resolve, reject) => {
    const [cmd, ...args] = command.split(" ");
    consola.info(`run: ${chalk.green(`${cmd} ${args.join(" ")}`)}`);
    const app = spawn(cmd, args, {
      cwd,
      stdio: "inherit",
      shell: process.platform === "win32",
    });

    const onProcessExit = () => app.kill("SIGHUP");

    app.on("close", (code) => {
      consola.log({ code });
      process.removeListener("exit", onProcessExit);

      if (code === 0) resolve();
      else
        reject(
          new Error(`Command failed. \n Command: ${command} \n Code: ${code}`)
        );
    });
    process.on("exit", onProcessExit);
  });
