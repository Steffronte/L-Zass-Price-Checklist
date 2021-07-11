<template>
  <tr>
    <td><img :src="itemThumbUrl" :height="imgHeight" :style="colThumbStyle" /></td>
    <td>{{ item.detail.fr.item_name }}</td>
    <td v-if="showEnglish">{{ item.detail.en.item_name }}</td>
    <td>{{ getMedianPriceOfDay(90) }}</td>
    <td>{{ getMedianPriceOfDay(60) }}</td>
    <td>{{ getMedianPriceOfDay(30) }}</td>
    <td>{{ getMedianPriceOfDay(0) }}</td>
  </tr>
</template>

<script>
export default {
  name: "ProductItem",
  props: {
    itemName: String,
    item: Object,
    showEnglish: Boolean,
    imgHeight: Number,
  },
  computed: {
    itemThumbUrl() {
      return "https://warframe.market/static/assets/" + this.item.detail.thumb;
    },
    nbCol() {
      return this.showEnglish ? 7 : 6;
    },
    colThumbStyle() {
      return "max-width:" + this.imgHeight * 3 + "px";
    },
  },
  methods: {
    getMedianPriceOfDay(day) {
      if (!this.item.stats["stat" + day]) return "?";
      const price = this.item.stats["stat" + day].median;
      return price == -1 ? "-" : price;
    },
  },
};
</script>

<style scoped lang="css"></style>
