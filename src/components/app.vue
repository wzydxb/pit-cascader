<script setup>
import { reactive, ref, defineProps, defineEmits, watch } from "vue";
import deepClone from "../deepClone.js";
const props = defineProps({
  modelValue: String,
  props: {
    type: String,
    default: () => ({ value: "value", label: "label", children: "children" }),
  },
  options: {
    type: Array,
    default: () => [],
  },
});

const innerValue = ref("");
let hasLevel = ref(1);
let childMap = reactive({});
const emit = defineEmits(["update:modelValue", "change"]);

const initOption = (list) => {
  let arrList = [];
  const setKey = (arr, level, fullPath = "", valuePath = "") => {
    return arr.map((item) => {
      item.level = level;
      item.selected = false;
      item.fullPath = fullPath + (fullPath ? "/" : "") + item[props.props.label];
      item.valuePath = fullPath + (valuePath ? "/" : "") + item[props.props.value];
      if (item[props.props.children] && item[props.props.children].length) {
        item.children = setKey(
          item[props.props.children],
          level + 1,
          item.fullPath,
          item.valuePath
        );
      }
      return item;
    });
  };
  arrList = setKey(deepClone(list), 1);
  return arrList;
};
let _options = ref(initOption(props.options));

watch(
  () => props.modelValue,
  (modelValue) => {
    const selectItem = getSelectItem(modelValue);
    const valuePathList = selectItem ? selectItem.valuePath.split("/") : [];
    innerValue.value = selectItem ? selectItem[[props.props.label]] : "";
    setSelected(valuePathList);
  },
  { immediate: true }
);
function getSelectItem(key) {
  let selectItem = null;
  function hasValue(list) {
    for (let i = 0; i < list.length; i++) {
      if (key === list[i][props.props.value]) {
        selectItem = list[i];
        break;
      }
      if (list[i][props.props.children] && list[i][props.props.children].length) {
        hasValue(list[i][props.props.children]);
      }
    }
  }
  hasValue(_options.value);
  return selectItem;
}
function setSelected(valuePathList) {
  const setValue = (list) => {
    return list.map((item) => {
      item.selected = valuePathList.includes(item[props.props.value]);
      if (
        valuePathList.includes(item[props.props.value]) &&
        item[props.props.children] &&
        item[props.props.children].length
      ) {
        childMap[item.level] = item[props.props.children];
      }
      if (item[props.props.children] && item[props.props.children].length)
        item[props.props.children] = setValue(item[props.props.children]);
      return item;
    });
  };
  _options.value = setValue(_options.value);
}
const handleChange = (selectRow, val) => {
  innerValue.value = selectRow.fullPath;
  emit("update:modelValue", val);
  emit("change", val, selectRow);
};
const itemClick = (item, arr) => {
  arr.forEach((elem) => {
    elem.selected = false;
  });
  item.selected = true;
  if (item[props.props.children] && item[props.props.children].length) {
    hasLevel.value = item.level;
    for (let levelKey in childMap) {
      if (levelKey > item.level) delete childMap[levelKey];
    }
    childMap[item.level] = item[props.props.children];
  } else {
    delete childMap[item.level];
    handleChange(item, item[props.props.value]);
  }
};
</script>

<template>
  <el-popover
    placement="bottom"
    title=""
    :width="'auto'"
    trigger="click"
    style="position: relative"
  >
    <template #reference>
      <el-input v-model="innerValue" readonly class="m-2" v-bind="$attrs"></el-input>
    </template>
    <template #default>
      <div class="el-cascader-panel" v-if="options.length">
        <div class="el-scrollbar el-cascader-menu" role="menu">
          <div
            class="el-cascader-menu__wrap el-scrollbar__wrap el-scrollbar__wrap--hidden-default"
          >
            <ul class="el-scrollbar__view el-cascader-menu__list" style="">
              <li
                tabindex="-1"
                class="el-cascader-node"
                v-for="(item, index) of _options"
                :key="index"
                @click="itemClick(item, _options)"
              >
                <span
                  class="el-cascader-node__label"
                  :class="[
                    'el-cascader-node__label',
                    item.selected ? 'selected' : '',
                  ]"
                  >{{ item[[props.props.label]] }}</span
                ><i class="el-icon arrow-right el-cascader-node__postfix"
                  ><svg
                    viewBox="0 0 1024 1024"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="currentColor"
                      d="M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z"
                    ></path></svg></i>
              </li>
            </ul>
          </div>
        </div>
        <div
          class="el-scrollbar el-cascader-menu"
          role="menu"
          v-for="(child, key) in childMap"
          :key="key"
        >
          <div
            class="el-cascader-menu__wrap el-scrollbar__wrap el-scrollbar__wrap--hidden-default"
          >
            <ul class="el-scrollbar__view el-cascader-menu__list" style="">
              <li
                tabindex="-1"
                class="el-cascader-node"
                v-for="(item, index) of child"
                :key="index"
                @click="itemClick(item, child)"
              >
                <span
                  :class="[
                    'el-cascader-node__label',
                    item.selected ? 'selected' : '',
                  ]"
                  >{{ item[[props.props.label]] }}</span
                ><i
                  class="el-icon arrow-right el-cascader-node__postfix"
                  v-if="item[props.props.children] && item[props.props.children].length"
                  ><svg
                    viewBox="0 0 1024 1024"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="currentColor"
                      d="M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z"
                    ></path></svg></i>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div v-else style="text-align: center">无数据</div>
    </template>
  </el-popover>
</template>

<style scoped lang="css">
.selected {
  color: #409eff;
  font-weight: 900;
}
:deep(.el-cascader-menu__wrap.el-scrollbar__wrap) {
  height: auto;
  max-height: 200px;
  overflow: auto;
}
</style>
