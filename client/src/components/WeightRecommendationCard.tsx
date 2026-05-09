import type { WeightRecommendation } from "../types/gym";

type WeightRecommendationCardProps = {
  recommendation: WeightRecommendation;
};

function WeightRecommendationCard({
  recommendation,
}: WeightRecommendationCardProps) {
  return (
    <article
      className="
        rounded-xl
        border
        border-gray-200
        bg-white
        p-4
        text-center
        shadow-sm
        dark:border-gray-700
        dark:bg-gray-900
      "
    >
      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
        {recommendation.label}
      </h3>

      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        {recommendation.percentage}%
      </p>

      <p className="mt-3 text-2xl font-bold text-blue-600 dark:text-blue-400">
        {recommendation.weight} kg
      </p>
    </article>
  );
}

export default WeightRecommendationCard;
