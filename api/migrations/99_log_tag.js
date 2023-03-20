/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
	await knex.schema.createTable('log_tag', table => {
		table.integer('log_id').unsigned()
		table
			.foreign('log_id')
			.references('id')
			.inTable('log')
		table.integer('tag_id').unsigned()
		table
			.foreign('tag_id')
			.references('id')
			.inTable('tag')
	})
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable('log_tag')
}