import { USER_ID } from './0_addUser.js'
import { SEED_TAG_TYPE } from './1_addTagType.js'

export const ENUM_TOOL_ID = SEED_TAG_TYPE.findIndex((item) => item.value === 'tool') + 1
export const ENUM_LANGUAGE_ID = SEED_TAG_TYPE.findIndex((item) => item.value === 'language') + 1
export const ENUM_METHOD_ID = SEED_TAG_TYPE.findIndex((item) => item.value === 'method') + 1
export const ENUM_FRAMEWORK_ID = SEED_TAG_TYPE.findIndex((item) => item.value === 'framework') + 1
export const ENUM_LIBRARY_ID = SEED_TAG_TYPE.findIndex((item) => item.value === 'library') + 1
export const ENUM_PROCESSOR_ID = SEED_TAG_TYPE.findIndex((item) => item.value === 'processor') + 1
export const ENUM_CUSTOM_ID = SEED_TAG_TYPE.findIndex((item) => item.value === 'custom') + 1

export const SEED_TAGS = [
  { value: 'python', type_id: ENUM_LANGUAGE_ID, user_id: USER_ID },
  { value: 'bash', type_id: ENUM_LANGUAGE_ID, user_id: USER_ID },
  { value: 'javascript', type_id: ENUM_LANGUAGE_ID, user_id: USER_ID },
  { value: 'js', type_id: ENUM_LANGUAGE_ID, user_id: USER_ID },
  { value: 'java', type_id: ENUM_LANGUAGE_ID, user_id: USER_ID },
  { value: 'c#', type_id: ENUM_LANGUAGE_ID, user_id: USER_ID },
  { value: 'c++', type_id: ENUM_LANGUAGE_ID, user_id: USER_ID },
  { value: 'css', type_id: ENUM_LANGUAGE_ID, user_id: USER_ID },
  { value: 'html', type_id: ENUM_LANGUAGE_ID, user_id: USER_ID },
  { value: 'docker', type_id: ENUM_TOOL_ID, user_id: USER_ID },
  { value: 'cicd', type_id: ENUM_TOOL_ID, user_id: USER_ID },
  { value: 'container', type_id: ENUM_TOOL_ID, user_id: USER_ID },
  { value: 'react', type_id: ENUM_LIBRARY_ID, user_id: USER_ID },
  { value: 'vue', type_id: ENUM_FRAMEWORK_ID, user_id: USER_ID },
  { value: 'angular', type_id: ENUM_FRAMEWORK_ID, user_id: USER_ID },
  { value: 'scrum', type_id: ENUM_METHOD_ID, user_id: USER_ID },
  { value: 'agile', type_id: ENUM_METHOD_ID, user_id: USER_ID },
  { value: 'test', type_id: ENUM_METHOD_ID, user_id: USER_ID },
  { value: 'tdd', type_id: ENUM_METHOD_ID, user_id: USER_ID },
  { value: 'bdd', type_id: ENUM_METHOD_ID, user_id: USER_ID },
  { value: 'design', type_id: ENUM_METHOD_ID, user_id: USER_ID },
  { value: 'time', type_id: ENUM_METHOD_ID, user_id: USER_ID },
  { value: 'webpack', type_id: ENUM_PROCESSOR_ID, user_id: USER_ID },
  { value: 'vite', type_id: ENUM_TOOL_ID, user_id: USER_ID }
]

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('tag').del()
  await knex('tag').insert(SEED_TAGS)
}
