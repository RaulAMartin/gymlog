import type { WeightRecommendation } from "../types/gym";

function roundWeight(weight: number) {
  return Math.round(weight * 10) / 10;
}

export function calculateWeightRecommendations(rm: number): WeightRecommendation[] {
  return [
    {
      label: "RM",
      percentage: 100,
      weight: roundWeight(rm),
    },
    {
      label: "Fuerza",
      percentage: 80,
      weight: roundWeight(rm * 0.8),
    },
    {
      label: "Bodybuilding",
      percentage: 60,
      weight: roundWeight(rm * 0.6),
    },
    {
      label: "Cardio",
      percentage: 40,
      weight: roundWeight(rm * 0.4),
    },
  ];
}
