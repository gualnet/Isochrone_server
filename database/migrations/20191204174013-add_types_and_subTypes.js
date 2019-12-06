'use strict';

const eventTypes = require('../../api/events/models/eventTypes');

module.exports = {
  /**
  * @typedef {import('sequelize').Sequelize} Sequelize
  * @typedef {import('sequelize').QueryInterface} QueryInterface
  * @param {Sequelize} Sequelize
  * @param {QueryInterface} queryInterface
  * @returns
  */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('event_types', [
      { name: eventTypes.type.RESAURANT },
      { name: eventTypes.type.BAR },
    ]);

    let subTypesArr = [];
    Object.keys(eventTypes.subType).map((key) => subTypesArr.push({ name: eventTypes.subType[key] }));
    await queryInterface.bulkInsert('event_sub_types', subTypesArr);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('event_types', null, {});
  }
};
