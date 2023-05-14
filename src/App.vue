<script setup>
import { Cascader } from "pit-cascader";
import 'pit-cascader/lib/style.css'
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
