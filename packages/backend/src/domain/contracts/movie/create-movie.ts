export class CreateMovie {
  title: string;

  description: string;

  tagline?: string;

  releaseDate?: Date;

  runtime?: number;

  budget?: number;

  revenue?: number;

  poster?: string;

  genres: string[];

  countries?: string[];

  directors?: string[];

  actors?: string[];
}
