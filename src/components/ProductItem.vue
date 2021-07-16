<template>
  <tr v-if="showItem">
    <td v-if="imgHeight > 0" :rowspan="nbRow"><img :src="itemThumbUrl" :height="imgHeight" :style="colThumbStyle" /></td>
    <td :rowspan="nbRow" class="itemName">{{ item.detail.fr.item_name }}</td>
    <td :rowspan="nbRow" class="itemName" v-if="showEnglish">{{ item.detail.en.item_name }}</td>
    <td v-if="isRanked">{{ isReallyRanked ? item.stats[0].rank : "?" }}</td>
    <td>{{ getMedianPriceOfDay(item.stats[0], 90) }}</td>
    <td>{{ getMedianPriceOfDay(item.stats[0], 60) }}</td>
    <td>{{ getMedianPriceOfDay(item.stats[0], 30) }}</td>
    <td>{{ getMedianPriceOfDay(item.stats[0], 0) }}</td>
  </tr>
  <template v-for="(s, i) in item.stats" :key="i">
    <tr v-if="i > 0 && showItem">
      <td v-if="isRanked">{{ s.rank }}</td>
      <td>{{ getMedianPriceOfDay(s, 90) }}</td>
      <td>{{ getMedianPriceOfDay(s, 60) }}</td>
      <td>{{ getMedianPriceOfDay(s, 30) }}</td>
      <td>{{ getMedianPriceOfDay(s, 0) }}</td>
    </tr>
  </template>
</template>

<script>
export default {
  name: "ProductItem",
  props: {
    itemName: String,
    item: Object,
    showEnglish: Boolean,
    imgHeight: Number,
    isRanked: Boolean,
  },
  computed: {
    itemThumbUrl() {
      return "https://warframe.market/static/assets/" + this.item.detail.thumb;
    },
    nbRow() {
      return this.item.stats.length == 0 ? 1 : this.item.stats.length;
    },
    colThumbStyle() {
      return "max-width:" + this.imgHeight * 3 + "px";
    },
    hasStats() {
      return this.item.stats.length > 0;
    },
    isReallyRanked() {
      return this.hasStats && this.item.stats[0].rank != undefined;
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
  },
};
</script>

<style scoped lang="css">
td.itemName {
  max-width: 200px;
}
</style>
