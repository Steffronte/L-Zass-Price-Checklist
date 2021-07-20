<template>
  <span @click="sort(true)">↓</span>
  <span @click="sort(false)">↑</span>
</template>

<script>
export default {
  name: "Sort",
  props: {
    column: String,
  },
  methods: {
    sort(isAsc) {
      this.$parent.$emit("sort", this.column, isAsc);
    },
  },
};
</script>

<style scoped>
span {
  cursor: pointer;
}
</style>
