const db = require('../../database');

module.exports = {
  createNewUser: async (req, res, next) => {
    
    
    res.status(200).send('createNewUser');
  },

  updateUser: async (req, res, next) => {
    
    
    res.status(200).send('updateUser');
  },

  deleteUser: async (req, res, next) => {
    
    
    res.status(200).send('deleteUser');
  },

  getUserById: async (req, res, next) => {
    // console.log('user', req.user)
    // console.log('userId', req.params)

    if (req.user.id !== req.params.userId) {
      console.log('[ERROR] auth users/getUserById')
      return res.status(400).send('not auth');
    }

    const userFound = await db.models.Users.findOne({
      where: { id: req.params.userId }
    });
    
    res.status(200).send({ user: userFound });
  },
};
