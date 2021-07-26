<template>
  <h2 class="betaInfo">Beta : outil en cours de développement, des bugs peuvent apparaître</h2>
  <p class="info">
    Price checklist permet de connaitre rapidement l'état du marché sur Warframe. Il propose des listes d'items mises à jour quotidiennement filtrables et
    triables. Des informations supplémentaires sont disponibles au survol.
  </p>
  <button :class="{ isSelected: selectedList == WARFRAMES }" @click="selectedList = WARFRAMES">Warframes</button>
  <button :class="{ isSelected: selectedList == WEAPONS }" @click="selectedList = WEAPONS">Armes</button>
  <button :class="{ isSelected: selectedList == PRIME_SETS }" @click="selectedList = PRIME_SETS">Vrac prime</button>
  <button :class="{ isSelected: selectedList == RELICS }" @click="selectedList = RELICS">Reliques</button>
  <button :class="{ isSelected: selectedList == MODS }" @click="selectedList = MODS">Mods</button>
  <button :class="{ isSelected: selectedList == ARCANES }" @click="selectedList = ARCANES">Arcanes</button>
  <button :class="{ isSelected: selectedList == GEMS }" @click="selectedList = GEMS">Gemmes</button>
  <button :class="{ isSelected: selectedList == FISH }" @click="selectedList = FISH">Poissons</button>
  <template v-if="!isLoading">
    <ProductList :itemList="frameList" v-on="handlers" v-show="selectedList == WARFRAMES" :listName="WARFRAMES" />
    <ProductList :itemList="weaponsList" v-on="handlers" v-show="selectedList == WEAPONS" :listName="WEAPONS" />
    <ProductList :itemList="primeSetList" v-on="handlers" v-show="selectedList == PRIME_SETS" :listName="PRIME_SETS" />
    <ProductList :itemList="relicsList" v-on="handlers" v-show="selectedList == RELICS" :listName="RELICS" :imgHeight="48" />
    <ProductList :itemList="arcaneList" v-on="handlers" v-show="selectedList == ARCANES" :listName="ARCANES" :imgHeight="48" />
    <ProductList :itemList="modsList" v-on="handlers" v-show="selectedList == MODS" :listName="MODS" :imgHeight="128" />
    <ProductList :itemList="gemsList" v-on="handlers" v-show="selectedList == GEMS" :listName="GEMS" />
    <ProductList :itemList="fishList" v-on="handlers" v-show="selectedList == FISH" :listName="FISH" />
  </template>
  <p class="loadingMessage" v-else><Spinner fill="orange" height="20px" dur="1.0s" /> Récupération des données en cours, veuillez patienter...</p>
  <p class="errorMessage" v-if="isErrored">⚠Erreur lors de la récupération des données : {{ errorMessage }}</p>
  <footer>
    Toutes les données proviennent de <a href="https://warframe.market">Warframe Market</a> et y sont récupérées une fois par jour.<br />
    Dernière mise à jour le {{ lastUpdate }}.<br />
    Digital Extremes Ltd, Warframe and the logo Warframe are registered trademarks. All rights are reserved worldwide. This site has no official link with
    Digital Extremes Ltd or Warframe. All artwork, screenshots, characters or other recognizable features of the intellectual property relating to these
    trademarks are likewise the intellectual property of Digital Extremes Ltd.
    <br />
    Créé par <a href="mailto:stefan.eu2@gmail.com?subject=L-Zass price checklist">Steffronté</a>
  </footer>
</template>

<script>
import ProductList from "./components/ProductList.vue";
import Spinner from "./components/IconSpinner.vue";
import SortConstantMixin from "@/mixins/SortConstantMixin.js";
import ListNameMixin from "@/mixins/ListNameMixin.js";
import itemService from "@/services/ItemService.js";

