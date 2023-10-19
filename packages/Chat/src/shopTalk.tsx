import { defineComponent, nextTick, onMounted } from "vue";
import style from "./shopTalk.module.scss";
export default defineComponent({
  props: {
    text: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ["systemEvent", "loadDone"],
  setup(props, { emit }) {
    onMounted(() => {
      nextTick(() => {
        emit("loadDone", { type: "shop", target: props.text });
      });
    });
    return () => (
      <div
        class={style.shopTalk}
        onClick={() => {
          emit("systemEvent", { ...props.text, type: "shop" });
        }}
      >
        <div class={style.cover}>
          <img src={props.text.cover} />
        </div>
        <div class={style.price}>{props.text.price}</div>
        <div class={style.title}>{props.text.title}</div>
        {props.text.describe && (
          <div class={style.subtitle}>{props.text.describe}</div>
        )}
        {props.text.tags && props.text.tags.length && (
          <div class={style.tagBox}>
            {props.text.tags.map((i: any, k: number) => (
              <span key={k}>{i.name}</span>
            ))}
          </div>
        )}
      </div>
    );
  },
});
