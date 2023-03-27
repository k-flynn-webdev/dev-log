const USER_ID = 1

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('user').del()
  await knex('user').insert([
    { id: USER_ID, name: 'user', email: 'testemail@testemail123.com' },
  ]);
};
