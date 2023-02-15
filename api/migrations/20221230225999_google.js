export async function up(knex) {
  await knex.schema.alterTable('users', function (table) {
    table.string('googleId').unique().nullable()
  })
}

export async function down(knex) {
  await knex.schema.alterTable('users', function (table) {
    table.dropColumn('googleId')
  })
}
