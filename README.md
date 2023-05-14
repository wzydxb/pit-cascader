# Vue 3 + Vite
| props | 用途 | 默认值 |
| options | 所有的区域 | [] |
| props | 配置选项 | { value: "value", label: "label", children: "children" } |
继承所有el-input的attr
使用示例：
```
<script setup>
import { Cascader } from "./index.js";
import { ref, reactive } from "vue";
let value = ref("111-222-111");
const options = reactive([
{
    text: "111",
    value: "111",
    children: [
      {
        text: "111-111",
        value: "111-111",
        children: [
          { text: "111-111-111", value: "111-111-111" },
          { text: "111-111-222", value: "111-111-222" },
        ],
      },
      {
        text: "111-222",
        value: "111-222",
        children: [
          { text: "111-222-111", value: "111-222-111" },
          { text: "111-222-222", value: "111-222-222" },
        ],
      },
    ],
  },
  {
    text: "222",
    value: "222",
    children: [
      {
        text: "222-111",
        value: "222-111",
        children: [
          {
            text: "222-111-111",
            value: "222-111-111",
            children: [
              { text: "222-111-111-111", value: "222-111-111-111" },
              { text: "222-111-222-222", value: "222-111-222-222" },
            ],
          },
          { text: "222-111-222", value: "222-111-222" },
        ],
      },
      {
        text: "222-222",
        value: "222-222",
        children: [
          { text: "222-222-111", value: "222-222-111" },
          { text: "222-222-222", value: "222-222-222" },
        ],
      },
    ],
  },
]);
const clickItem = () => {
  console.log("value", value.value);
};
</script>

<template>
  <div style="width: 200px">
    <Cascader
    v-model="value"
    :options="options"
    :props="{ value: 'value', label: 'text', children: 'children' }"
    />
    <el-button @click="clickItem">点我获取value</el-button>
  </div>
</template>

<style scoped lang="css">
.selected {
  color: #409eff;
  font-weight: 900;
}
</style>

```