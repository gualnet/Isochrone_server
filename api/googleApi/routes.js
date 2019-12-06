const router = require('express').Router({ mergeParams: true });
const controller = require('./controller');

router
  .get('/poi', controller.getAllPoiInADelimitedArea)
  // .post('/barycentre', controller.getBarycentre);


module.exports = router;