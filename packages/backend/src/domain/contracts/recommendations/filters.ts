export interface IRecommendationFilters {
  offset?: number;
  limit?: number;

  title?: string;
  genres?: string[];
  countries?: string[];
  actors?: string[];
  directors?: string[];

  releaseDate?: {
    from?: Date;
    to?: Date;
  };

  averageRate?: {
    from?: number;
    to?: number;
  };
}
