/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("courses_fees", (table) => {
    table.decimal("application_fee_amount", 10, 2).defaultTo(0)
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("courses_fees", (table) => {
    table.dropColumn("application_fee_amount");
  });
};
