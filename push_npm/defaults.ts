/*
 * @Author            : Bian <389701057@qq.com>
 * @Date              : 2025-08-06 09:30:12
 * @LastEditors       : LJIG <389701057@qq.com>
 * @LastEditTime      : 2025-08-06 17:37:11
 * @FilePath          : /push_npm/defaults.ts
 * @Description       :
 * Copyright (c) 2025 by Bian <389701057@qq.com>, All Rights Reserved.
 */
import { makeInstaller } from "./mack-installer";
import Components from "./component";
console.log(11, Components);

// TODO ts any
export default makeInstaller([...Components] as any);
