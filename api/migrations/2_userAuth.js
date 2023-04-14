/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.alterTable('user', function (table) {
    table.boolean('isVerified').defaultTo(false).notNullable()
    table.string('verifyToken').defaultTo(null).nullable()
    table.timestamp('verifyExpires').defaultTo(null).nullable()
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.alterTable('user', (table) => {
    table.dropColumn('isVerified')
    table.dropColumn('verifyToken')
    table.dropColumn('verifyExpires')
  })
}
