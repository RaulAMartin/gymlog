import type { WeightRecommendation } from "../types/gym";
import { motion } from "motion/react";

type WeightRecommendationCardProps = {
  recommendation: WeightRecommendation;
};

function WeightRecommendationCard({
  recommendation,
}: WeightRecommendationCardProps) {
  return (
    <motion.article
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  whileHover={{ scale: 1.03 }}
  transition={{ duration: 0.2 }}
  className="rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm"
  >
      <h3 className="text-lg font-bold text-gray-900">
        {recommendation.label}
      </h3>

      <p className="mt-1 text-sm text-gray-500">
        {recommendation.percentage}%
      </p>

      <p className="mt-3 text-2xl font-bold text-blue-600">
        {recommendation.weight} kg
      </p>
    </motion.article>
  );
}

export default WeightRecommendationCard;
