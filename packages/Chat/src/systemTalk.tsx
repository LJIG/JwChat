import { defineComponent, nextTick, onMounted } from "vue";
import style from "./systemTalk.module.scss";
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
        emit("loadDone", { type: "system", target: props.text });
      });
    });
    return () => (
      <div class={style.systemTalk}>
        <div class={style.title}>{props.text.title}</div>
        <div class={style.subtitle}>{props.text.subtitle}</div>
        {props.text.content.map((item: any) => (
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
