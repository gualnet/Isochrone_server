const db = require('../../database');
const services = require('./services');

module.exports = {
  login: async (req, res, next) => {
    // console.log('BODY', req.body);
    
    try {
      const userFound = await db.models.Users.findOne({
        where: { ...req.body },
      });
      const userInfo = services.cleanUserInfo(userFound);
      res.status(200).send(userInfo);
    } catch (error) {
      console.log('[ERROR]', error);
      return res.status(500).send({ error: 'Nothing to see here !' });
    }
  },

  signUp: async (req, res, next) => {
    
    
    res.status(200).send('updateUser');
  },

  getUserOwnInfo: async (req, res, next) => {

    if (req.user.id !== req.params.userId) {
      console.log('[ERROR] auth users/getUserById')
      return res.status(403).send('not auth');
    }

    try {
      const userFound = await services.getUserById(req.params.userId)
      const userInfo = services.cleanUserInfo(userFound);
      return res.status(200).send({ user: userInfo });
    } catch (error) {
      console.log();
      return res.status(500).send('nothing here')
    }

  },
};
