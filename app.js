const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const { MONGOURI, PORT } = require('./config');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const rateLimiter = require('./middlewares/rateLimiter');
const errorHandle = require('./middlewares/errorHandle');
const routerIndex = require('./routes/index');

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(rateLimiter);

mongoose.connect(MONGOURI);

app.use(requestLogger); // подключаем логгер запросов

app.use(cors({
  origin: '*',
}));

app.use('/', routerIndex);

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors());

app.use(errorHandle);

app.listen(PORT, () => console.log('Бэкенд запущен'));
