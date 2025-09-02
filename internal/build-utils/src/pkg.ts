/*
 * @Author            : Bian <389701057@qq.com>
 * @Date              : 2025-08-21 11:53:03
 * @LastEditors       : LJIG <389701057@qq.com>
 * @LastEditTime      : 2025-09-01 18:05:37
 * @FilePath          : /internal/build-utils/src/pkg.ts
 * @Description       :
 * Copyright (c) 2025 by Bian <389701057@qq.com>, All Rights Reserved.
 */
import { projRoot, normalizePath } from "./paths";

import type { ProjectManifest } from "@pnpm/types";

export const getPackageManifest = (pkgPath: string) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  return require(pkgPath) as ProjectManifest;
};

export const getPackageDependencies = (
  pkgPath: string
): Record<"dependencies" | "peerDependencies", string[]> => {
  const manifest = getPackageManifest(pkgPath);
  const { dependencies = {}, peerDependencies = {} } = manifest;

  return {
    dependencies: Object.keys(dependencies),
    peerDependencies: Object.keys(peerDependencies),
  };
};

export const excludeFiles = (files: string[]) => {
  const excludes = ["node_modules", "test", "mock", "gulpfile", "dist"];
  const projRootPath = normalizePath(projRoot);

  return files.filter((file) => {
    const position = file.startsWith(projRootPath) ? projRootPath.length : 0;
    return !excludes.some((exclude) => file.includes(exclude, position));
  });
};
