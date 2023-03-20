/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
	await knex.schema.createTable('tags', function (table) {
		table.increments('id').primary()
	  table.string('value', 20).unique().index()
	  table.string('type', 20)
		table.integer('user_id')
			.references('id')
			.inTable('users')
	  table.timestamps(false, true)
		table.timestamp('deleted_at').nullable()
  })
	await knex.schema.createTable('log_tags', table => {
		table
			.integer('log_id')
			.references('id')
			.inTable('logs')
		table
			.integer('tag_id')
			.references('id')
			.inTable('tags')
	})
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable('tags')
  await knex.schema.dropTable('log_tags')
}