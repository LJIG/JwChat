import { computed, defineComponent, unref } from "vue";
import style from "./quickList.module.scss";
import type { PropType } from "vue";

export type ListProps = { text: string; id?: unknown };

export default defineComponent({
  props: {
    list: {
      type: Array as PropType<ListProps[]>,
      default: () => [],
    },
    msg: {
      type: String as PropType<string>,
      default: "",
    },
  },
  emits: ["submit"],
  setup(props, { emit }) {
    const showList = computed<(ListProps & { showText: string })[]>(() => {
      const msg = props.msg;
      // 当空字符串和表情时候不匹配
      if (!msg || /^\[.+\]$/.test(msg)) return [];
      const originList = unref(props.list);
      const reg = new RegExp(msg);
      const result: Array<any> = [];
      originList.forEach((i) => {
        const { text } = i;
        if (reg.test(text)) {
          const str = text.replace(reg, `<b>${msg}</b>`);
          result.push({ ...i, showText: str });
        }
      });
      return result;
    });

    return () => (
      <>
        {showList.value.length > 0 && (
          <div class={style.quickListBox}>
            {showList.value.map((i, k) => {
              return (
                <div key={k} class={style.quickItem}>
                  <span
                    v-html={i.showText}
                    onClick={() => {
                      submit(i);
                    }}
                  />
                  <i
                    class={[style.enterBtn, style["el-icon-circle-check"]]}
                    title="选择"
                    onClick={() => {
                      submit(i);
                    }}
                  />
                </div>
              );
            })}
          </div>
        )}
      </>
    );

    function submit(target: ListProps) {
      emit("submit", target);
    }
  },
});
