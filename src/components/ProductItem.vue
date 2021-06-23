<template>
  <tr v-if="isLoading">
    <td :colspan="nbCol"><Spinner fill="red" height="30px" dur="1.0s" /> Chargement de {{ itemName }} en cours...</td>
  </tr>
  <tr v-else-if="isError">
    <td :colspan="nbCol">
      Une erreur est survenu lors de la récupération des données de
      {{ itemName }} sur Warframe Market.
    </td>
  </tr>
  <tr v-else-if="item">
    <td><img :src="itemThumbUrl" :height="imgHeight" /></td>
    <td>{{ itemDetail.fr.item_name }}</td>
    <td v-if="showEnglish">{{ itemDetail.en.item_name }}</td>
    <td>{{ item.payload.statistics_closed["90days"].slice(-1)[0].moving_avg }}</td>
    <td>{{ item.payload.statistics_closed["48hours"].slice(-1)[0].moving_avg }}</td>
  </tr>
</template>

<script>
import itemService from "@/services/ItemService.js";
import Spinner from "./IconSpinner.vue";

export default {
  components: { Spinner },
  name: "ProductItem",
  props: {
    itemName: String,
    showEnglish: Boolean,
    imgHeight: Number,
  },
  data() {
    return {
      item: null,
      isLoading: false,
      isError: false,
    };
  },
  computed: {
    itemDetail() {
      return this.item == null ? null : this.item.include.item.items_in_set.filter((i) => i.url_name == this.itemName).shift();
    },
    itemThumbUrl() {
      return this.itemDetail == null ? null : "https://warframe.market/static/assets/" + this.itemDetail.thumb;
    },
    nbCol() {
      return this.showEnglish ? 5 : 4;
    }
  },
  methods: {
    downloadData() {
      this.isLoading = true;
      itemService
        .getByUrlName(this.itemName)
        .then((response) => (this.item = response.data))
        .catch(() => (this.isError = true))
        .finally(() => (this.isLoading = false));
    },
  },
  mounted() {
    this.downloadData();
  },
};
</script>

<style scoped lang="css">
h1 {
  font-style: italic;
}
</style>
