<template>
  <div class="productList">
    <h2 v-if="isLoading"><Spinner fill="blue" height="30px" dur="1.0s" /> Récupération en cours... ({{ names.length }}/{{ totalNumber }})</h2>
    <table class="tableList">
      <tr>
        <th>Image</th>
        <th>
          Nom FR
          <template v-if="!isLoading"><span @click="sort(FR_NAME, true)">↓</span><span @click="sort(FR_NAME, false)">↑</span></template>
        </th>
        <th v-if="showEnglish">
          Nom EN
          <template v-if="!isLoading"><span @click="sort(EN_NAME, true)">↓</span><span @click="sort(EN_NAME, false)">↑</span></template>
        </th>
        <th>
          Méd. j
          <template v-if="!isLoading"><span @click="sort(MED_J, true)">↓</span><span @click="sort(MED_J, false)">↑</span></template>
        </th>
        <th>
          Méd. h
          <template v-if="!isLoading"><span @click="sort(MED_H, true)">↓</span><span @click="sort(MED_H, false)">↑</span></template>
        </th>
      </tr>
      <ProductItem
        v-for="name in names"
        :key="name"
        :itemName="name"
        :item="getByName(name)"
        :showEnglish="showEnglish"
        :imgHeight="imgHeight"
        v-on:itemUpdate="itemUpdate"
      />
    </table>
  </div>
</template>

<script>
import ProductItem from "./ProductItem.vue";
import Spinner from "./IconSpinner.vue";
import SortConstantMixin from "@/mixins/SortConstantMixin.js";

export default {
  components: { ProductItem, Spinner },
  name: "ProductList",
  mixins: [SortConstantMixin],
  props: {
    names: Array,
    itemList: Array,
    totalNumber: Number,
    showEnglish: { type: Boolean, default: false },
    imgHeight: { type: Number, default: 32 },
  },
  computed: {
    isLoading() {
      return this.names.length < this.totalNumber || this.names.length == 0;
    },
    progression() {
      return this.names.length == this.totalNumber ? "" : "(" + this.names.length + "/" + this.totalNumber + ")";
    },
  },
  methods: {
    getByName(name) {
      let data = this.itemList.filter((i) => i.include.item.items_in_set.filter((it) => it.url_name == name).length > 0);
      return data.count == 0 ? null : data[0];
    },
    itemUpdate(item) {
      this.$emit("itemUpdate", item);
    },
    sort(type, isAsc) {
      console.log(type, isAsc);
      this.$emit("itemSort", type, isAsc);
    },
  },
};
</script>

<style scoped lang="css">
h1 {
  font-style: italic;
}
.tableList {
  margin-left: auto;
  margin-right: auto;
}
</style>
