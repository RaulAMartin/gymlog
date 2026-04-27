import type { WeightRecommendation } from "../types/gym";

type WeightRecommendationCardProps = {
  recommendation: WeightRecommendation;
};

function WeightRecommendationCard({
  recommendation,
}: WeightRecommendationCardProps) {
  return (
    <article className="rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm">
      <h3 className="text-lg font-bold text-gray-900">
        {recommendation.label}
      </h3>

      <p className="mt-1 text-sm text-gray-500">
        {recommendation.percentage}%
      </p>

      <p className="mt-3 text-2xl font-bold text-blue-600">
        {recommendation.weight} kg
      </p>
    </article>
  );
}

export default WeightRecommendationCard;
