const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { REGEXPR } = require('../config');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovies);

router.post('/', celebrate({
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
}), createMovie);

router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}), deleteMovie);

module.exports = router;
