/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("application", (table) => {
    table.increments("id").primary();
    table.text("goal_statement", 1200);
    table.boolean("is_approved").defaultTo(false);
    table.string("notes", 200).nullable();

    table
      .integer("student_id")
      .unsigned()
      .index()
      .references("id")
      .inTable("student");

    table
      .integer("review_by")
      .unsigned()
      .index()
      .references("id")
      .inTable("user")
      .nullable();

    table
      .integer("user_information_id")
      .unsigned()
      .index()
      .references("id")
      .inTable("user_information")
      .nullable();

    table
      .integer("program_id")
      .unsigned()
      .index()
      .references("id")
      .inTable("program")
      .nullable();
    table
      .integer("semester_id")
      .unsigned()
      .index()
      .references("id")
      .inTable("semester")
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
  return knex.schema.dropTableIfExists("application");
};
