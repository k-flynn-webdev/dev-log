const USER_ID = 1

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('user').del()
  await knex('user').insert([
    { id: USER_ID, name: 'user', email: 'testtest@testtesttest.com' },
  ]);
};
