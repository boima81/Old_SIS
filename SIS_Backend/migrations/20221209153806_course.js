/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("course", (table) => {
    table.increments("id").primary();
    table.string("name", 200).notNullable();
    table.text("description", 500).notNullable();
    table.integer("course_credit")
    table.integer("per_credit_price").notNullable();
    table
      .integer("created_by")
      .unsigned()
      .index()
      .references("id")
      .inTable("user");
    table.boolean("active").defaultTo(true);
    table.dateTime("createdAt").notNullable().defaultTo(knex.fn.now());
    table.dateTime("updatedAt").notNullable().defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("course");
};
