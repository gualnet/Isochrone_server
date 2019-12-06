'use strict';

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const models = {
  Users: sequelize.import('./users'),
  Events: sequelize.import('./events'),
  EventTypes: sequelize.import('./eventTypes'),
  EventSubTypes: sequelize.import('./eventSubTypes'),
  UserEventJoin: sequelize.import('./userEventJoin'),
};

Object.keys(models).forEach((table) => {
  if (models[table].associate) {
    models[table].associate(models);
  }
});

const db = {
  sequelize: sequelize,
  Sequelize: Sequelize,
  models: models,
};

module.exports = db;
