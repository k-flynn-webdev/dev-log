export async function up(knex) {
  await knex.schema.alterTable('users', function (table) {
    table.dropColumn('text')
    table.string('email').unique().nullable()
    table.string('password')
    table.string('githubId').unique().nullable()
  })
}

export async function down(knex) {
  await knex.schema.alterTable('users', function (table) {
    table.string('text')
    table.dropColumn('email')
    table.dropColumn('password')
    table.dropColumn('githubId')
  })
}
