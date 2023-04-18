const USER_ID = 1

export const USER_01 = { name: 'user', email: 'testtest@testtesttest.com' }

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('user').del()
  await knex('user').insert(USER_01)
}
