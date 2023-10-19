import { computed, defineComponent } from "vue";
import style from "./index.module.scss";

export default defineComponent({
  name: "JwChat-item",
  props: {
    config: {
      type: Object,
      default: () => ({
        img: "",
        name: "JwChat",
        dept: "",
        readNum: 0,
      }),
      required: true,
    },
    size: {
      type: [String, Number],
      default: 35,
    },
  },
  emits: ["click"],
  setup(props, { emit }) {
    const coverSize = computed(() => {
      let size: any = props.size;
      if (`${size}`.match(/\d$/)) {
        size += "px";
      }

      return {
        width: size,
        height: size,
      };
    });

    function bindClick(type: any) {
      const target = type;
      emit("click", target);
    }

    // return {
    //   coverSize,
    //   bindClick,
    // };

    return () => (
      <>
        <div class={style.item}>
          <el-badge
            value={props.config.readNum}
            hidden={props.config.readNum < 1}
          >
            {props.config.img && (
              <img
                src={props.config.img}
                style={coverSize.value}
                class={style.cover}
                onClick={() => {
                  bindClick({ key: "cover", value: props.config });
                }}
              />
            )}
          </el-badge>
          <div class={style.info}>
            <p
              class={style.name}
              onClick={() => {
                bindClick({ key: "name", value: props.config });
              }}
            >
              {props.config.name}
            </p>
            <p
              class={style.dept}
              onClick={() => {
                bindClick({ key: "dept", value: props.config });
              }}
            >
              {props.config.dept}
            </p>
          </div>
        </div>
      </>
    );
  },
});
