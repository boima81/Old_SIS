/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("program", (table) => {
    table.increments("id").primary();
    table.string("name", 200).notNullable();
    table.text("description", 500).notNullable();
    table.boolean("active").defaultTo(true);
    table
      .integer("created_by")
      .unsigned()
      .index()
      .references("id")
      .inTable("user");

    // table
    //   .integer("semester_id")
    //   .unsigned()
    //   .index()
    //   .references("id")
    //   .inTable("semester");
    table.dateTime("createdAt").notNullable().defaultTo(knex.fn.now());
    table.dateTime("updatedAt").notNullable().defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("program");
};
