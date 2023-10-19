<template>
  <div class="wrapper">
    <el-menu
      v-if="showHeader"
      :default-active="activeIndex"
      class="el-menu-demo"
      :ellipsis="false"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item
        v-for="(item, key) in showNav"
        :index="`${key + 1}`"
        :key="item"
        >{{ item }}</el-menu-item
      >
      <div
        :style="{
          visibility: showAddBtn ? 'visible' : 'hidden',
        }"
        class="addBtn"
        @click="visible = true"
        title="新增"
      >
        <el-icon><CirclePlus /></el-icon>
      </div>
    </el-menu>
    <JwChat-empty v-if="!Talelist.length" />
    <ul>
      <li v-for="(i, k) in Talelist" :key="JSON.stringify(i)">
        <el-row>
          <el-col :span="showDelete == false ? 19 + 2 : 19">
            <p>{{ i }}</p>
          </el-col>
          <el-col
            :span="showDelete == false ? 5 - 2 : 5"
            style="text-algin: right"
          >
            <el-icon
              title="发送"
              @click="$emit('event', { key: 'select', value: i })"
            >
              <CircleCheck />
            </el-icon>
            <el-icon
              title="删除"
              v-if="showDelete"
              @click="$emit('event', { key: 'delIndex', value: k })"
            >
              <CircleClose />
            </el-icon>
          </el-col>
        </el-row>
      </li>
    </ul>
    <el-dialog title="新增快捷回复" v-model="visible" width="36%">
      <el-input
        :rows="3"
        show-word-limit
        :maxlength="maxlength"
        placeholder="请输入快捷回复语"
        v-model="itemQuick"
        type="textarea"
      />
      <div style="text-align: right; margin: 0; margin-top: 10px">
        <el-button size="small" type="text" @click="visible = false"
          >取消</el-button
        >
        <el-button type="primary" size="small" @click="AddQuickFn"
          >确定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, reactive, toRefs } from "vue";
import { CirclePlus, CircleCheck, CircleClose } from "@element-plus/icons-vue";
interface DataProps {
  activeIndex: string | number;
  visible: boolean;
  itemQuick: string;
}
export default defineComponent({
  name: "JwChat-talk",
  props: {
    Talelist: {
      type: Array,
      default: () => [],
    },
    config: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ["event"],
  setup(props, { emit }) {
    const data: DataProps = reactive({
      activeIndex: "1",
      visible: false,
      itemQuick: "",
    });

    const maxlength = computed(() => {
      const maxlength = props.config?.maxlength || 300;
      return maxlength;
    });

    const showAddBtn = computed(() => {
      let result = true;
      const { showAdd = true } = props.config;
      if (!showAdd) {
        result = false;
      }
      return result;
    });

    const showNav = computed(() => {
      let navList = ["快捷回复", "常用回复"];
      const { nav } = props.config;
      if (nav) {
        const [a, b] = nav;
        navList = [a, b];
      }
      return navList;
    });

    const showDelete = computed(() => {
      let show = true;
      const { showDeleteBtn } = props.config || {};
      if (showDeleteBtn === false) {
        show = false;
      }
      return show;
    });

    const showHeader = computed(() => {
      let heder = true;
      const { showHeader = true } = props.config || {};
      if (showHeader === false) {
        heder = false;
      }
      return heder;
    });

    const refData = toRefs(data);
    return {
      CirclePlus,
      CircleCheck,
      CircleClose,
      ...refData,
      maxlength,
      showAddBtn,
      showNav,
      showDelete,
      showHeader,

      handleSelect,
      AddQuickFn,
      show,
    };
    function show() {
      data.visible = true;
    }

    function handleSelect(index: number) {
      data.activeIndex = index;
      emit("event", { key: "navIndex", value: index });
    }

    function AddQuickFn() {
      emit("event", { key: "addTalk", value: data.itemQuick });
      data.visible = false;
      nextTick(() => {
        data.itemQuick = "";
      });
    }
  },
});
</script>
<style scoped>
.el-menu-demo {
  width: 100%;
  height: 42px;
  line-height: 40px;
  display: flex;
  position: relative;
}
.el-menu-demo > * {
  height: unset;
  line-height: unset;
  width: 40%;
  padding: 0;
  text-align: center;
  box-shadow: none;
}
.addBtn {
  width: 20%;
  position: absolute;
  right: 0;
}
.addBtn:focus {
  outline: none;
  text-align: center;
}
.wrapper {
  padding: 0;
  height: 100%;
  width: 0;
  max-width: 100%;
  min-width: 220px;
  margin: 0 auto;
  text-align: left;
  position: relative;
}
ul {
  padding: 0;
  list-style: none;
  height: 84%;
  overflow: auto;
}
li {
  padding: 0.5rem;
  padding-right: 0;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin: 0.2rem 0;
}
li p {
  margin: 0;
  /* width: 95%; */
}
li:hover i {
  display: inline-block;
}
li i {
  /* display: none; */
  margin: 0 0.05rem;
}
i:hover {
  color: #409eff;
  cursor: pointer;
}
</style>
