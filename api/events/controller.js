const db = require('../../database/index');
const service = require('./services');

module.exports = {
  createNewEvent: async (req, res, next) => {
    console.log('EVENT: CREATE', req.body);
    try {
      const event = await db.models.Events.create({
        ...req.body.event,
        userId: req.user.id,
      });
      // console.log('EVENT CREATED', event.dataValues);
      
      // for the event owner
      await db.models.UserEventJoin.create({
        userId: req.user.id,
        eventId: event.id,
        latitude: req.body.event.latitude,
        longitude: req.body.event.longitude,
      });

      // inscrire les participants a l'evenement en crant une relation dans la table user_events
      req.body.event.participantsList.map(async (participant) => {
        const randGeoloc = service.randomiseGeoloc([
          req.body.event.latitude,
          req.body.event.longitude
        ]);
        return await db.models.UserEventJoin.create({
            eventId: event.id,
            userId: participant.id,
            latitude: randGeoloc[0],
            longitude: randGeoloc[1],
          });
        }
      );

      // for each participant
      return res.status(200).send({ event });
    } catch (error) {
      console.log('\nreq.body.event', req.body.event)
      console.error('\n', error);
      return res.status(500).send({ error: 'something' });
    }

  },

  updateEvent: (req, res, next) => {
    console.log('EVENT: UPDATE');
    try {
      const eventData = req.body.event;
      const { eventId } = req.params;
      
      return res.status(200).send();
    } catch (error) {
      return res.status(500).send('not implemented');
    }

    return res.status(200).send(eventContainer[eventId - 1]);
  },
  
  deleteEvent: (req, res, next) => {
    console.log('EVENT: DELETE');
    try {
      const { eventId } = req.params;
      
      return res.status(200).send();
    } catch (error) {
      return res.status(500).send('not implemented');
    }
  },
  
  getAllUserEvents: async (req, res, next) => {
    console.log('EVENT: GET ALL');
    try {
      const foundUserEvents = await db.models.UserEventJoin.findAll({
        where: { userId: req.user.id },
        include: [{
          model: db.models.Events,
          as: 'event'

        }],
      });

      const userEvents = [];
      for (const item of foundUserEvents) {
        userEvents.push(item.event);
      }
      return res.status(200).send(userEvents);
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: 'an error'});
    }
  },
  
  getEventById: async (req, res, next) => {
    console.log('\nEVENT: GET BY ID');
    try {
      const { eventId } = req.params;
      // je recupere les infos sur l'evenement
      const eventFound = await db.models.Events.findOne({
        attributes: ['id', 'name', 'date', 'createdAt', 'eventTypeId', 'eventSubTypeId'],
        where: { id: eventId },
        include: [{
          model: db.models.Users,
          as: 'user',
        }],
      });
      if (!eventFound) {
        return res.status(404).send(null);
      }

      // je recupere les differents participants a l'evenement
      const eventUsersList = await db.models.UserEventJoin.findAll({
        attributes: ['longitude', 'latitude'],
        where: { eventId },
        include: [{
          model: db.models.Users,
          as: 'user',
        }],
      });

      // je reorganise la structure des data avant de les envoyer
      const participantsList = []
      for (item of eventUsersList) {
        participantsList.push({
          ...item.dataValues.user.dataValues,
          latitude: item.dataValues.latitude,
          longitude: item.dataValues.longitude,
        });
      }

      const event = {
        ...eventFound.dataValues,
        participantsList,
      };
      return res.status(200).send(event);
    } catch (error) {
      console.error(error);
      return res.status(500).send('');
    }
  },

  /**
   * return event types and sub types
   */
  getEventTypes: async (req, res, next) => {
    console.log('EVENT: GET TYPES');
    try {
      const foundEventTypes = await Promise.all([
        db.models.EventTypes.findAll(),
        db.models.EventSubTypes.findAll(),
      ]);
      return res.status(200).send({
        event_types: foundEventTypes[0],
        event_sub_types: foundEventTypes[1],
      });
    } catch (error) {
      return res.status(500).send({ error });
    }
    
  },

};
