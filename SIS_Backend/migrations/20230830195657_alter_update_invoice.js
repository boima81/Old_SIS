/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.alterTable("invoice", (table) => {
        table
            .integer("registration_id")
            .unsigned()
            .index()
            .references("id")
            .inTable("registration");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.alterTable("invoice", (table) => {
        table.dropColumn("registration_id");
    });
};
