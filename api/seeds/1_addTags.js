const USER_ID = 1
const ENUM_TOOL = 'tool'
const ENUM_LANGUAGE = 'language'
const ENUM_METHOD = 'method'
const ENUM_FRAMEWORK = 'framework'
const ENUM_LIBRARY = 'library'
const ENUM_PROCESSOR = 'processor'

export const SEED_TAGS = [
  { value: 'python', type: ENUM_LANGUAGE, user_id: USER_ID },
  { value: 'bash', type: ENUM_LANGUAGE, user_id: USER_ID },
  { value: 'javascript', type: ENUM_LANGUAGE, user_id: USER_ID },
  { value: 'js', type: ENUM_LANGUAGE, user_id: USER_ID },
  { value: 'java', type: ENUM_LANGUAGE, user_id: USER_ID },
  { value: 'c#', type: ENUM_LANGUAGE, user_id: USER_ID },
  { value: 'c++', type: ENUM_LANGUAGE, user_id: USER_ID },
  { value: 'css', type: ENUM_LANGUAGE, user_id: USER_ID },
  { value: 'html', type: ENUM_LANGUAGE, user_id: USER_ID },
  { value: 'docker', type: ENUM_TOOL, user_id: USER_ID },
  { value: 'cicd', type: ENUM_TOOL, user_id: USER_ID },
  { value: 'container', type: ENUM_TOOL, user_id: USER_ID },
  { value: 'react', type: ENUM_LIBRARY, user_id: USER_ID },
  { value: 'vue', type: ENUM_FRAMEWORK, user_id: USER_ID },
  { value: 'angular', type: ENUM_FRAMEWORK, user_id: USER_ID },
  { value: 'scrum', type: ENUM_METHOD, user_id: USER_ID },
  { value: 'agile', type: ENUM_METHOD, user_id: USER_ID },
  { value: 'test', type: ENUM_METHOD, user_id: USER_ID },
  { value: 'tdd', type: ENUM_METHOD, user_id: USER_ID },
  { value: 'bdd', type: ENUM_METHOD, user_id: USER_ID },
  { value: 'design', type: ENUM_METHOD, user_id: USER_ID },
  { value: 'time', type: ENUM_METHOD, user_id: USER_ID },
  { value: 'webpack', type: ENUM_PROCESSOR, user_id: USER_ID },
  { value: 'vite', type: ENUM_TOOL, user_id: USER_ID }
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
