/**
 * Semester.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "payment_term",
  fetchRecordsOnUpdate: true,
  primaryKey: "id",
  attributes: {
    termName: {
      type: "string",
      required: true,
      columnName: "term_name",
    },
    term: {
      type: "number",
      required: true,
    },
    createdBy: {
      model: "user",
      columnName: "created_by",
    },
  },
};
