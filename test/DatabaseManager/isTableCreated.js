// process.env.NODE_ENV = 'test';
//
// const { assert } = require('chai');
// const config = require('../../config');
// const DatabaseManager = require('../../models/DatabaseManager');
//
// let knex;
//
// describe('is Table Created', () => { // eslint-disable-line no-undef, max-lines-per-function
//
//   before(async () => { // eslint-disable-line no-undef
//     DatabaseManager.setKnex(config);
//     knex = DatabaseManager.getKnex();
//     const results = await knex.raw(`SELECT * FROM information_schema.tables WHERE  table_name = '${DatabaseManager.DEFAULT_NAME}'`);
//     if (results.rows.length > 0) await knex.raw(`DROP TABLE ${DatabaseManager.DEFAULT_NAME}`);
//   });
//
//   it('it is not created', async () => { // eslint-disable-line no-undef
//     const exists = await DatabaseManager.isTableCreated();
//     assert.equal(exists, false);
//   });
//
//   it('it is created', async () => { // eslint-disable-line no-undef
//     await knex.raw(`CREATE TABLE ${DatabaseManager.DEFAULT_NAME} (id SERIAL)`);
//     const exists = await DatabaseManager.isTableCreated();
//     assert.equal(exists, true);
//   });
//
//   after(async () => { // eslint-disable-line no-undef
//     await knex.raw(`DROP TABLE ${DatabaseManager.DEFAULT_NAME}`);
//   });
//
// });
