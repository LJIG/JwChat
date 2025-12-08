import { PropType, ExtractPropTypes } from "vue";

// /** 按钮类型 *//* `ButtonType` 是定义联合类型的 TypeScript 类型别名。在本例中，它指定 `ButtonType`
// 只能具有以下值之一：'success'、'error'、'info' 或 'warning'。这将可以分配给 `ButtonType`
// 类型变量或参数的可能值限制为仅那些特定字符串。 */

// export type ButtonType = 'success' | 'error' | 'info' | 'warning'

// /** 组件入参 */
// export type Button = {
//     /** 按钮类型 */
//     type: {
//         type: PropType<ButtonType>;
//         required: true;
//     },
//     text: {
//         type: PropType<string>
//         required: false;
//     }
// }

export interface DataProps {
  // emoji: Array<any>;
  toolConfig: Object<{ [key: string]: { icon: string; title: string } }>;
  newTitle: string[] | null;
  emojiShow: Boolean;
}

export type Tool = {
  showEmoji: {
    type: Boolean;
    required: false;
    default: true;
  };
  show: {
    type: Array<string | string[]>;
    required: false;
    default: ["file"];
  };
  callback: {
    type: Function;
    required: false;
  };
};

/** 组件参数类型 */
export type ToolsProps = ExtractPropTypes<Tool>;
