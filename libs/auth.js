const db = require('../database');

module.exports = {
  authUser: async (req, res, next) => {
    console.log('\n=====authUser=====');
    // console.log('req.body', req.body);
    // console.log('req.headers', req.headers);

    try {
      // get the token
      if (!req.headers.authorization) {
        // if the authorization field is not provided in the headers
        return res.status(401).send();
      }

      // search for the user
      const [ , userToken] = req.headers.authorization.split(' ');
      const userFound = await db.models.Users.findOne({
        where: { token: userToken },
      });

      if (!userFound) {
        // if no user is related to the provided token
        return res.status(401).send();
      }
      // put the user info in req.user
      req.user = userFound.dataValues;

      return next();
    } catch (error) {
      next(error);
    }
  }
};