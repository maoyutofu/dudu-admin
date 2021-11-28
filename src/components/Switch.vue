<template>
  <div>
    <span
      class="weui-switch"
      :class="{ 'weui-switch-on': isChecked }"
      :value="value"
      :idx="idx"
      @click="toggle"
    ></span>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";
export default defineComponent({
  name: "Switch",
  props: {
    value: {
      type: Boolean,
      default: true,
    },
    idx: {
      type: Number,
    },
  },
  data() {
    return {
      isChecked: this.value,
    };
  },
  watch: {
    value(val) {
      console.log(val);
      this.isChecked = val;
    },
    isChecked(val) {
      this.$emit("input", val);
    },
  },
  methods: {
    toggle() {
      this.isChecked = this.value;
      // this.isChecked = !this.isChecked;
      this.$emit("toogle", { idx: this.idx, value: this.isChecked });
    },
  },
});
</script>>

<style>
.weui-switch {
  display: block;
  position: relative;
  width: 52px;
  height: 28px;
  border: 1px solid #dfdfdf;
  outline: 0;
  border-radius: 16px;
  box-sizing: border-box;
  background-color: #dfdfdf;
  transition: background-color 0.1s, border 0.1s;
  cursor: pointer;
}
.weui-switch:before {
  content: " ";
  position: absolute;
  top: 0;
  left: 0;
  width: 50px;
  height: 25px;
  border-radius: 15px;
  background-color: #fdfdfd;
  transition: transform 0.35s cubic-bezier(0.45, 1, 0.4, 1);
}
.weui-switch:after {
  content: " ";
  position: absolute;
  top: 0;
  left: 0;
  width: 30px;
  height: 25px;
  border-radius: 15px;
  background-color: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  transition: transform 0.35s cubic-bezier(0.4, 0.4, 0.25, 1.35);
}
.weui-switch-on {
  border-color: #1aad19;
  background-color: #1aad19;
}
.weui-switch-on:before {
  border-color: #1aad19;
  background-color: #1aad19;
}
.weui-switch-on:after {
  transform: translateX(20px);
}
</style>