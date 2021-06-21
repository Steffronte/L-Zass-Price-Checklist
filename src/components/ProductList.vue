<template>
  <div class="productList">
    <h2>{{ title }}
      <template v-if="names.length < totalNumber">
        <Spinner fill="blue" height="30px" dur="1.0s" /> ({{ names.length }}/{{ totalNumber }}) 
      </template>
    </h2>
    <table>
      <tr>
        <th>Image</th>
        <th>Nom FR</th>
        <th>Nom EN</th>
        <th>Moy. 90j</th>
        <th>Moy. 48h</th>
      </tr>
      <ProductItem v-for="name in names" :key="name" :itemName="name" />
    </table>
  </div>
</template>

<script>
import ProductItem from "./ProductItem.vue";
import Spinner from "./IconSpinner.vue";

export default {
  components: { ProductItem, Spinner },
  name: "ProductList",
  props: {
    title: String,
    names: Array,
    totalNumber: Number,
  },
  computed: {
    progression() {
      return this.names.length == this.totalNumber ? "" : "(" + this.names.length + "/" + this.totalNumber + ")";
    },
  }
};
</script>

<style scoped lang="css">
h1 {
  font-style: italic;
}
</style>
