<template>
  <h1>L-Zass price checklist</h1>
  <p>
    Price checklist permet de connaitre rapidement l'état du marché sur Warframe. Il propose des listes d'items mises à jour automatiquement et triable. Dans
    warframe, les prix oscillent souvent à cause du Prime Vault, de Baro et des events.
  </p>
  <button :class="{ isSelected: selectedList == 'warframes' }" @click="selectFrame">Warframes</button>
  <button :class="{ isSelected: selectedList == 'weapons' }" @click="selectWeapon">Armes</button>
  <button :class="{ isSelected: selectedList == 'relics' }" @click="selectRelic">Reliques</button>
  <button :class="{ isSelected: selectedList == 'mods' }" @click="selectMod">Mods légendaires</button>
  <button :class="{ isSelected: selectedList == 'arcane' }" @click="selectArcane">Arcanes</button>
  <ProductList
    :names="frameNames"
    :totalNumber="frameNamesTotal.length"
    :itemList="frameList"
    v-on:itemUpdate="addFrame"
    v-on:itemSort="sortFrame"
    v-show="selectedList == 'warframes'"
  />
  <ProductList
    :names="weaponsNames"
    :totalNumber="weaponsNamesTotal.length"
    :itemList="weaponsList"
    v-on:itemUpdate="addWeapon"
    v-on:itemSort="sortWeapon"
    v-show="selectedList == 'weapons'"
  />
  <ProductList
    :names="relicsNames"
    :totalNumber="relicsNamesTotal.length"
    :itemList="relicsList"
    v-on:itemUpdate="addRelic"
    v-on:itemSort="sortRelic"
    v-show="selectedList == 'relics'"
  />
  <ProductList
    :names="modsNames"
    :totalNumber="modsNamesTotal.length"
    :imgHeight="128"
    :showEnglish="true"
    :itemList="modsList"
    v-on:itemUpdate="addMod"
    v-on:itemSort="sortMod"
    v-show="selectedList == 'mods'"
  />
  <ProductList
    :names="arcaneNames"
    :totalNumber="arcaneNamesTotal.length"
    :showEnglish="true"
    :itemList="arcaneList"
    v-on:itemUpdate="addArcane"
    v-on:itemSort="sortArcane"
    v-show="selectedList == 'arcane'"
  />
  <footer>
    Toutes les données proviennent de <a href="https://warframe.market">WarFrame Market</a>. Si la mise à jour des listes est si lente, c'est parce que l'api
    limite le nombre de requêtes par secondes.
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
import SortConstantMixin from "@/mixins/SortConstantMixin.js";
import itemService from "@/services/ItemService.js";
import warframeService from "@/services/WarframeService.js";
import weaponService from "@/services/WeaponService.js";
import primedModService from "@/services/PrimedModService.js";
import relicService from "@/services/RelicService.js";
import arcaneService from "@/services/ArcaneService.js";

