import { computed, defineComponent } from "vue";
import type { PropType } from "vue";
// import css from "./index.module.scss";

type sizeProp = string | number;

export default defineComponent({
  name: "JwChat-empty",
  props: {
    size: {
      type: Object as PropType<sizeProp>,
      default: "5rem",
    },
  },
  setup(props) {
    const sizeBox = computed(() => {
      let size = props.size;
      if (`${size}`.match(/\d$/)) {
        size += "px";
      }
      return { width: size };
    });

    const sizeStyle = computed(() => {
      let size = props.size;
      if (`${size}`.match(/\d$/)) {
        size += "px";
      }
      return { fontSize: `calc(${size} / 2)` };
    });

    return () => (
      <>
        <div class="empty" style={sizeBox.value}>
          111
          <JwChat-icon type="icon-empty" style={sizeStyle.value} />
        </div>
      </>
    );
  },
});
