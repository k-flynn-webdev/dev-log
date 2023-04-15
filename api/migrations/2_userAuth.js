/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.alterTable('user', function (table) {
    table.boolean('isVerified').defaultTo(false).notNullable()
    table.string('verifyToken').defaultTo(null).nullable()
    table.bigInteger('verifyExpires').defaultTo(null).nullable()
    table.string('verifyShortToken').defaultTo(null).nullable()
    table.string('verifyChanges').defaultTo(null).nullable()
    table.string('resetToken').defaultTo(null).nullable()
    table.string('resetShortToken').defaultTo(null).nullable()
    table.bigInteger('resetExpires').defaultTo(null).nullable()
    table.integer('resetAttempts').defaultTo(0).notNullable()
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
    table.dropColumn('verifyShortToken')
    table.dropColumn('verifyChanges')
    table.dropColumn('resetToken')
    table.dropColumn('resetShortToken')
    table.dropColumn('resetExpires')
    table.dropColumn('resetAttempts')
  })
}
