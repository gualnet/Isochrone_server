
module.exports = (sequelize, DataTypes) => {
  const EventTypes = sequelize.define('EventTypes', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      // autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
    underscored: true,
    timestamps: false,
  });
  EventTypes.associate = function associate(models) {};
  return EventTypes;
};
