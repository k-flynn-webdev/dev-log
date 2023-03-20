/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('log', function (table) {
		table.increments('id').primary()
	  table.string('value', 150)
		table.integer('user_id').unsigned()
	  table.foreign('user_id')
			.references('id')
			.inTable('user')
	  table.timestamps(false, true)
		table.timestamp('deleted_at').defaultTo(null).nullable()
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable('log')
}