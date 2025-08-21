/*
 * @Author            : Bian <389701057@qq.com>
 * @Date              : 2025-08-15 11:03:13
 * @LastEditors       : LJIG <389701057@qq.com>
 * @LastEditTime      : 2025-08-18 16:38:46
 * @FilePath          : /internal/build-utils/src/paths.ts
 * @Description       : 
 * Copyright (c) 2025 by Bian <389701057@qq.com>, All Rights Reserved. 
 */

import { resolve } from 'path'


export const projRoot = resolve(__dirname, '..', '..', '..')
export const buildRoot = resolve(projRoot, 'internal', 'build')


/** `/dist` */
export const buildOutput = resolve(projRoot, 'dist')
/** `/dist/element-plus` */
export const epOutput = resolve(buildOutput, 'widget')

