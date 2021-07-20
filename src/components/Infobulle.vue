<template>
  <span class="infobulle" :aria-label="message">
    <slot></slot>
  </span>
</template>

<script>
export default {
  name: "Infobulle",
  props: {
    message: String,
  },
};
</script>

<style scoped>
.infobulle {
  position: relative;
  cursor: help;
  display: inline-block;
}
.infobulle:hover::after,
.infobulle:focus::after {
  content: attr(aria-label);
  position: absolute;
  top: -2.4em;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  white-space: nowrap;
  color: white;
  background-color: #413219;
  padding: 4px 6px;
  border-radius: 7px;
  font-weight: normal;
}
[aria-label]:hover:before,
[aria-label]:focus:before {
  content: "▼";
  position: absolute;
  top: -1em;
  left: 50%;
  transform: translateX(-50%);
  font-size: 20px;
  color: #413219;
}
</style>
