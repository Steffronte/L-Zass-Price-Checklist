<template>
  <div class="productList">
    <Filter :listName="listName" :hasEnName="showEnglish" />
    <table class="tableList">
      <tr>
        <th v-if="imgHeight > 0">
          <Infobulle message="Accès au wiki EN au clic">Image</Infobulle>
        </th>
        <th>
          <Infobulle message="Description française au survol, wiki FR au clic">Nom FR</Infobulle>
          <Sort :column="FR_NAME" />
        </th>
        <th v-if="showEnglish">
          <Infobulle message="Description anglaise au survol, wiki EN au clic">Nom EN</Infobulle>
          <Sort :column="EN_NAME" />
        </th>
        <th v-if="isDucat">
          <Infobulle message="Valeur du set en ducats"><Ducat /></Infobulle>
          <Sort :column="DUCAT" />
        </th>
        <th v-if="isRanked">
          <Infobulle message="Niveau de l'objet. Seul les prix du premier rang sont utilisés par les tris.">Rang</Infobulle>
        </th>
        <th class="infobulle">
          <Infobulle message="Prix médian le plus ancien disponible">J-90</Infobulle>
          <Sort :column="MED_90" />
        </th>
        <th>
          <Infobulle :message="priceColumnInfo(60)">J-60</Infobulle>
          <Sort :column="MED_60" />
        </th>
        <th>
          <Infobulle :message="priceColumnInfo(30)">J-30</Infobulle>
          <Sort :column="MED_30" />
        </th>
        <th>
          <Infobulle message="Prix médian le plus récent disponible">J-1</Infobulle>
          <Sort :column="MED_0" />
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
import Infobulle from "./Infobulle.vue";
import Sort from "./Sort.vue";

export default {
  components: { ProductItem, Filter, Ducat, Infobulle, Sort },
  name: "ProductList",
  mixins: [SortConstantMixin, ListNameMixin],
  props: {
    itemList: Array,
    listName: String,
    imgHeight: { type: Number, default: 32 },
  },
  methods: {
    priceColumnInfo(day) {
      return "Prix médians il y a " + day + " jours si disponible, sinon moyenne pondérée des jours le plus proche disponible avant et après.";
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
  width: auto;
}
</style>
<style>
.tableList td,
.tableList th {
  text-align: center;
}
</style>
