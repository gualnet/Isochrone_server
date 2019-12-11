const db = require('../../database');

module.exports = {
  cleanUserInfo: (rawUser) => {
    if (!rawUser) return null;
    const cleanUser = { 
      id: rawUser.id,
      token: rawUser.token,
      firstName: rawUser.firstName,
      lastName: rawUser.lastName,
      email: rawUser.email,
      phoneNumber: rawUser.phoneNumber,
      localisation: rawUser.localisation,
      createdAt: rawUser.createdAt,
    };

    return cleanUser;
  },

  getUserById: async (id) => {
    try {
      const userFound = await db.models.Users.findOne({
        where: { id }
      });
      return userFound;
    } catch (error) {
      throw error
    }
  },
};
