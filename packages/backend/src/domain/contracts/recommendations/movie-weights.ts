export interface IEntityParam {
  value: string;
  weight: number;
}

export interface IMovieParamsWeights {
  title: IEntityParam[];
  description: IEntityParam[];
  genres: IEntityParam[];
  countries: IEntityParam[];
  actors: IEntityParam[];
  directors: IEntityParam[];
}
