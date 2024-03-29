import Joi from 'joi';

export const minLengthMsg = (len: number) => `Min length is ${len}`;
export const maxLengthMsg = (len: number) => `Max length is ${len}`;
const YOUTUBE_LINK_REGEX =
  /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;

const MEGOGO_LINK_REGEX =
  /^(https:\/\/megogo.net\/)(en|ru|ua)\/(view\/).+(\.html)$/;

interface IMovieForm {
  title: string;
  description: string;
  tagline?: string;
  releaseDate?: Date;
  runtime?: number;
  budget?: number;
  revenue?: number;
  averageRate?: number;
  countVotes: number;
  genres: string[];
  directors?: string[];
  countries?: string[];
  actors?: string[];
  poster?: string | File;
  trailer?: string;
  megogoLink?: string;
}

const movieSchema = Joi.object({
  title: Joi.string()
    .trim()
    .required()
    .min(2)
    .message(minLengthMsg(2))
    .max(250)
    .message(maxLengthMsg(250))
    .messages({
      'string.empty': 'Title is required',
      'string.min': minLengthMsg(2),
      'string.max': maxLengthMsg(250),
    }),
  tagline: Joi.string()
    .allow(null)
    .allow('')
    .trim()
    .min(2)
    .message(minLengthMsg(2))
    .max(250)
    .message(maxLengthMsg(250))
    .messages({
      'string.min': minLengthMsg(2),
      'string.max': maxLengthMsg(250),
    }),
  description: Joi.string()
    .required()
    .trim()
    .min(8)
    .message(minLengthMsg(8))
    .max(2000)
    .messages({
      'string.empty': 'Description is required',
      'string.min': minLengthMsg(8),
      'string.max': maxLengthMsg(2000),
    }),
  releaseDate: Joi.any().allow(null).allow(''),
  runtime: Joi.number()
    .allow(null)
    .allow('')
    .max(12 * 60)
    .min(0)
    .messages({
      'number.max': `Max runtime is ${12 * 60} minutes`,
      'number.min': `Runtime should be positive`,
    }),
  budget: Joi.number()
    .allow(null)
    .allow('')
    .min(0)
    .messages({ 'number.min': `Budget should be positive` }),
  revenue: Joi.number()
    .allow(null)
    .allow('')
    .min(0)
    .messages({ 'number.min': `Revenue should be positive` }),
  averageRate: Joi.number()
    .allow(null)
    .allow('')
    .min(0)
    .max(5)
    .messages({
      'number.max': `Max rating is ${5}`,
      'number.min': `Rating should be positive`,
    }),
  countVotes: Joi.number()
    .allow(null)
    .allow('')
    .min(0)
    .messages({ 'number.min': `Count votes should be positive` }),
  genres: Joi.array()
    .required()
    .messages({ 'any.required': 'You should select some genre' }),
  directors: Joi.array(),
  countries: Joi.array(),
  actors: Joi.array(),
  poster: Joi.any(),
  trailer: Joi.string()
    .allow(null)
    .allow('')
    .regex(YOUTUBE_LINK_REGEX)
    .messages({ 'string.pattern.base': 'Link should be valid' }),

  megogoLink: Joi.string()
    .allow(null)
    .allow('')
    .regex(MEGOGO_LINK_REGEX)
    .messages({ 'string.pattern.base': 'Link should be valid' }),
});

export { movieSchema, type IMovieForm, YOUTUBE_LINK_REGEX };
