'use strict';

const eventTypes = require('../../libs/enum/eventTypes');

module.exports = {
  /**
  * @typedef {import('sequelize').Sequelize} Sequelize
  * @typedef {import('sequelize').QueryInterface} QueryInterface
  * @param {Sequelize} Sequelize
  * @param {QueryInterface} queryInterface
  * @returns
  */
  up: async (queryInterface, Sequelize) => {
    try {
      let typesArr = [];
      let subTypesArr = [];
      let typeId = 1;
      for (const i in eventTypes) {
        typesArr.push({
          id: typeId,
          name: eventTypes[i].type,
        });
        Object.keys(eventTypes[i].subType).map((key) => {
          subTypesArr.push({
            type_id: typeId,
            name: eventTypes[i].subType[key],
          });
        });
        typeId++;
      }
      await queryInterface.bulkInsert('event_types', typesArr);
      await queryInterface.bulkInsert('event_sub_types', subTypesArr);
    } catch (error) {
      console.error(error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('event_types', null, {});
  }
};
