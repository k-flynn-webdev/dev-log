const USER_ID = 1
const ENUM_TOOLS = "tools"
const ENUM_LANGUAGE = "language"
const ENUM_METHODS = "methods"

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('tag').del()
  await knex('tag').insert([
    { value: 'python', type: ENUM_LANGUAGE, user_id: USER_ID },
    { value: 'bash', type: ENUM_LANGUAGE, user_id: USER_ID },
    { value: 'javascript', type: ENUM_LANGUAGE, user_id: USER_ID },
    { value: 'js', type: ENUM_LANGUAGE, user_id: USER_ID },
    { value: 'java', type: ENUM_LANGUAGE, user_id: USER_ID },
    { value: 'c#', type: ENUM_LANGUAGE, user_id: USER_ID },
    { value: 'c++', type: ENUM_LANGUAGE, user_id: USER_ID },
    { value: 'docker', type: ENUM_TOOLS, user_id: USER_ID },
    { value: 'cicd', type: ENUM_TOOLS, user_id: USER_ID },
    { value: 'container', type: ENUM_TOOLS, user_id: USER_ID },
    { value: 'react', type: ENUM_TOOLS, user_id: USER_ID },
    { value: 'vue', type: ENUM_TOOLS, user_id: USER_ID },
    { value: 'angular', type: ENUM_TOOLS, user_id: USER_ID },
    { value: 'scrum', type: ENUM_METHODS, user_id: USER_ID },
    { value: 'agile', type: ENUM_METHODS, user_id: USER_ID },
    { value: 'test', type: ENUM_METHODS, user_id: USER_ID },
    { value: 'tdd', type: ENUM_METHODS, user_id: USER_ID },
    { value: 'bdd', type: ENUM_METHODS, user_id: USER_ID },
    { value: 'design', type: ENUM_METHODS, user_id: USER_ID },
    { value: 'time', type: ENUM_METHODS, user_id: USER_ID },
  ]);
};
