
module.exports = (sequelize, DataTypes) => {
  const UserEventJoin = sequelize.define('UserEventJoin', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.DECIMAL(10, 5),
      allowNull: true,
    },
    latitude: {
      type: DataTypes.DECIMAL(10, 5),
      allowNull: true,
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
    underscored: true,
    timestamps: true,
    paranoid: true,
  });
  UserEventJoin.associate = function (models) {
    UserEventJoin.belongsTo(models.Users, {  as: 'user', onDelete: 'cascade' });
    UserEventJoin.belongsTo(models.Events, {  as: 'event', onDelete: 'cascade' });
  };
  return UserEventJoin;
};
