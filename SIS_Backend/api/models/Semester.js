/**
 * Semester.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "semester",
  fetchRecordsOnUpdate: true,
  primaryKey: "id",
  attributes: {
    name: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
    active: {
      type: "boolean",
      defaultsTo: false,
    },
    startDate: {
      type: "ref",
      columnType: "date",
      columnName: "start_date",
      required: true,
    },
    endDate: {
      type: "ref",
      columnType: "date",
      columnName: "end_date",
      required: true,
    },
    createdBy: {
      model: "user",
      columnName: "created_by",
    },
    courses: {
      collection: "course",
      via: "semester",
      through: "semestercourse",
    },
    programs: {
      collection: "program",
      via: "semester",
      through: "programsemester",
    },
  },
};
