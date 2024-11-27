/**
 * Semester.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "section",
  fetchRecordsOnUpdate: true,
  primaryKey: "id",
  attributes: {
    sectionNumber: {
      type: "number",
      required: true,
      columnName: "section_number",
    },
    sectionLimits: {
      type: "number",
      required: true,
      columnName: "section_limits",
    },
    createdBy: {
      model: "user",
      columnName: "created_by",
    },
  },
};
