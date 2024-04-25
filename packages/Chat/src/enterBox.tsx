import { defineComponent, nextTick, reactive, ref, toRefs, watch } from "vue";
import style from "./enterBox.module.scss";

interface DataProps {
  currentMsg: string;
}

export default defineComponent({
  name: "JwChat_enterbox",
  props: {
    placeholder: {
      type: String,
      default: "请输入内容...",
    },
    modelValue: {
      type: String,
      default: "",
    },
    insert: {
      type: String,
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
    const handleSend = (e: KeyboardEvent) => {
      const { type, shiftKey } = e;
      if (shiftKey || (type == "keyup" && e?.key != "Enter")) return;
      emit("submit", data.currentMsg);
      nextTick(() => {
        data.currentMsg = "";
      });
    };

    watch(
      () => props.insert,
      (newval: string = "") => {
        if (newval) {
          joinToMsg(newval);
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

    function joinToMsg(str: string) {
      /* eslint-disable */
      const myField: any = msgBox.value; //proxy.$refs.msgBox;
      let afterMsg = data.currentMsg;

      //IE浏览器
      if ((document as any).selection) {
        var sel = null;
        myField.focus();
        sel = (document as any).selection.createRange();
        sel.text = str;
        sel.select();
      }
      //火狐/网景 浏览器
      else if (myField.selectionStart || myField.selectionStart == "0") {
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
