<template>
  <h1>L-Zass price checklist</h1>
  <button :class="{ isSelected: selectedList == 'warframes' }" @click="selectFrame">Warframes</button>
  <button :class="{ isSelected: selectedList == 'weapons' }" @click="selectWeapon">Armes</button>
  <button :class="{ isSelected: selectedList == 'relics' }" @click="selectRelic">Reliques</button>
  <button :class="{ isSelected: selectedList == 'mods' }" @click="selectMod">Mods légendaires</button>
  <button :class="{ isSelected: selectedList == 'arcane' }" @click="selectArcane">Arcanes</button>
  <ProductList :title="'Warframes'" :names="frameNames" :totalNumber="frameNamesTotal.length" v-show="selectedList == 'warframes'" />
  <ProductList :title="'Armes'" :names="weaponsNames" :totalNumber="weaponsNamesTotal.length" v-show="selectedList == 'weapons'" />
  <ProductList :title="'Reliques'" :names="relicsNames" :totalNumber="relicsNamesTotal.length" v-show="selectedList == 'relics'" />
  <ProductList
    :title="'Mods légendaires'"
    :names="modsNames"
    :totalNumber="modsNamesTotal.length"
    :imgHeight="128"
    :showEnglish="true"
    v-show="selectedList == 'mods'"
  />
  <ProductList :title="'Arcanes'" :names="arcaneNames" :totalNumber="arcaneNamesTotal.length" :showEnglish="true" v-show="selectedList == 'arcane'" />
</template>

<script>
import ProductList from "./components/ProductList.vue";
import itemService from "@/services/ItemService.js";
import warframeService from "@/services/WarframeService.js";
import weaponService from "@/services/WeaponService.js";
import primedModService from "@/services/PrimedModService.js";
import relicService from "@/services/RelicService.js";
import arcaneService from "@/services/ArcaneService.js";

export default {
  components: { ProductList },
  data() {
    return {
      isLoading: true,
      itemPerRequest: 3,
      delayBetweenRequest: 1500,
      selectedList: "warframes",
      frameNames: [],
      weaponsNames: [],
      modsNames: [],
      relicsNames: [],
      arcaneNames: [],
      frameNamesTotal: [],
      weaponsNamesTotal: [],
      modsNamesTotal: [],
      relicsNamesTotal: [],
      arcaneNamesTotal: [],
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
      console.log("extracted list");
      this.frameNamesTotal = warframeService.getDefaultList();
      console.log("frame ok");
      this.weaponsNamesTotal = weaponService.extractFromList(items);
      console.log("weapon ok");
      this.relicsNamesTotal = relicService.extractFromList(items);
      console.log("relics ok");
      this.modsNamesTotal = primedModService.extractFromList(items);
      console.log("mods ok");
      this.arcaneNamesTotal = arcaneService.extractFromList(items);
      console.log("arcane ok");
    },
    loadDefaultItems() {
      console.log("default list");
      this.frameNamesTotal = warframeService.getDefaultList();
      this.weaponsNamesTotal = weaponService.getDefaultList();
      this.relicsNamesTotal = relicService.getDefaultList();
      this.modsNamesTotal = primedModService.getDefaultList();
      this.arcaneNamesTotal = arcaneService.getDefaultList();
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
