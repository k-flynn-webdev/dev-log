export async function up(knex) {
  await knex.schema.createTable('user', (table) => {
    table.increments('id').primary()
    table.string('name', 50)
	  table.string('email', 120).unique().index().nullable()
    table.string('password').nullable()
    table.string('githubId').unique().nullable()
    table.string('googleId').unique().nullable()
		table.timestamp('last_login').nullable()
		table.timestamp('created_at').defaultTo(knex.fn.now())
	  table.timestamps(false, true)
		table.timestamp('deleted_at').defaultTo(null).nullable()
  })
}

export async function down(knex) {
  await knex.schema.dropTable('user')
}
