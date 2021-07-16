<template>
  <tr v-if="showItem">
    <td v-if="imgHeight > 0" :rowspan="nbRow">
      <a :href="item.detail.en.wiki_link"><img :src="itemThumbUrl" :height="imgHeight" :style="colThumbStyle" /></a>
    </td>
    <td :rowspan="nbRow" class="itemName">
      <a :href="item.detail.fr.wiki_link">
        <span class="infobulle" :aria-label="item.detail.fr.description">{{ item.detail.fr.item_name }}</span>
      </a>
    </td>
    <td :rowspan="nbRow" class="itemName" v-if="showEnglish">
      <a :href="item.detail.en.wiki_link">
        <span class="infobulle" :aria-label="item.detail.en.description">{{ item.detail.en.item_name }}</span>
      </a>
    </td>
    <td v-if="isDucat" class="ducat">{{ getDucat }}</td>
    <td v-if="isRanked" class="rank">{{ isReallyRanked ? item.stats[0].rank : "?" }}</td>
    <td class="price">
      <span class="infobulle" :aria-label="getMessageOfDay(item.stats[0], 90)">{{ getMedianPriceOfDay(item.stats[0], 90) }}</span>
    </td>
    <td class="price">
      <span class="infobulle" :aria-label="getMessageOfDay(item.stats[0], 60)">{{ getMedianPriceOfDay(item.stats[0], 60) }}</span>
    </td>
    <td class="price">
      <span class="infobulle" :aria-label="getMessageOfDay(item.stats[0], 30)">{{ getMedianPriceOfDay(item.stats[0], 30) }}</span>
    </td>
    <td class="price">
      <span class="infobulle" :aria-label="getMessageOfDay(item.stats[0], 0)">{{ getMedianPriceOfDay(item.stats[0], 0) }}</span>
    </td>
  </tr>
  <template v-for="(s, i) in item.stats" :key="i">
    <tr v-if="i > 0 && showItem">
      <td v-if="isRanked">{{ s.rank }}</td>
      <td>
        <span class="infobulle" :aria-label="getMessageOfDay(s, 90)">{{ getMedianPriceOfDay(s, 90) }}</span>
      </td>
      <td>
        <span class="infobulle" :aria-label="getMessageOfDay(s, 60)">{{ getMedianPriceOfDay(s, 60) }}</span>
      </td>
      <td>
        <span class="infobulle" :aria-label="getMessageOfDay(s, 30)">{{ getMedianPriceOfDay(s, 30) }}</span>
      </td>
      <td>
        <span class="infobulle" :aria-label="getMessageOfDay(s, 0)">{{ getMedianPriceOfDay(s, 0) }}</span>
      </td>
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
    isDucat: Boolean,
  },
  computed: {
    itemThumbUrl() {
      return "https://warframe.market/static/assets/" + this.item.detail.thumb;
    },
    nbRow() {
      return this.item.stats.length == 0 ? 1 : this.item.stats.length;
    },
    colThumbStyle() {
      return "max-width:" + Math.min(131, this.imgHeight * 3) + "px";
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
      return s["stat" + day].message;
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
.infobulle {
  position: relative;
  cursor: help;
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
  padding: 4px;
  border-radius: 7px;
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
