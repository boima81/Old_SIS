/**
 * Program.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "program",
  fetchRecordsOnUpdate: true,
  primaryKey: "id",
  attributes: {
    name: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: false,
    },
    active: {
      type: "boolean",
      defaultsTo: true,
    },
    createdBy: {
      model: "user",
      columnName: "created_by",
    },
    // semester: {
    //   model: "semester",
    //   columnName: "semester_id",
    // },
    semesters: {
      collection: "semester",
      via: "program",
      through: "programsemester",
    },
  },
};
