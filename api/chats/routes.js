const router = require('express').Router({ mergeParams: true });
const controller = require('./controller');
const auth = require('../../libs/auth');

router
  .post('/:chatId/message', auth.authUser, controller.saveNewMessage)

module.exports = router;