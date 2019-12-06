const router = require('express').Router({ mergeParams: true });
const controller = require('./controller');
const auth = require('../../libs/auth');

router
  .get('/')

module.exports = router;