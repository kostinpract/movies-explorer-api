const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = mongoose.Schema({
  country: {
    type: String,
    required: [true, 'country должно быть задано'],
  },
  director: {
    type: String,
    required: [true, 'director должно быть задано'],
  },
  duration: {
    type: Number,
    required: [true, 'duration должно быть задано'],
  },
  year: {
    type: Number,
    required: [true, 'year должно быть задано'],
  },
  description: {
    type: String,
    required: [true, 'description должно быть задано'],
  },
  image: {
    type: String,
    required: [true, 'image должно быть задано'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL для image',
    },
  },
  trailer: {
    type: String,
    required: [true, 'trailer должно быть задано'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL для trailer',
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'thumbnail должно быть задано'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL для thumbnail',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Для фильма обязательно указывать связь с пользователем'],
    ref: 'user',
  },
  movieId: {
    type: Number,
    required: [true, 'movieId должен быть задан'],
  },
  nameRU: {
    type: String,
    required: [true, 'nameRU должно быть задано'],
  },
  nameEN: {
    type: String,
    required: [true, 'nameEN должно быть задано'],
  },
});

module.exports = mongoose.model('movie', movieSchema);
