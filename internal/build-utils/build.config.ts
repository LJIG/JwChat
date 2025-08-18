/*
 * @Author            : Bian <389701057@qq.com>
 * @Date              : 2025-08-15 17:47:10
 * @LastEditors       : LJIG <389701057@qq.com>
 * @LastEditTime      : 2025-08-15 17:47:11
 * @FilePath          : /internal/build-utils/build.config.ts
 * @Description       : 
 * Copyright (c) 2025 by Bian <389701057@qq.com>, All Rights Reserved. 
 */
import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['src/index'],
  clean: true,
  declaration: true,
  rollup: {
    emitCJS: true,
  },
})

