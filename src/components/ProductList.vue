<template>
  <div class="productList">
    <table class="tableList">
      <tr>
        <th>Image</th>
        <th>
          Nom FR
          <template><span @click="sort(FR_NAME, true)">↓</span><span @click="sort(FR_NAME, false)">↑</span></template>
        </th>
        <th v-if="showEnglish">
          Nom EN
          <template><span @click="sort(EN_NAME, true)">↓</span><span @click="sort(EN_NAME, false)">↑</span></template>
        </th>
        <th>
          Méd J-90
          <template><span @click="sort(MED_90, true)">↓</span><span @click="sort(MED_90, false)">↑</span></template>
        </th>
        <th>
          Méd J-60
          <template><span @click="sort(MED_60, true)">↓</span><span @click="sort(MED_60, false)">↑</span></template>
        </th>
        <th>
          Méd J-30
          <template><span @click="sort(MED_30, true)">↓</span><span @click="sort(MED_30, false)">↑</span></template>
        </th>
        <th>
          Méd J-1
          <template><span @click="sort(MED_0, true)">↓</span><span @click="sort(MED_0, false)">↑</span></template>
        </th>
      </tr>
      <ProductItem v-for="item in itemList" :key="item.detail.url_name" :item="item" :showEnglish="showEnglish" :imgHeight="imgHeight" />
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
