const router = require('express').Router({ mergeParams: true });
const controller = require('./controller');
const validator = require('./validator');
const auth = require('../../libs/auth');

router
  .get('/:userId', validator.getUserOwnInfo, auth.authUser, controller.getUserOwnInfo)
  .post('/login', controller.login)
  .post('/register', controller.register)

module.exports = router;