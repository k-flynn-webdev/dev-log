/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('logs', function (table) {
		table.increments('id').primary()
	  table.string('value', 150)
	  table.integer('user_id')
			.references('id')
			.inTable('users')
	  table.timestamps(false, true)
		table.timestamp('deleted_at').nullable()
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable('logs')
}