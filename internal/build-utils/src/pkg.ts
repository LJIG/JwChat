/*
 * @Author            : Bian <389701057@qq.com>
 * @Date              : 2025-08-21 11:53:03
 * @LastEditors       : LJIG <389701057@qq.com>
 * @LastEditTime      : 2025-08-21 11:53:04
 * @FilePath          : /internal/build-utils/src/pkg.ts
 * @Description       : 
 * Copyright (c) 2025 by Bian <389701057@qq.com>, All Rights Reserved. 
 */
import { projRoot } from './paths'

export const excludeFiles = (files: string[]) => {
  const excludes = ['node_modules', 'test', 'mock', 'gulpfile', 'dist']
  return files.filter((path) => {
    const position = path.startsWith(projRoot) ? projRoot.length : 0
    return !excludes.some((exclude) => path.includes(exclude, position))
  })
}
