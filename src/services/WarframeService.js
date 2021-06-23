import AbstractService from "@/services/AbstractService";

class WarframeService extends AbstractService {
  constructor() {
    super();
  }

  getDefaultList() {
    return [
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
    ];
  }
}

const warframeService = new WarframeService();
export default warframeService;
