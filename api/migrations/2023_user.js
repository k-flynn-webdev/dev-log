export async function up(knex) {
  await knex.schema.createTable('users', (table) => {
    table.increments('id')
    table.string('name', 50)
	  table.string('email', 120).unique().nullable().index()
    table.string('password')
    table.string('githubId').unique().nullable()
    table.string('googleId').unique().nullable()
		table.timestamp('last_login').nullable()
		table.timestamp('created_at')
	  table.timestamps(false, true)
		table.timestamp('deleted_at').nullable().defaultTo(null)
  })
}

export async function down(knex) {
  await knex.schema.dropTable('users')
}
