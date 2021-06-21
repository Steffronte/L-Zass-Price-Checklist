<template>
  <h1>L-Zass price checklist</h1>
  <ProductList :title="'Frames'" :names="frameNames" :totalNumber="frameNamesTotal.length" />
</template>

<script>
import ProductList from "./components/ProductList.vue";

export default {
  components: { ProductList },
  data() {
    return {
      isLoading: true,
      frameNames: [],
      frameNamesTotal: [
        "ash_prime_set",
        "atlas_prime_set",
        "banshee_prime_set",
        "chroma_prime_set",
        "ember_prime_set",
        "equinox_prime_set",
        "frost_prime_set",
        "gara_prime_set",
        "hydroid_prime_set",
        "inaros_prime_set",
        "ivara_prime_set",
        "limbo_prime_set",
        "loki_prime_set",
        "mag_prime_set",
        "mesa_prime_set",
        "mirage_prime_set",
        "nekros_prime_set",
        "nezha_prime_set",
        "nova_prime_set",
        "nyx_prime_set",
        "oberon_prime_set",
        "octavia_prime_set",
        "rhino_prime_set",
        "saryn_prime_set",
        "titania_prime_set",
        "trinity_prime_set",
        "valkyr_prime_set",
        "vauban_prime_set",
        "volt_prime_set",
        "wukong_prime_set",
        "zephyr_prime_set",
      ],
    };
  },
  methods: {
    /** Because to much request at the same time doesn't work */
    addXItem(x, list, totalList, delay, callback) {
      if (list.length < totalList.length) {
        list = list.concat(
          totalList.slice(
            list.length,
            Math.min(totalList.length, list.length + x)
          )
        );
      }
      if (list.length < totalList.length) {
        setTimeout(() => callback(), delay);
      } else {
        this.isLoading = false;
      }
      return list;
    },
    requestFrame() {
      this.frameNames = this.addXItem(4, this.frameNames, this.frameNamesTotal, 5000, this.requestFrame);
    },
  },
  mounted() {
    this.requestFrame();
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
</style>
