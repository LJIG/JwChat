import { defineComponent, nextTick, reactive, ref, watch } from "vue";
import { ElButton } from "element-plus";
import style from "./enterBox.module.scss";
import type { PropType } from "vue";

interface DataProps {
  currentMsg: string;
}

export default defineComponent({
  name: "JwChat_enterbox",
  components: { ElButton },
  props: {
    placeholder: {
      type: String as PropType<string>,
      default: "请输入内容...",
    },
    modelValue: {
      type: String as PropType<string>,
      default: "",
    },
    insert: {
      type: String as PropType<string>,
      default: "",
    },
  },
  emits: ["update:modelValue", "submit"],

  setup(props, { emit }) {
    const data = reactive<DataProps>({
      currentMsg: "",
    });

    watch(
      () => props.modelValue,
      () => {
        data.currentMsg = props.modelValue;
      },
      { immediate: true }
    );

    watch(
      () => data.currentMsg,
      (newVal: string = "") => {
        const msg = newVal.trim();
        emit("update:modelValue", msg);
      },
      { immediate: true }
    );

    //用户主动发送
    const handleSend = (e: KeyboardEvent): void => {
      const { type, shiftKey } = e;
      if (shiftKey || (type == "keyup" && e?.key != "Enter")) return;
      emit("submit", data.currentMsg);
      nextTick(() => {
        data.currentMsg = "";
      });
    };

    watch(
      () => props.insert,
      (newVal = "") => {
        if (newVal) {
          joinToMsg(newVal);
        }
      }
    );

    const msgBox = ref<HTMLElement | null>(null);

    return () => (
      <div class={style.enterBox} onKeyup={handleSend}>
        <textarea
          v-model={data.currentMsg}
          rows="3"
          placeholder={props.placeholder}
          class={style.enterBoxInput}
          ref={msgBox}
        />
        <div class={style.enterBoxMenu}>
          <el-button
            class={style.enterBoxSubmit}
            type="primary"
            size="small"
            onClick={handleSend}
          >
            发送
          </el-button>
        </div>
      </div>
    );

    function joinToMsg(str: string): void {
      /* eslint-disable */
      const myField = msgBox.value as HTMLTextAreaElement; //proxy.$refs.msgBox;
      let afterMsg = data.currentMsg;

      //火狐/网景 浏览器
      if (myField.selectionStart || myField.selectionStart == 0) {
        //得到光标前的位置
        var startPos = myField.selectionStart;
        //得到光标后的位置
        var endPos = myField.selectionEnd;
        // 在加入数据之前获得滚动条的高度
        var restoreTop = myField.scrollTop;
        afterMsg =
          afterMsg.substring(0, startPos) +
          str +
          afterMsg.substring(endPos, afterMsg.length);
        //如果滚动条高度大于0
        if (restoreTop > 0) {
          // 返回
          myField.scrollTop = restoreTop;
        }
        myField.focus();
        myField.selectionStart = startPos + str.length;
        myField.selectionEnd = startPos + str.length;
      } else {
        afterMsg += str;
        myField.focus();
      }
      data.currentMsg = afterMsg;
    }
  },
});
