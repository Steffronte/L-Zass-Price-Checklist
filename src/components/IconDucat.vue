<template>
  <svg viewBox="0 0 18.231 22.384" :height="height">
    <title>Ducats</title>
    <path
      d="m7.986.006-.275.363H4.737l2.606 4.189-.008 13.603 1.762 3.268 1.762-3.268-.008-13.603L13.457.369h-2.973l-.276-.363H7.986zM4.805 
      1.522c-.887.528-1.917 1.425-2.571 2.225l2.232 1.138c.4-.42 1.149-.981 1.646-1.277L4.805 1.522zm8.584 0-1.307 2.086c.497.296 1.246.856 
      1.646 1.277l2.232-1.138c-.654-.8-1.684-1.697-2.57-2.225zM.542 3.497l2.5 4.46v9.41l2.353.378.017-11.763-4.87-2.485zm17.11 0-4.87 2.485.017 
      11.763 2.353-.379v-9.41l2.5-4.459zM1.057 5.52C.598 6.61.346 8.06.346 9.321c0 2.25.812 4.303 2.15 5.877l.02-7.08L1.057 5.52zm16.08 0-1.459 
      2.597.02 7.081a9.046 9.046 0 0 0 2.15-5.877c0-1.26-.252-2.712-.711-3.8zm-11.23 8.93v3.103c.274.167.575.323.909.454V14.45c-.312.01-.696-.008-.91 
      0zm5.472 0v3.557a5.94 5.94 0 0 0 .91-.454v-3.104c-.215-.008-.599.01-.91 0zM3.04 18.006 5.396 22.4v-4.026l-2.356-.368zm12.114 
      0-2.355.368V22.4l2.355-4.394z"
      :fill="fill"
    />
  </svg>
</template>

<script>
export default {
  name: "IconDucat",
  props: {
    fill: { type: String, default: "white" },
    height: { type: String, default: "20px" },
  },
};
</script>

<style scoped>
svg {
  display: inline-block;
  vertical-align: bottom;
}
</style>
