/*
 * @Author            : Bian <389701057@qq.com>
 * @Date              : 2025-08-06 09:29:12
 * @LastEditors       : LJIG <389701057@qq.com>
 * @LastEditTime      : 2025-12-08 15:05:01
 * @FilePath          : /push_npm/index.ts
 * @Description       :
 * Copyright (c) 2025 by Bian <389701057@qq.com>, All Rights Reserved.
 */

import installer from "./defaults";
export * from './make-installer'
export * from 'jwchat/packages'

// export * from "./component";

export const install = installer.install;

export default installer;
