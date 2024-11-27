/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("course", (table) => {
    table.integer("course_no");
    table.string("course_category");
    table
      .integer("section_id")
      .unsigned()
      .index()
      .references("id")
      .inTable("section");
    table
      .integer("instructor_id")
      .unsigned()
      .index()
      .references("id")
      .inTable("instructor");
    table.json("schedule");
    table.time("course_time");
    table.string("classroom");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("course", (table) => {
    table.dropColumn("course_no");
    table.dropColumn("course_category");
    table.dropColumn("section_id");
    table.dropColumn("instructor_id");
    table.dropColumn("schedule");
    table.dropColumn("course_time");
    table.dropColumn("classroom");
  });
};
