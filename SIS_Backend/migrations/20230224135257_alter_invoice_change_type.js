/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("invoice", (table) => {
      table.decimal("amount_paid", 10, 2).defaultTo(0).alter();
      
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("invoice", (table) => {
    table.integer("amount_paid");
  });
};
