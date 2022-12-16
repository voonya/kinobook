import Joi from 'joi';
import { minLengthMsg, maxLengthMsg } from './movie';

interface IActorForm {
  name: string;
  surname: string;
}

const actorSchema = Joi.object({
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
  surname: Joi.string()
    .allow(null)
    .allow('')
    .trim()
    .min(2)
    .message(minLengthMsg(2))
    .max(100)
    .message(maxLengthMsg(100))
    .messages({
      'string.min': minLengthMsg(8),
      'string.max': maxLengthMsg(1000),
    }),
});

export { actorSchema, type IActorForm };
