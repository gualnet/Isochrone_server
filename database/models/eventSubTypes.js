
module.exports = (sequelize, DataTypes) => {
  const EventSubTypes = sequelize.define('EventSubTypes', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
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
  EventSubTypes.associate = function associate(models) {
    EventSubTypes.belongsTo(models.EventTypes, { as: 'type', onDelete: 'cascade' });
  };
  return EventSubTypes;
};
