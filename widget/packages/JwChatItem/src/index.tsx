import { computed, defineComponent } from "vue";
import "./index.module.scss";
// const style = {}
import { ElBadge } from "element-plus";
import type { PropType } from "vue";

export type ItemConfigProps = {
  img: string;
  name: string;
  dept: string;
  readNum: number;
};

export default defineComponent({
  name: "JwChat-item",
  // components: {
  //   ElBadge,
  // },
  props: {
    config: {
      type: Object as PropType<ItemConfigProps>,
      default: () => ({
        img: "",
        name: "JwChat",
        dept: "",
        readNum: 0,
      }),
      required: true,
    },
    size: {
      type: Object as PropType<string | number>,
      default: 35,
    },
  },
  emits: ["click"],
  setup(props, { emit }) {
    const coverSize = computed(() => {
      let size = props.size;
      if (`${size}`.match(/\d$/)) {
        size += "px";
      }

      return {
        width: size,
        height: size,
      };
    });

    function bindClick(type) {
      const target = type;
      emit("click", target);
    }

    return () => (
      <>
        <div class="item">
          <ElBadge
            value={props.config.readNum}
            hidden={props.config.readNum < 1}
          >
            <img
              src={props.config.img}
              style={coverSize.value}
              class="cover"
              onClick={() => {
                bindClick({ key: "cover", value: props.config });
              }}
            />
          </ElBadge>
          <div class="info">
            <p
              class="name"
              onClick={() => {
                bindClick({ key: "name", value: props.config });
              }}
            >
              {props.config.name}
            </p>
            <p
              class="dept"
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
