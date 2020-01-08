const router = require('express').Router({ mergeParams: true });
const healthTest = require('./health/health.js');
const googleApi = require('./googleApi/routes');
const events = require('./events/routes');
const users = require('./users/routes');
const chats = require('./chats/routes');

router.get('/health', healthTest.heathyResponse);
router.use('/external', googleApi);
router.use('/events', events);
router.use('/users', users);
router.use('/chats', chats);

module.exports = router;