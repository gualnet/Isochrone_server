const router = require('express').Router({ mergeParams: true });
const controller = require('./controller');
const validator = require('./validator');
const auth = require('../../libs/auth');

router
  .get('/:userId', validator.getUserById, auth.authUser, controller.getUserOwnInfo)
  // .post('/', controller.createNewUser)
  // .put('/:userId', auth.authUser, controller.updateUser)
  // .delete('/:userId', auth.authUser, controller.deleteUser)

module.exports = router;