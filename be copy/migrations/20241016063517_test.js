
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("test", (table) => {
        table.increments("id").primary(); //id column with auto-incrementing primary key
        table.string("title").notNullable(); //title column with type string
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists("test")
};
