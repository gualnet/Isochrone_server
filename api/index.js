const router = require('express').Router({ mergeParams: true });
const healthTest = require('./health/health.js');
const googleApi = require('./googleApi/routes');
const events = require('./events/routes');

router.get('/health', healthTest.heathyResponse);
router.use('/google', googleApi);
router.use('/events', events);

module.exports = router;