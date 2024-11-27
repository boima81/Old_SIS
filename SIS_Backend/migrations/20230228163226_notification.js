/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("notification", (table) => {
    table.increments("id").primary();
    table.string("message", 1000);
    table.string("notification_type");
    table.boolean("mark_as_read").defaultTo(false);
    table.string("notification_key");
    table.string("redirect_url");
    table.string("role_name");
    table
      .integer("created_for")
      .unsigned()
      .index()
      .references("id")
      .inTable("user");

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
  return knex.schema.dropTableIfExists("notification");
};
