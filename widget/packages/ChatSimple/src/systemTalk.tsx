import { defineComponent, nextTick, onMounted } from "vue";
import "./systemTalk.module.scss";
import { ElLink } from "element-plus";
import type { PropType } from "vue";

type TextProps = {
  title: string;
  subtitle: string;
  content: { text: string }[];
};

export default defineComponent({
  // 移除 components 注册，JSX 中直接使用导入的组件变量
  // components: { ElLink },
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
      <div class="systemTalk">
        <div class="title">{props.text.title}</div>
        <div class="subtitle">{props.text.subtitle}</div>
        {props.text.content.map((item) => (
          <div key={JSON.stringify(item)}>
            <ElLink
              type="primary"
              onClick={() => {
                emit("systemEvent", item);
              }}
            >
              {item.text}
            </ElLink>
          </div>
        ))}
      </div>
    );
  },
});