export default {
  components: { ProductList },
  mixins: [SortConstantMixin],
  data() {
    return {
      isLoading: true,
      itemPerRequest: 3,
      delayBetweenRequest: 1500,
      selectedList: "warframes",
      //Slowly increasing names list for AntiDDOS
      frameNames: [],
      weaponsNames: [],
      modsNames: [],
      relicsNames: [],
      arcaneNames: [],
      //Total name list
      frameNamesTotal: [],
      weaponsNamesTotal: [],
      modsNamesTotal: [],
      relicsNamesTotal: [],
      arcaneNamesTotal: [],
      //Item list, data added from event
      frameList: [],
      weaponsList: [],
      modsList: [],
      relicsList: [],
      arcaneList: [],
    };
  },
  methods: {
    /** Because to much request at the same time doesn't work */
    addItem(list, totalList, callback) {
      if (list.length < totalList.length) {
        list = list.concat(totalList.slice(list.length, Math.min(totalList.length, list.length + this.itemPerRequest)));
      }
      if (list.length < totalList.length) {
        setTimeout(() => callback(), 1); //Because we need to return
      } else {
        this.isLoading = false;
      }
      return list;
    },
    requestFrame() {
      if (this.selectedList == "warframes")
        setTimeout(() => (this.frameNames = this.addItem(this.frameNames, this.frameNamesTotal, this.requestFrame)), this.delayBetweenRequest);
    },
    requestWeapon() {
      if (this.selectedList == "weapons")
        setTimeout(() => (this.weaponsNames = this.addItem(this.weaponsNames, this.weaponsNamesTotal, this.requestWeapon)), this.delayBetweenRequest);
    },
    requestRelic() {
      if (this.selectedList == "relics")
        setTimeout(() => (this.relicsNames = this.addItem(this.relicsNames, this.relicsNamesTotal, this.requestRelic)), this.delayBetweenRequest);
    },
    requestMod() {
      if (this.selectedList == "mods")
        setTimeout(() => (this.modsNames = this.addItem(this.modsNames, this.modsNamesTotal, this.requestMod)), this.delayBetweenRequest);
    },
    requestArcane() {
      if (this.selectedList == "arcane")
        setTimeout(() => (this.arcaneNames = this.addItem(this.arcaneNames, this.arcaneNamesTotal, this.requestArcane)), this.delayBetweenRequest);
    },
    selectFrame() {
      this.selectedList = "warframes";
      this.requestFrame();
    },
    selectWeapon() {
      this.selectedList = "weapons";
      this.requestWeapon();
    },
    selectRelic() {
      this.selectedList = "relics";
      this.requestRelic();
    },
    selectMod() {
      this.selectedList = "mods";
      this.requestMod();
    },
    selectArcane() {
      this.selectedList = "arcane";
      this.requestArcane();
    },
    loadItems(items) {
      console.info("extracted list");
      this.frameNamesTotal = warframeService.getDefaultList();
      this.weaponsNamesTotal = weaponService.extractFromList(items);
      this.relicsNamesTotal = relicService.extractFromList(items);
      this.modsNamesTotal = primedModService.extractFromList(items);
      this.arcaneNamesTotal = arcaneService.extractFromList(items);
    },
    loadDefaultItems() {
      console.error("default list");
      this.frameNamesTotal = warframeService.getDefaultList();
      this.weaponsNamesTotal = weaponService.getDefaultList();
      this.relicsNamesTotal = relicService.getDefaultList();
      this.modsNamesTotal = primedModService.getDefaultList();
      this.arcaneNamesTotal = arcaneService.getDefaultList();
    },
    addFrame(item) {
      this.frameList = this.frameList.concat([item]); //No push for reactivity
    },
    addWeapon(item) {
      this.weaponsList = this.weaponsList.concat([item]); //No push for reactivity
    },
    addRelic(item) {
      this.relicsList = this.relicsList.concat([item]); //No push for reactivity
    },
    addMod(item) {
      this.modsList = this.modsList.concat([item]); //No push for reactivity
    },
    addArcane(item) {
      this.arcaneList = this.arcaneList.concat([item]); //No push for reactivity
    },
    itemSort(list, nameList, type, isAsc) {
      let f;
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
        case this.MED_H:
          f = (a, b) => getLastPriceOf(findByName(a).payload.statistics_closed["48hours"]) - getLastPriceOf(findByName(b).payload.statistics_closed["48hours"]);
          break;
      }
      nameList.sort(f);
      if (!isAsc) nameList.reverse();
      return nameList;
    },
    sortFrame(type, isAsc) {
      this.frameNames = this.itemSort(this.frameList.slice(), this.frameNames.slice(), type, isAsc);
    },
    sortWeapon(type, isAsc) {
      this.weaponsNames = this.itemSort(this.weaponsList.slice(), this.weaponsNames.slice(), type, isAsc);
    },
    sortRelic(type, isAsc) {
      this.relicsNames = this.itemSort(this.relicsList.slice(), this.relicsNames.slice(), type, isAsc);
    },
    sortMod(type, isAsc) {
      this.modsNames = this.itemSort(this.modsList.slice(), this.modsNames.slice(), type, isAsc);
    },
    sortArcane(type, isAsc) {
      this.arcaneNames = this.itemSort(this.arcaneList.slice(), this.arcaneNames.slice(), type, isAsc);
    },
  },
  mounted() {
    itemService
      .getAll()
      .then((response) => this.loadItems(response.data.payload.items))
      .catch((error) => {
        console.error(error);
        this.loadDefaultItems();
      })
      .finally(() => this.requestFrame());
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
</style>
