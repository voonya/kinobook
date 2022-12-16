import { BaseModel } from './base';
import { Genre } from './genre';
import { Country } from './country';
import { Writer } from './writer';
import { Actor } from './actor';

export class Movie extends BaseModel {
  title: string;

  description: string;

  tagline?: string;

  releaseDate?: Date;

  runtime?: number;

  budget?: number;

  revenue?: number;

  averageRate?: number;

  countVotes?: number;

  poster?: string;

  genres: Genre[];

  countries?: Country[];

  writers?: Writer[];

  actors?: Actor[];

  trailer?: string;

  constructor({
    title,
    description,
    tagline,
    releaseDate,
    runtime,
    budget,
    revenue,
    averageRate,
    countVotes,
    genres,
    countries,
    writers,
    actors,
    trailer,
  }) {
    super();
    this.title = title;
    this.description = description;
    this.tagline = tagline;
    this.releaseDate = releaseDate;
    this.runtime = runtime;
    this.budget = budget;
    this.revenue = revenue;
    this.averageRate = averageRate;
    this.countVotes = countVotes;
    this.genres = genres;
    this.countries = countries;
    this.writers = writers;
    this.actors = actors;
    this.trailer = trailer;
  }
}
