export interface IRecommendationFilters {
  offset?: number;
  limit?: number;

  title?: string;
  genres?: string[];
  countries?: string[];
  actors?: string[];
  directors?: string[];
}
