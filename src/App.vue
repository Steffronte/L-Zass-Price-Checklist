<template>
  <h1>L-Zass price checklist</h1>
  <p>
    Price checklist permet de connaitre rapidement l'état du marché sur Warframe. Il propose des listes d'items mises à jour automatiquement et triable. Dans
    warframe, les prix oscillent souvent à cause du Prime Vault, de Baro et des events.
  </p>
  <button :class="{ isSelected: selectedList == WARFRAMES }" @click="selectedList = WARFRAMES">Warframes</button>
  <button :class="{ isSelected: selectedList == WEAPONS }" @click="selectedList = WEAPONS">Armes</button>
  <button :class="{ isSelected: selectedList == PRIME_SETS }" @click="selectedList = PRIME_SETS">Autres set prime</button>
  <button :class="{ isSelected: selectedList == RELICS }" @click="selectedList = RELICS">Reliques</button>
  <button :class="{ isSelected: selectedList == MODS }" @click="selectedList = MODS">Mods</button>
  <button :class="{ isSelected: selectedList == ARCANES }" @click="selectedList = ARCANES">Arcanes</button>
  <button :class="{ isSelected: selectedList == GEMS }" @click="selectedList = GEMS">Gemmes</button>
  <button :class="{ isSelected: selectedList == FISH }" @click="selectedList = FISH">Poissons</button>
  <template v-if="!isLoading">
    <ProductList :itemList="frameList" v-on:itemSort="itemSort" v-show="selectedList == WARFRAMES" />
    <ProductList :itemList="weaponsList" v-on:itemSort="itemSort" v-show="selectedList == WEAPONS" />
    <ProductList :itemList="primeSetList" v-on:itemSort="itemSort" v-show="selectedList == PRIME_SETS" />
    <ProductList :itemList="relicsList" v-on:itemSort="itemSort" v-show="selectedList == RELICS" />
    <ProductList :showEnglish="true" :itemList="arcaneList" v-on:itemSort="itemSort" v-show="selectedList == ARCANES" />
    <ProductList :imgHeight="128" :showEnglish="true" :itemList="modsList" v-on:itemSort="itemSort" v-show="selectedList == MODS" />
    <ProductList :itemList="gemsList" v-on:itemSort="itemSort" v-show="selectedList == GEMS" />
    <ProductList :itemList="fishList" v-on:itemSort="itemSort" v-show="selectedList == FISH" />
  </template>
  <p v-else><Spinner fill="blue" height="30px" dur="1.0s" /> Récupération en cours...</p>
  <footer>
    Toutes les données proviennent de <a href="https://warframe.market">Warframe Market</a>. La mise à jour des données aura lieu dans la nuit lorsqu'elle sera
    sera automatisée. Dernière mise à jour le {{ lastUpdate }}.
    <br />
    Digital Extremes Ltd, Warframe and the logo Warframe are registered trademarks. All rights are reserved worldwide. This site has no official link with
    Digital Extremes Ltd or Warframe. All artwork, screenshots, characters or other recognizable features of the intellectual property relating to these
    trademarks are likewise the intellectual property of Digital Extremes Ltd.
    <br />
    Créé par Steffronté
  </footer>
</template>

<script>
import ProductList from "./components/ProductList.vue";
import Spinner from "./components/IconSpinner.vue";
import SortConstantMixin from "@/mixins/SortConstantMixin.js";
import itemService from "@/services/ItemService.js";

export default {
  components: { ProductList, Spinner },
  mixins: [SortConstantMixin],
  data() {
    return {
      isLoading: true,
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
      WARFRAMES: "WARFRAMES",
      WEAPONS: "WEAPONS",
      RELICS: "RELICS",
      MODS: "MODS",
      ARCANES: "ARCANES",
      PRIME_SETS: "OTHER_PRIME_SETS",
      GEMS: "GEMS",
      FISH: "FISH",
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
    itemSort(type, isAsc) {
      let list = this.getSelectedList();
      console.log(type, isAsc);
      let f;
      switch (type) {
        case this.FR_NAME:
          f = (a, b) => a.detail.fr.item_name.localeCompare(b.detail.fr.item_name);
          break;
        case this.EN_NAME:
          f = (a, b) => a.detail.en.item_name.localeCompare(b.detail.en.item_name);
          break;
        case this.MED_0:
          f = (a, b) => a.stats[0].stat0.median - b.stats[0].stat0.median;
          break;
        case this.MED_30:
          f = (a, b) => a.stats[0].stat30.median - b.stats[0].stat30.median;
          break;
        case this.MED_60:
          f = (a, b) => a.stats[0].stat60.median - b.stats[0].stat60.median;
          break;
        case this.MED_90:
          f = (a, b) => a.stats[0].stat90.median - b.stats[0].stat90.median;
          break;
      }
      list.sort(f);
      if (!isAsc) list.reverse();
    },
    getSelectedList() {
      let list;
      switch (this.selectedList) {
        case this.WARFRAMES:
          list = this.frameList;
          break;
        case this.WEAPON:
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
          alert("Erreur lors du tri, liste inconnue : " + this.selectedList);
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
  color: #2c3e50;
}

#app > button {
  margin: 3px;
  border: none;
  padding: 15px 30px;
  font-size: 16px;
  color: white;
  background-color: #538bc1;
}

#app > button.isSelected {
  color: black;
  background-color: #e3ecf5;
}

footer {
  margin-top: 25px;
  padding: 8px;
  background-color: lightgray;
}

body {
  margin: 0;
}
</style>
