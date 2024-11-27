/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("receipt", (table) => {
    table.increments("id").primary();
    table.string("fee_type");
    table.string("file_name");
    table
      .integer("file")
      .unsigned()
      .index()
      .references("id")
      .inTable("file_upload");

    table.string("file_path");
    table
      .integer("registration_id")
      .unsigned()
      .index()
      .references("id")
      .inTable("registration");

    table
      .integer("payment_id")
      .unsigned()
      .index()
      .references("id")
      .inTable("payment");

    table
      .integer("created_by")
      .unsigned()
      .index()
      .references("id")
      .inTable("user");

    table.dateTime("createdAt").notNullable().defaultTo(knex.fn.now());
    table.dateTime("updatedAt").notNullable().defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("receipt");
};
