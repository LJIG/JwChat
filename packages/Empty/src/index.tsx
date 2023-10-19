import { computed, defineComponent } from "vue";
import css from "./index.module.scss";
export default defineComponent({
  name: "JwChat-empty",
  props: {
    size: {
      type: [String, Number],
      default: "5rem",
    },
  },
  setup(props) {
    const sizeBox = computed(() => {
      let size = props.size;
      if (`${size}`.match(/\d$/)) {
        size += "px";
      }
      return {
        width: size,
      };
    });

    const sizeStyle = computed(() => {
      let size = props.size;

      if (`${size}`.match(/\d$/)) {
        size += "px";
      }
      return {
        fontSize: `calc(${size} / 2)`,
      };
    });

    return () => (
      <>
        <div class={css.empty} style={sizeBox.value}>
          <JwChat-icon type="icon-empty" style={sizeStyle.value} />
        </div>
      </>
    );
  },
});
