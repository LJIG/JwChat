/*
 * @Author            : Bian <389701057@qq.com>
 * @Date              : 2025-08-28 17:47:09
 * @LastEditors       : LJIG <389701057@qq.com>
 * @LastEditTime      : 2025-11-17 16:12:03
 * @FilePath          : /internal/build/src/utils/rollup.ts
 * @Description       :
 * Copyright (c) 2025 by Bian <389701057@qq.com>, All Rights Reserved.
 */
import { epPackage, getPackageDependencies } from '@jwchat//build-utils'

import type { RollupBuild, OutputOptions } from "rollup";

export const generateExternal = async (options: { full: boolean }) => {
  const { dependencies, peerDependencies } = getPackageDependencies(epPackage)

  return (id: string) => {
    const packages: string[] = [...peerDependencies]
    if (!options.full) {
      packages.push('@vue', ...dependencies)
    }

    return [...new Set(packages)].some(
      (pkg) => id === pkg || id.startsWith(`${pkg}/`)
    )
  }
};

export function writeBundles(bundle: RollupBuild, options: OutputOptions[]) {
  return Promise.all(options.map((option) => bundle.write(option)));
}

export function formatBundleFilename(
  name: string,
  minify: boolean,
  ext: string
) {
  return `${name}${minify ? '.min' : ''}.${ext}`
}
