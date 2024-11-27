/**
 * Semester.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "instructor",
  fetchRecordsOnUpdate: true,
  primaryKey: "id",
  attributes: {
    name: {
      type: "string",
      required: true,
    },
    createdBy: {
      model: "user",
      columnName: "created_by",
    },
  },
};
