const router = require('express').Router({ mergeParams: true });

const auth = require('../../libs/auth');
const controller = require('./controller');

router
  .post('/place/search', auth.authUser, controller.getAllPoiInADelimitedArea)
  .post('/place/details',
        // auth.authUser,
        controller.getPlaceDetailsTEST)


module.exports = router;