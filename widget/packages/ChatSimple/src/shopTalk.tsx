import { defineComponent, nextTick, onMounted } from "vue";
import "./shopTalk.module.scss";
import type { PropType } from "vue";

type TextProps = {
  cover: string;
  price: string;
  title: string;
  describe: string;
  tags: { name: string }[];
};

export default defineComponent({
  props: {
    text: {
      type: Object as PropType<TextProps>,
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
        class="shopTalk"
        onClick={() => {
          emit("systemEvent", { ...props.text, type: "shop" });
        }}
      >
        <div class="cover">
          <img src={props.text.cover} />
        </div>
        <div class="price">{props.text.price}</div>
        <div class="title">{props.text.title}</div>
        {props.text.describe && (
          <div class="subtitle">{props.text.describe}</div>
        )}
        {props.text.tags && props.text.tags.length && (
          <div class="tagBox">
            {props.text.tags.map((i, k) => (
              <span key={k}>{i.name}</span>
            ))}
          </div>
        )}
      </div>
    );
  },
});
