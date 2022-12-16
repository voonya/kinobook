import Joi from 'joi';
import { minLengthMsg, maxLengthMsg } from './movie';

interface IGenreForm {
  name: string;
}

const genreSchema = Joi.object({
  name: Joi.string()
    .trim()
    .required()
    .min(2)
    .message(minLengthMsg(2))
    .max(100)
    .message(maxLengthMsg(100))
    .messages({
      'string.empty': 'Name is required',
      'string.min': minLengthMsg(2),
      'string.max': maxLengthMsg(100),
    }),
});

export { genreSchema, type IGenreForm };
