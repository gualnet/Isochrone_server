const router = require('express').Router({ mergeParams: true });
const controller = require('./controller');
const auth = require('../../libs/auth');

router
  .get('/', auth.authUser, controller.getAllUserEvents)
  .get('/types', controller.getEventTypes)
  .get('/:eventId', controller.getEventById)
  .post('/:eventId/position', auth.authUser, controller.updateUserPositonInEvent)
  .post('/', auth.authUser, controller.createNewEvent)
  .delete('/:eventId', controller.deleteEvent)

module.exports = router;