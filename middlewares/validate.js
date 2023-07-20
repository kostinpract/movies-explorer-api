const { celebrate, Joi } = require('celebrate');
const { REGEXPR } = require('../config');

const validateLoginUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(1).max(255),
    director: Joi.string().required().min(1).max(255),
    duration: Joi.number().required(),
    year: Joi.string().required().min(2).max(4),
    description: Joi.string().required().min(1).max(1025),
    nameRU: Joi.string().required().min(1).max(255),
    nameEN: Joi.string().required().min(1).max(255),
    image: Joi.string().required().regex(REGEXPR),
    trailer: Joi.string().required().regex(REGEXPR),
    thumbnail: Joi.string().required().regex(REGEXPR),
    movieId: Joi.number().required(),
  }),
});

const validateDeleteMovie = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
});

module.exports = {
  validateLoginUser,
  validateCreateUser,
  validateCreateMovie,
  validateDeleteMovie,
  validateUpdateUser,
};
