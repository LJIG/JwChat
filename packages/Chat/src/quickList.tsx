import { computed, defineComponent, unref } from "vue";
import style from "./quickList.module.scss";
export default defineComponent({
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    msg: {
      type: String,
      default: "",
    },
  },
  emits: ["submit"],
  setup(props, { emit }) {
    const showList = computed(() => {
      const msg = props.msg;
      // 当空字符串和表情时候不匹配
      if (!msg || /^\[.+\]$/.test(msg)) return [];
      const originList = unref(props.list);
      const reg = new RegExp(msg);
      const result: Array<any> = [];
      originList.forEach((i: any) => {
        const { text } = i;
        if (reg.test(text)) {
          const str: string = text.replace(reg, `<b>${msg}</b>`);
          result.push({ ...i, showtext: str });
        }
      });
      console.log(result, "result");
      return result;
    });

    return () => (
      <>
        {showList.value.length > 0 && (
          <div class={style.quickListBox}>
            {showList.value.map((i: any, k) => {
              return (
                <div key={k} class={style.quickItem}>
                  <span
                    v-html={i.showtext}
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

    function submit(target: string) {
      emit("submit", target);
    }
  },
});
