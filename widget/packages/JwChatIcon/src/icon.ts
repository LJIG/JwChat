/*
 * @Author            : Bian <389701057@qq.com>
 * @Date              : 2025-08-05 15:16:55
 * @LastEditors       : LJIG <389701057@qq.com>
 * @LastEditTime      : 2025-08-05 15:58:01
 * @FilePath          : /widget/packages/JwChatIcon/src/icon.ts
 * @Description       :
 * Copyright (c) 2025 by Bian <389701057@qq.com>, All Rights Reserved.
 */
import { ExtractPropTypes } from "vue";
import type { PropType } from "vue";

export const iconProps = {
  type: {
    type: String as PropType<string>,
    required: true,
  },
} as const;

export type IconProps = ExtractPropTypes<typeof iconProps>;
