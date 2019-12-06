
module.exports = (sequelize, DataTypes) => {
  const Events = sequelize.define('Events', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   notEmpty: true,
      // },
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
    underscored: true,
    timestamps: true,
    paranoid: true,
  });
  Events.associate = function (models) {
    Events.belongsTo(models.EventTypes, { as: 'event_type', onDelete: 'cascade' });
    Events.belongsTo(models.EventSubTypes, { as: 'event_sub_type', onDelete: 'cascade' });
    Events.belongsTo(models.Users, {  as: 'user', onDelete: 'cascade' });
  };
  return Events;
};
