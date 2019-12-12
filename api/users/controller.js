const Sequelize = require('sequelize');
const db = require('../../database');
const services = require('./services');

const Op = Sequelize.Op;

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

  register: async (req, res, next) => {
    try {
      const newUser = await db.models.Users.create({
        token: 0,
        firstName: null,
        lastName: null,
        email: req.body.email,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber,
        localisation: null,
      });
      console.log('NEW USER', newUser.dataValues);
      return res.status(200).send('ok');
    } catch (error) {
      console.error(error);
      return res.status(500).send('INTERNAL ERROR - register');
    }
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

  checkContactList: async (req, res, next) => {
    const contactList = req.body;
    const contactNumbers = [];
    for (const contact of contactList) {
      console.log('\n-------------', contact.name);
      // console.log(contact);
      for (const numbers of contact.phoneNumbers) {
        console.log(numbers.digits);
        contactNumbers.push(numbers.digits);
      }
    }
    console.log('contactNumbers', contactNumbers);
    const test = {
      where: {
        phoneNumber: {
          [Op.or]: [...contactNumbers],
        }
      }
    };
    console.log('test', test);

    try {

      const contactsFound = await db.models.Users.findAll(test);
      console.log('\n\n');
      const contactsArr = [];
      for (const contact of contactsFound) {
        console.log(contact.dataValues);
        contactsArr.push(services.cleanUserInfo(contact.dataValues));
      }


      return res.status(200).send(contactsArr);
    } catch (error) {
      return res.status(500).send('checkContactList');
    }
  },
};
