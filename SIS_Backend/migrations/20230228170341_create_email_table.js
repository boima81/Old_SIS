/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("mail_setting", (table) => {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.string("subject").notNullable();
    table.text("html").notNullable();
    table.string("key").nullable();
    table.string("header").nullable();
    table.string("footer").nullable();
    table
      .integer("created_by")
      .unsigned()
      .index()
      .references("id")
      .inTable("user")
      .nullable();
    table
      .integer("updated_by")
      .unsigned()
      .index()
      .references("id")
      .inTable("user")
      .nullable();
    table.dateTime("createdAt").notNullable().defaultTo(knex.fn.now());
    table.dateTime("updatedAt").notNullable().defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("mail_setting");
};
