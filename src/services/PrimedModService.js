import AbstractService from "@/services/AbstractService";

class PrimedModService extends AbstractService {
  constructor() {
    super();
  }

  isCorrect(itemUrlName) {
    return itemUrlName.startsWith("primed_");
  }

  getDefaultList() {
    return [
      "primed_animal_instinct",
      "primed_bane_of_corpus",
      "primed_bane_of_corrupted",
      "primed_bane_of_grineer",
      "primed_bane_of_infested",
      "primed_charged_shell",
      "primed_chilling_grasp",
      "primed_cleanse_corpus",
      "primed_cleanse_corrupted",
      "primed_cleanse_grineer",
      "primed_cleanse_infested",
      "primed_continuity",
      "primed_cryo_rounds",
      "primed_expel_corpus",
      "primed_expel_corrupted",
      "primed_expel_grineer",
      "primed_expel_infested",
      "primed_fast_hands",
      "primed_fever_strike",
      "primed_firestorm",
      "primed_flow",
      "primed_fulmination",
      "primed_fury",
      "primed_heated_charge",
      "primed_heavy_trauma",
      "primed_morphic_transformer",
      "primed_pack_leader",
      "primed_pistol_ammo_mutation",
      "primed_pistol_gambit",
      "primed_point_blank",
      "primed_pressure_point",
      "primed_quickdraw",
      "primed_ravage",
      "primed_reach",
      "primed_regen",
      "primed_rifle_ammo_mutation",
      "primed_rubedo_lined_barrel",
      "primed_shotgun_ammo_mutation",
      "primed_slip_magazine",
      "primed_smite_corpus",
      "primed_smite_corrupted",
      "primed_smite_grineer",
      "primed_smite_infested",
      "primed_tactical_pump",
      "primed_target_cracker",
    ];
  }
}

const primedModService = new PrimedModService();
export default primedModService;
