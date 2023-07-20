const router = require('express').Router();
const { validateLoginUser, validateCreateUser } = require('../middlewares/validate');
const auth = require('../middlewares/auth');
const { loginUser, createUser } = require('../controllers/users');
const { NotFoundError } = require('../errors/not-found-err');

router.post('/signin', validateLoginUser, loginUser);

router.post('/signup', validateCreateUser, createUser);

router.use(auth);

router.use('/movies', require('./movies'));
router.use('/users', require('./users'));

router.use('*', (req, res, next) => {
  next(new NotFoundError('Такой эндпоинт не найден'));
});

module.exports = router;
