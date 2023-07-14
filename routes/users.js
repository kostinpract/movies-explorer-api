const router = require('express').Router();

const {
  getUser,
  updateUser,
} = require('../controllers/users');

const {
  validateUpdateUser,
} = require('../middlewares/validate');

router.patch('/me', validateUpdateUser, updateUser);

router.get('/me', getUser);

module.exports = router;
