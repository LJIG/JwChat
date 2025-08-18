/*
 * @Author            : Bian <389701057@qq.com>
 * @Date              : 2025-08-18 14:41:16
 * @LastEditors       : LJIG <389701057@qq.com>
 * @LastEditTime      : 2025-08-18 14:41:17
 * @FilePath          : /internal/build/build.config.ts
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
