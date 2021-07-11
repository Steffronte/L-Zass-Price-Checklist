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
  <button :class="{ isSelected: selectedList == GEMS_FISH }" @click="selectedList = GEMS_FISH">Gemmes & Poissons</button>
  <template v-if="!isLoading">
    <ProductList :itemList="frameList" v-on:itemSort="itemSort" v-show="selectedList == WARFRAMES" />
    <ProductList :itemList="weaponsList" v-on:itemSort="itemSort" v-show="selectedList == WEAPONS" />
    <ProductList :itemList="primeSetList" v-on:itemSort="itemSort" v-show="selectedList == PRIME_SETS" />
    <ProductList :itemList="relicsList" v-on:itemSort="itemSort" v-show="selectedList == RELICS" />
    <ProductList :showEnglish="true" :itemList="arcaneList" v-on:itemSort="sortArcane" v-show="selectedList == ARCANES" />
    <ProductList :imgHeight="128" :showEnglish="true" :itemList="modsList" v-on:itemSort="itemSort" v-show="selectedList == MODS" />
    <ProductList :itemList="gemsFishList" v-on:itemSort="itemSort" v-show="selectedList == GEMS_FISH" />
  </template>
  <p v-else><Spinner fill="blue" height="30px" dur="1.0s" /> Récupération en cours...</p>
  <footer>
    Toutes les données proviennent de <a href="https://warframe.market">WarFrame Market</a>. La mise à jour des données aura lieu dans la nuit lorsqu'elle sera
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
      gemsFishList: [],
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
      this.gemsFishList = allData.gemsFish;
    },
    itemSort(type, isAsc) {
      let list;
      switch (this.selectedList) {
        case this.WARFRAMES:
          list = this.frameList;
          break;
        //TODO
      }
      console.log(list, type, isAsc);
      /*let f;
      let findByName = (name) => list.filter((i) => i.url_name == name)[0];
      let findDetail = (name) =>
        findByName(name)
          .include.item.items_in_set.filter((i) => i.url_name == name)
          .shift();
      let getLastPriceOf = (stats) => (stats.length == 0 ? -1 : stats.slice(-1)[0].median);
      switch (type) {
        case this.FR_NAME:
          f = (a, b) => findDetail(a).fr.item_name.localeCompare(findDetail(b).fr.item_name);
          break;
        case this.EN_NAME:
          f = (a, b) => findDetail(a).en.item_name.localeCompare(findDetail(b).en.item_name);
          break;
        case this.MED_J:
          f = (a, b) => getLastPriceOf(findByName(a).payload.statistics_closed["90days"]) - getLastPriceOf(findByName(b).payload.statistics_closed["90days"]);
          break;
      }
      nameList.sort(f);
      if (!isAsc) nameList.reverse();
      return nameList;*/
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
