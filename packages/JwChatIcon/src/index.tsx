import "./fonts/iconfont";
import style from "./index.module.scss";

import { defineComponent } from "vue";
import type { PropType } from "vue";

export default defineComponent({
  name: "JwChat-icon",
  props: {
    type: {
      type: Object as PropType<string>,
      required: true,
    },
  },
  setup(props) {
    return () => (
      <div>
        {/* <i :class="['iconfont', 'icon-wenjian' ]"></i> */}
        <svg class={style.icon} aria-hidden="true">
          <use xlinkHref={`#${props.type}`}></use>
        </svg>
      </div>
    );
  },
});
