<template>
  <div class="filter">
    <IconFilter class="iconFilter" fill="black" />
    <input placeholder="Nom FR" type="text" v-model="nameFr" />
    <input placeholder="Nom EN" type="text" v-model="nameEn" v-if="hasEnName" />
    <input placeholder="Description" type="text" v-model="description" v-if="showDesc" />
    <input placeholder="Description2" type="text" v-model="description2" v-if="showDesc2" />
    <template v-if="tags.length > 0">
      <select v-model="tag1" class="tag1">
        <option selected :value="null">Aucun type 1</option>
        <option v-for="option in tags" :key="option.value" :value="option.value">{{ option.name }}</option>
      </select>
      <select v-model="tag2" v-if="listName != RELICS">
        <option selected :value="null">Aucun type 2</option>
        <option v-for="option in tags" :key="option.value" :value="option.value">{{ option.name }}</option>
      </select>
    </template>
  </div>
</template>

<script>
import ListNameMixin from "@/mixins/ListNameMixin.js";
import IconFilter from "./IconFilter.vue";

export default {
  name: "Filter",
  components: { IconFilter },
  mixins: [ListNameMixin],
  props: {
    listName: String,
    hasEnName: Boolean,
  },
  data() {
    return {
      nameFr: null,
      nameEn: null,
      tag1: null,
      tag2: null,
      description: null,
      description2: null,
      weaponsTags: [
        { name: "Arbalète", value: "crossbow" },
        { name: "Archwing", value: "archwing" },
        { name: "Fusil", value: "rifle" },
        { name: "Fusil d'assault", value: "assault rifle" },
        { name: "Mêlée", value: "melee" },
        { name: "Pistolet", value: "pistol" },
        { name: "Pompe", value: "shotgun" },
        { name: "Prime", value: "prime" },
        { name: "Principale", value: "primary" },
        { name: "Secondaire", value: "secondary" },
        { name: "Sentinelle", value: "sentinel" },
        { name: "Syndicat", value: "syndicate" },
      ],
      relicsTags: [
        { name: "Lith", value: "lith" },
        { name: "Meso", value: "meso" },
        { name: "Neo", value: "neo" },
        { name: "Axi", value: "axi" },
        { name: "Requiem", value: "requiem" },
      ],
      modsTags: [
        { name: "Commun", value: "common" },
        { name: "Peu commun", value: "uncommon" },
        { name: "Rare", value: "rare" },
        { name: "Riven", value: "riven" },
        { name: "Accru", value: "legendary" },
        { name: "Archgun", value: "arch-gun" },
        { name: "Archmélée", value: "arch-melee" },
        { name: "Fusil", value: "rifle" },
        { name: "Pistolet", value: "pistol" },
        { name: "Pompe", value: "shotgun" },
        { name: "Sniper", value: "sniper" },
        { name: "Stance", value: "stance" },
        { name: "Archwing", value: "archwing" },
        { name: "Principale", value: "primary" },
        { name: "Secondaire", value: "secondary" },
        { name: "Warframe", value: "warframe" },
        { name: "Compagnon", value: "companion" },
        { name: "Bête", value: "beast" },
        { name: "Kavat", value: "kavat" },
        { name: "Kubrow", value: "kubrow" },
        { name: "Sentinelle", value: "sentinel" },
        { name: "Aura", value: "aura" },
        { name: "Exilus", value: "exilus" },
        { name: "Syndicat", value: "syndicate" },
        { name: "PVP", value: "pvp" },
      ],
    };
  },
  computed: {
    filterData() {
      return {
        nameFr: this.nameFr,
        nameEn: this.nameEn,
        tag1: this.tag1,
        tag2: this.tag2,
        description: this.description,
        description2: this.description2,
      };
    },
    tags() {
      let tags;
      switch (this.listName) {
        case this.WEAPONS:
          tags = this.weaponsTags;
          break;
        case this.RELICS:
          tags = this.relicsTags;
          break;
        case this.MODS:
          tags = this.modsTags;
          break;
        default:
          tags = [];
          break;
      }
      return tags;
    },
    showDesc() {
      return [this.WEAPONS, this.MODS, this.ARCANES, this.FISH].includes(this.listName);
    },
    showDesc2() {
      return [this.MODS].includes(this.listName);
    },
  },
  watch: {
    filterData() {
      this.$parent.$emit("filters", this.filterData);
    },
  },
};
</script>

<style scoped lang="css">
.filter {
  margin: 13px auto;
}
.iconFilter,
input,
.tag1 {
  margin-right: 5px;
}
input {
  max-width: 120px;
}
</style>
