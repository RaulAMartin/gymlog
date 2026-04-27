import type { WeightRecommendation } from "../types/gym";

export function calculateWeightRecommendations(rm: number): WeightRecommendation[] {
  return [
    {
      label: "RM",
      percentage: 100,
      weight: rm,
    },
    {
      label: "Fuerza",
      percentage: 80,
      weight: rm * 0.8,
    },
    {
      label: "Bodybuilding",
      percentage: 60,
      weight: rm * 0.6,
    },
    {
      label: "Cardio",
      percentage: 40,
      weight: rm * 0.4,
    },
  ];
}
