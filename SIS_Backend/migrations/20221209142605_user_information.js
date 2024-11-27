/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("user_information", (table) => {
    table.increments("id").primary();
    table.string("first_name", 50).notNullable();
    table.string("middle_name", 50).nullable();
    table.string("last_name", 50).notNullable();
    table.string("phone_number", 100).notNullable();
    table.string("country", 200).nullable();
    table.string("city", 200).nullable();
    table.string("gender", 20).nullable();
    table.string("nationality", 200).nullable();
    table.date("date_of_birth").nullable();
    table
      .dateTime("createdAt")
      .notNullable()
      .defaultTo(knex.fn.now());
    table.dateTime("updatedAt").notNullable().defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("user_information");
};
