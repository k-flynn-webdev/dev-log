/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
	await knex.schema.createTable('tag', function (table) {
		table.increments('id').primary()
	  table.string('value', 20).unique().index()
	  table.string('type', 20)
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
  await knex.schema.dropTable('tag')
}