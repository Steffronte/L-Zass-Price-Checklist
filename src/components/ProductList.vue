<template>
  <div class="productList">
    <table class="tableList">
      <tr>
        <th>Image</th>
        <th>
          Nom FR
          <span @click="sort(FR_NAME, true)">↓</span>
          <span @click="sort(FR_NAME, false)">↑</span>
        </th>
        <th v-if="showEnglish">
          Nom EN
          <span @click="sort(EN_NAME, true)">↓</span>
          <span @click="sort(EN_NAME, false)">↑</span>
        </th>
        <th v-if="isRanked">Rang</th>
        <th>
          J-90
          <span @click="sort(MED_90, true)">↓</span>
          <span @click="sort(MED_90, false)">↑</span>
        </th>
        <th>
          J-60
          <span @click="sort(MED_60, true)">↓</span>
          <span @click="sort(MED_60, false)">↑</span>
        </th>
        <th>
          J-30
          <span @click="sort(MED_30, true)">↓</span>
          <span @click="sort(MED_30, false)">↑</span>
        </th>
        <th>
          J-1
          <span @click="sort(MED_0, true)">↓</span>
          <span @click="sort(MED_0, false)">↑</span>
        </th>
      </tr>
      <ProductItem v-for="item in itemList" :key="item.detail.url_name" :item="item" :showEnglish="showEnglish" :imgHeight="imgHeight" :isRanked="isRanked" />
    </table>
  </div>
</template>

<script>
import ProductItem from "./ProductItem.vue";
import SortConstantMixin from "@/mixins/SortConstantMixin.js";

export default {
  components: { ProductItem },
  name: "ProductList",
  mixins: [SortConstantMixin],
  props: {
    itemList: Array,
    showEnglish: { type: Boolean, default: false },
    imgHeight: { type: Number, default: 32 },
  },
  methods: {
    sort(type, isAsc) {
      this.$emit("itemSort", type, isAsc);
    },
  },
  computed: {
    isRanked() {
      console.log(this.itemList[0].stats[0]);
      return this.itemList ? this.itemList[0].stats[0].rank != undefined : false;
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
.tableList th span {
  cursor: pointer;
}
</style>
