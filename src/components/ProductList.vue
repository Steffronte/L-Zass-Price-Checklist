<template>
  <div class="productList">
    <Filter :listName="listName" :hasEnName="showEnglish" />
    <table class="tableList">
      <tr>
        <th v-if="imgHeight > 0">Image</th>
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
        <th v-if="isDucat">
          <Ducat />
          <span @click="sort(DUCAT, true)">↓</span>
          <span @click="sort(DUCAT, false)">↑</span>
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
      <ProductItem
        v-for="item in itemList"
        :key="item.detail.url_name"
        :item="item"
        :showEnglish="showEnglish"
        :imgHeight="imgHeight"
        :isRanked="isRanked"
        :isDucat="isDucat"
      />
    </table>
  </div>
</template>

<script>
import ProductItem from "./ProductItem.vue";
import Filter from "./Filter.vue";
import Ducat from "./IconDucat.vue";
import SortConstantMixin from "@/mixins/SortConstantMixin.js";
import ListNameMixin from "@/mixins/ListNameMixin.js";

export default {
  components: { ProductItem, Filter, Ducat },
  name: "ProductList",
  mixins: [SortConstantMixin, ListNameMixin],
  props: {
    itemList: Array,
    listName: String,
    imgHeight: { type: Number, default: 32 },
  },
  methods: {
    sort(type, isAsc) {
      this.$emit("sort", type, isAsc);
    },
  },
  computed: {
    isRanked() {
      return [this.RELICS, this.MODS, this.ARCANES, this.FISH].includes(this.listName);
    },
    isDucat() {
      return [this.WARFRAMES, this.WEAPONS, this.PRIME_SETS].includes(this.listName);
    },
    showEnglish() {
      return [this.MODS, this.ARCANES, this.GEMS].includes(this.listName);
    },
  },
};
</script>

<style scoped lang="css">
h1 {
  font-style: italic;
}
.tableList {
  margin: 0 auto;
  padding: 0;
  border: none;
  border-spacing: 0px;
}
.tableList th span {
  cursor: pointer;
}
</style>
