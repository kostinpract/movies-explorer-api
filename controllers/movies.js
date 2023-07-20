const Movie = require('../models/movie');

const NotFoundError = require('../errors/not-found-err');
const ConflictError = require('../errors/conflict-err');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');

const STATUS_CREATED = 201;
const STATUS_OK = 200;

const getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((cards) => {
      res.status(STATUS_OK).send(cards);
    })
    .catch((err) => {
      throw new NotFoundError(err.message);
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  const owner = req.user._id;
  Movie.create({ owner, ...req.body })
    .then((movie) => {
      res.status(STATUS_CREATED).send({ data: movie });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Поля заполнены некорректно'));
        return;
      }
      if (err.code === 11000) {
        next(new ConflictError('Уже есть такое'));
        return;
      }
      next(err);
    });
};

const deleteMovie = (req, res, next) => {
  const owner = req.user._id;
  const { movieId } = req.params;

  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм с таким ID не найден');
      }
      if (movie.owner.toString() !== owner) {
        throw new ForbiddenError('Нельзя удалять');
      } else {
        Movie.findByIdAndDelete(movieId)
          .then((deletedMovie) => {
            res.status(200).send({ data: deletedMovie });
          })
          .catch(next);
      }
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
