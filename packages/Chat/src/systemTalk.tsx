import { defineComponent, nextTick, onMounted } from "vue";
import style from "./systemTalk.module.scss";
import type { PropType } from "vue";

type TextProps = {
  title: string;
  subtitle: string;
  content: { text: string }[];
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
        emit("loadDone", { type: "system", target: props.text });
      });
    });
    return () => (
      <div class={style.systemTalk}>
        <div class={style.title}>{props.text.title}</div>
        <div class={style.subtitle}>{props.text.subtitle}</div>
        {props.text.content.map((item) => (
          <div key={JSON.stringify(item)}>
            <el-link
              type="primary"
              onClick={() => {
                emit("systemEvent", item);
              }}
            >
              {item.text}
            </el-link>
          </div>
        ))}
      </div>
    );
  },
});
