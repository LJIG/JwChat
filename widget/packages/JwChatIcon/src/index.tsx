import "./fonts/iconfont";
import style from "./index.module.scss";

import { defineComponent } from "vue";
import { iconProps, type IconProps } from "./icon";

export default defineComponent({
  name: "JwChat-icon",
  props: iconProps,
  setup(props: IconProps) {
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
