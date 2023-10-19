import "./fonts/iconfont";
import style from "./index.module.scss";

import { defineComponent } from "vue";

export default defineComponent({
  name: "JwChat-icon",
  props: {
    type: {
      type: String,
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
