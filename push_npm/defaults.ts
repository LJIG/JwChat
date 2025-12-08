/*
 * @Author            : Bian <389701057@qq.com>
 * @Date              : 2025-08-06 09:30:12
 * @LastEditors       : LJIG <389701057@qq.com>
 * @LastEditTime      : 2025-12-08 10:22:47
 * @FilePath          : /push_npm/defaults.ts
 * @Description       :
 * Copyright (c) 2025 by Bian <389701057@qq.com>, All Rights Reserved.
 */
import type { Plugin } from "vue";

import { makeInstaller } from "./make-installer";
import Components from "./component";

export default makeInstaller([...Components] as Plugin[]);
