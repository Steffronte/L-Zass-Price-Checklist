<template>
  <tr v-if="showItem">
    <td v-if="imgHeight > 0" :rowspan="nbRow">
      <a :href="item.detail.en.wiki_link">
        <Infobulle message="Lien vers la page wiki EN">
          <img :src="itemThumbUrl" :style="thumbStyle" />
        </Infobulle>
      </a>
    </td>
    <td :rowspan="nbRow" class="itemName">
      <a :href="item.detail.fr.wiki_link">
        <Infobulle :message="item.detail.fr.description">{{ item.detail.fr.item_name }}</Infobulle>
      </a>
    </td>
    <td v-if="showEnglish" :rowspan="nbRow" class="itemName">
      <a :href="item.detail.en.wiki_link">
        <Infobulle :message="item.detail.en.description">{{ item.detail.en.item_name }}</Infobulle>
      </a>
    </td>
    <td v-if="isDucat" :rowspan="nbRow" class="ducat">
      <Infobulle message="Valeur du set en ducats">{{ getDucat }}</Infobulle>
    </td>
    <td v-if="isRanked" class="rank">
      <Infobulle message="Niveau de l'objet. Ce rang est le premier et le seul utilisé dans le tri par prix.">
        {{ isReallyRanked ? item.stats[0].rank : "?" }}
      </Infobulle>
    </td>
    <td class="price">
      <Infobulle :message="getMessageOfDay(item.stats[0], 90)">{{ getMedianPriceOfDay(item.stats[0], 90) }}</Infobulle>
    </td>
    <td class="price">
      <Infobulle :message="getMessageOfDay(item.stats[0], 60)">{{ getMedianPriceOfDay(item.stats[0], 60) }}</Infobulle>
    </td>
    <td class="price">
      <Infobulle :message="getMessageOfDay(item.stats[0], 30)">{{ getMedianPriceOfDay(item.stats[0], 30) }}</Infobulle>
    </td>
    <td class="price">
      <Infobulle :message="getMessageOfDay(item.stats[0], 0)">{{ getMedianPriceOfDay(item.stats[0], 0) }}</Infobulle>
    </td>
  </tr>
  <template v-for="(s, i) in item.stats" :key="i">
    <tr v-if="i > 0 && showItem">
      <td v-if="isRanked">
        <Infobulle message="Niveau de l'objet. Ce rang n'est pas le premier et n'est pas utilisé dans le tri par prix.">{{ s.rank }}</Infobulle>
      </td>
      <td>
        <Infobulle :message="getMessageOfDay(s, 90)">{{ getMedianPriceOfDay(s, 90) }}</Infobulle>
      </td>
      <td>
        <Infobulle :message="getMessageOfDay(s, 60)">{{ getMedianPriceOfDay(s, 60) }}</Infobulle>
      </td>
      <td>
        <Infobulle :message="getMessageOfDay(s, 30)">{{ getMedianPriceOfDay(s, 30) }}</Infobulle>
      </td>
      <td>
        <Infobulle :message="getMessageOfDay(s, 0)">{{ getMedianPriceOfDay(s, 0) }}</Infobulle>
      </td>
    </tr>
  </template>
</template>

<script>
import Infobulle from "./Infobulle.vue";

export default {
  name: "ProductItem",
  components: { Infobulle },
  props: {
    itemName: String,
    item: Object,
    showEnglish: Boolean,
    imgHeight: Number,
    isRanked: Boolean,
    isDucat: Boolean,
  },
  computed: {
    itemThumbUrl() {
      return "https://warframe.market/static/assets/" + this.item.detail.thumb;
    },
    nbRow() {
      return this.item.stats.length == 0 ? 1 : this.item.stats.length;
    },
    thumbStyle() {
      return "max-width:" + Math.min(131, this.imgHeight * 3) + "px; height:" + this.imgHeight + "px;";
    },
    hasStats() {
      return this.item.stats.length > 0;
    },
    isReallyRanked() {
      return this.hasStats && this.item.stats[0].rank != undefined;
    },
    getDucat() {
      return this.item.detail.ducats ? this.item.detail.ducats : "-";
    },
    showItem() {
      return !this.item.hide;
    },
  },
  methods: {
    getMedianPriceOfDay(s, day) {
      if (!this.hasStats) return "?";
      const price = s["stat" + day].median;
      return price == -1 ? "-" : price;
    },
    getMessageOfDay(s, day) {
      if (!this.hasStats) return "Aucune stats pour cet item";
      return s["stat" + day].message + " (" + s["stat" + day].volume + " vendu)";
    },
  },
};
</script>

<style scoped lang="css">
td {
  border: none;
  margin: 0;
  padding: 1px 0px;
}
td.itemName {
  max-width: 185px;
}
td.rank,
td.ducat,
td.price {
  width: 55px;
}
a {
  text-decoration: none;
  color: inherit;
}
a > .infobulle {
  cursor: pointer;
}
</style>
