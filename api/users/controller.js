const db = require('../../database');
const services = require('./services');

module.exports = {
  Login: async (req, res, next) => {
    
    
    res.status(200).send('createNewUser');
  },

  SignUp: async (req, res, next) => {
    
    
    res.status(200).send('updateUser');
  },

  getUserOwnInfo: async (req, res, next) => {

    if (req.user.id !== req.params.userId) {
      console.log('[ERROR] auth users/getUserById')
      return res.status(400).send('not auth');
    }

    const userFound = await db.models.Users.findOne({
      where: { id: req.params.userId }
    });

    const { 
      id, 
      token,
      firstName,
      lastName,
      email,
      phoneNumber,
      localisation,
      createdAt,
    } = userFound;
    
    res.status(200).send({ 
      id, 
      token,
      firstName,
      lastName,
      email,
      phoneNumber,
      localisation,
      createdAt,
    });
  },
};
