/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("setting_bank_information", (table) => {
    table.increments("id").primary();
    table.boolean("offline_payment").defaultTo(true);
    table.string("bank_name");
    table.string("account_name");
    table.string("account_number");
    table.string("swift_code");
    table.dateTime("createdAt").notNullable().defaultTo(knex.fn.now());
    table.dateTime("updatedAt").notNullable().defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("setting_bank_information");
};
