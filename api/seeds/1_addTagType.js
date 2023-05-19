import { USER_ID } from './0_addUser.js'

export const SEED_TAG_TYPE = [
  { value: 'tool', user_id: USER_ID },
  { value: 'language', user_id: USER_ID },
  { value: 'method', user_id: USER_ID },
  { value: 'framework', user_id: USER_ID },
  { value: 'library', user_id: USER_ID },
  { value: 'processor', user_id: USER_ID },
  { value: 'custom', user_id: USER_ID }
]

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('tag_type').del()
  await knex('tag_type').insert(SEED_TAG_TYPE)
}