export default {
  components: { ProductList, Spinner },
  mixins: [SortConstantMixin, ListNameMixin],
  data() {
    return {
      selectedList: null,
      lastUpdate: "?",
      frameList: [],
      weaponsList: [],
      primeSetList: [],
      modsList: [],
      relicsList: [],
      arcaneList: [],
      gemsList: [],
      fishList: [],
      handlers: {
        sort: this.sort,
        filters: this.filters,
      },
      isLoading: true,
      isErrored: false,
      errorMessage: null,
    };
  },
  methods: {
    loadItems(allData) {
      this.lastUpdate = new Date(allData.updateDate).toLocaleString();
      this.frameList = allData.warframes;
      this.weaponsList = allData.weapons;
      this.primeSetList = allData.otherPrimeSets;
      this.relicsList = allData.relics;
      this.modsList = allData.mods;
      this.arcaneList = allData.arcanes;
      this.gemsList = allData.gems;
      this.fishList = allData.fish;
    },
    sort(type, isAsc) {
      let list = this.getSelectedList();
      let f;
      let findMedian = (i, stat) => (i.stats.length == 0 ? -1 : i.stats[0][stat].median);
      let getDucat = (i) => (i.detail.ducats ? i.detail.ducats : -1);
      switch (type) {
        case this.FR_NAME:
          f = (a, b) => a.detail.fr.item_name.localeCompare(b.detail.fr.item_name);
          break;
        case this.EN_NAME:
          f = (a, b) => a.detail.en.item_name.localeCompare(b.detail.en.item_name);
          break;
        case this.MED_0:
          f = (a, b) => findMedian(a, "stat0") - findMedian(b, "stat0");
          break;
        case this.MED_30:
          f = (a, b) => findMedian(a, "stat30") - findMedian(b, "stat30");
          break;
        case this.MED_60:
          f = (a, b) => findMedian(a, "stat60") - findMedian(b, "stat60");
          break;
        case this.MED_90:
          f = (a, b) => findMedian(a, "stat90") - findMedian(b, "stat90");
          break;
        case this.DUCAT:
          f = (a, b) => getDucat(a) - getDucat(b);
          break;
      }
      list.sort(f);
      if (!isAsc) list.reverse();
    },
    filters(data) {
      const list = this.getSelectedList();
      console.log(data);
      const normalizeName = (name) => name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      list.forEach((item, index) => {
        let hide = false;
        const normalizedDesc = normalizeName(item.detail.fr.description + item.detail.en.description);
        if (data.tag1 && !hide) hide = !item.detail.tags.includes(data.tag1);
        if (data.tag2 && !hide) hide = !item.detail.tags.includes(data.tag2);
        if (data.nameFr && !hide) hide = !normalizeName(item.detail.fr.item_name).includes(normalizeName(data.nameFr));
        if (data.nameEn && !hide) hide = !normalizeName(item.detail.en.item_name).includes(normalizeName(data.nameEn));
        if (data.description && !hide) hide = !normalizedDesc.includes(normalizeName(data.description));
        if (data.description2 && !hide) hide = !normalizedDesc.includes(normalizeName(data.description2));
        list[index].hide = hide;
      });
    },
    getSelectedList() {
      let list;
      switch (this.selectedList) {
        case this.WARFRAMES:
          list = this.frameList;
          break;
        case this.WEAPONS:
          list = this.weaponsList;
          break;
        case this.PRIME_SETS:
          list = this.primeSetList;
          break;
        case this.RELICS:
          list = this.relicsList;
          break;
        case this.MODS:
          list = this.modsList;
          break;
        case this.ARCANES:
          list = this.arcaneList;
          break;
        case this.GEMS:
          list = this.gemsList;
          break;
        case this.FISH:
          list = this.fishList;
          break;
        default:
          alert("Erreur, liste inconnue : " + this.selectedList);
          return;
      }
      return list;
    },
  },
  mounted() {
    this.selectedList = this.WARFRAMES;
    itemService
      .getAll()
      .then((response) => this.loadItems(response.data))
      .catch((error) => {
        console.error(error);
        this.errorMessage = error.message;
        this.isErrored = true;
      })
      .finally(() => (this.isLoading = false));
  },
};
</script>

<style lang="css">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  margin: 0 auto;
  width: 776px;
}

#app > button {
  margin: 1px;
  border: none;
  padding: 7px 0px;
  width: 95px;
  font-size: 15px;
  color: white;
  background-color: #538bc1;
}

#app > button.isSelected {
  color: #2c3e50;
  background-color: #e3ecf5;
}

footer {
  margin-top: 25px;
  padding: 8px;
  background-color: lightgray;
  color: #2c3e50;
}

.info {
  font-size: 14px;
  font-style: italic;
}

h2.betaInfo {
  font-size: 1.2em;
  color: red;
}

.loadingMessage,
.errorMessage {
  font-size: 20px;
}

.errorMessage {
  color: red;
  font-weight: bold;
}
</style>
