import AbstractService from "@/services/AbstractService";

class ArcaneService extends AbstractService {
  constructor() {
    super();
  }

  isCorrect(itemUrlName) {
    return (
      itemUrlName.startsWith("arcane_") ||
      itemUrlName.startsWith("theorem_") ||
      itemUrlName.startsWith("magus_") ||
      itemUrlName.startsWith("virtuos_") ||
      itemUrlName.startsWith("exodia_") ||
      itemUrlName.startsWith("pax_") ||
      itemUrlName.startsWith("residual_")
    );
  }

  isIncorrect(itemUrlName) {
    return itemUrlName.endsWith("helmet");
  }

  getDefaultList() {
    return [
      "arcane_acceleration",
      "arcane_aegis",
      "arcane_agility",
      "arcane_arachne",
      "arcane_avenger",
      "arcane_awakening",
      "arcane_barrier",
      "arcane_blade_charger",
      "arcane_bodyguard",
      "arcane_consequence",
      "arcane_deflection",
      "arcane_energize",
      "arcane_eruption",
      "arcane_fury",
      "arcane_grace",
      "arcane_guardian",
      "arcane_healing",
      "arcane_ice",
      "arcane_momentum",
      "arcane_nullifier",
      "arcane_phantasm",
      "arcane_pistoleer",
      "arcane_precision",
      "arcane_primary_charger",
      "arcane_pulse",
      "arcane_rage",
      "arcane_resistance",
      "arcane_strike",
      "theorem_contagion",
      "theorem_demulcent",
      "theorem_infection",
      "arcane_tanker",
      "arcane_tempo",
      "arcane_trickery",
      "arcane_ultimatum",
      "arcane_velocity",
      "arcane_victory",
      "arcane_warmth",
      "magus_vigor",
      "magus_husk",
      "magus_cadence",
      "magus_cloud",
      "magus_replenish",
      "magus_elevate",
      "magus_nourish",
      "magus_overload",
      "magus_glitch",
      "magus_revert",
      "magus_firewall",
      "magus_drive",
      "magus_lockdown",
      "magus_destruct",
      "magus_anomaly",
      "magus_melt",
      "magus_accelerant",
      "magus_repair",
      "virtuos_null",
      "virtuos_tempo",
      "virtuos_fury",
      "virtuos_strike",
      "virtuos_shadow",
      "virtuos_ghost",
      "virtuos_trojan",
      "virtuos_surge",
      "virtuos_spike",
      "virtuos_forge",
      "exodia_brave",
      "exodia_force",
      "exodia_hunt",
      "exodia_might",
      "exodia_triumph",
      "exodia_valor",
      "exodia_contagion",
      "exodia_epidemic",
      "pax_bolt",
      "pax_charge",
      "pax_seeker",
      "pax_soar",
      "residual_boils",
      "residual_malodor",
      "residual_shock",
      "residual_viremia",
    ];
  }
}

const arcaneService = new ArcaneService();
export default arcaneService;
