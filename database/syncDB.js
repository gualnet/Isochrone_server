const db = require('./index');

const sync = async () => {
  try {
    // await db.sequelize.sync();
  } catch (error) {
    console.error('[ERROR] SEQUELIZE SYNC\n', error);
  }
};

module.exports = sync();


// module.exports = db.sequelize
//   // This disables foreign key constraint during migration
//   .query('SET FOREIGN_KEY_CHECKS = 0', { raw: true })
//   // Sync every table in the db object
//   .then(() => db.sequelize.sync({ force: true }))
//   // This re-enables the foreign key check
//   .then(() => db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', { raw: true }));
// // .then(() => process.exit(0));
