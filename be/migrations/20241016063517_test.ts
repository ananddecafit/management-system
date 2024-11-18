import { Knex } from "knex";

export async function up(knex: Knex) {
    return knex.schema.createTable("test", (table) => {
        table.increments("id").primary(); //id column with auto-incrementing primary key
        table.string("title").notNullable(); //title column with type string
    });
};

export async function down(knex: Knex) {
    return knex.schema.dropTableIfExists("test")
};
