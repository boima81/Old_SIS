/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("application_setting", (table) => {
    table.text("privacy_policy", 20000);
    table.text("services", 20000);
    table.text("login_page_content", 5000);
    table.text("registration_page_content", 5000);
    table.text("forgot_password_page_content", 5000);
    table.text("reset_page_content", 5000);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("application_setting", (table) => {
    table.dropColumn("privacy_policy");
    table.dropColumn("services");
    table.dropColumn("login_page_content");
    table.dropColumn("registration_page_content");
    table.dropColumn("forgot_password_page_content");
    table.dropColumn("reset_page_content");
  });
};
