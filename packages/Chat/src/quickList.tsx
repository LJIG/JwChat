import { computed, defineComponent } from "vue";
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
      if (!msg) return [];
      const originList = props.list;
      const reg = new RegExp(msg);
      const result: Array<any> = [];
      originList.forEach((i: any) => {
        const { text } = i;
        if (reg.test(text)) {
          const str: string = text.replace(reg, `<b>${msg}</b>`);
          result.push({ ...i, showtext: str });
        }
      });
      return result;
    });

    // return {
    //   showList,
    //   submit,
    // };

    return () => {
      {
        showList.value.length && (
          <div class={style.quickListBox}>
            <div class={style.quickList}>
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
                    {/* <!-- <el-button class="enterBtn" type="mini" @click.stop="submit(i)">选择</el-button> --> */}
                  </div>
                );
              })}
            </div>
          </div>
        );
      }
    };

    function submit(target: string) {
      emit("submit", target);
    }
  },
});
