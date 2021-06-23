import AbstractService from "@/services/AbstractService";
import warframeService from "@/services/WarframeService";

class WeaponService extends AbstractService {
  constructor() {
    super();
  }

  isCorrect(itemUrlName) {
    return itemUrlName.endsWith("_prime_set");
  }

  isIncorrect(itemUrlName) {
    return warframeService.getDefaultList().includes(itemUrlName);
  }

  getDefaultList() {
    return [
      "astilla_prime_set",
      "baza_prime_set",
      "boar_prime_set",
      "boltor_prime_set",
      "braton_prime_set",
      "burston_prime_set",
      "cernos_prime_set",
      "corinth_prime_set",
      "latron_prime_set",
      "panthera_prime_set",
      "paris_prime_set",
      "rubico_prime_set",
      "soma_prime_set",
      "stradavar_prime_set",
      "sybaris_prime_set",
      "tenora_prime_set",
      "tiberon_prime_set",
      "tigris_prime_set",
      "vectis_prime_set",
      "zhuge_prime_set",
      "akbolto_prime_set",
      "akbronco_prime_set",
      "akjagara_prime_set",
      "aklex_prime_set",
      "aksomati_prime_set",
      "akstiletto_prime_set",
      "akvasto_prime_set",
      "ballistica_prime_set",
      "bronco_prime_set",
      "euphona_prime_set",
      "hikou_prime_set",
      "lex_prime_set",
      "pandero_prime_set",
      "pyrana_prime_set",
      "sicarus_prime_set",
      "spira_prime_set",
      "vasto_prime_set",
      "zakti_prime_set",
      "ankyros_prime_set",
      "bo_prime_set",
      "dakra_prime_set",
      "destreza_prime_set",
      "dual_kamas_prime_set",
      "fang_prime_set",
      "fragor_prime_set",
      "galatine_prime_set",
      "glaive_prime_set",
      "gram_prime_set",
      "guandao_prime_set",
      "karyst_prime_set",
      "kogake_prime_set",
      "kronen_prime_set",
      "nami_skyla_prime_set",
      "nikana_prime_set",
      "ninkondi_prime_set",
      "orthos_prime_set",
      "pangolin_prime_set",
      "reaper_prime_set",
      "redeemer_prime_set",
      "scindo_prime_set",
      "silva_and_aegis_prime_set",
      "tekko_prime_set",
      "tipedo_prime_set",
      "venka_prime_set",
      "volnus_prime_set",
    ];
  }
}

const weaponService = new WeaponService();
export default weaponService;
