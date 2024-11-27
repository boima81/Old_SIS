/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("user_information", (table) => {
    table.string("maritalStatus");
    table.boolean("physicalDisability");
    table.string("kin_userFullName");
    table.string("kin_residentialAddress", 500);
    table.string("kin_relationship");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("user_information", (table) => {
    table.dropColumn("maritalStatus");
    table.dropColumn("physicalDisability");
    table.dropColumn("kin_userFullName");
    table.dropColumn("kin_residentialAddress");
    table.dropColumn("kin_relationship");
  });
};
