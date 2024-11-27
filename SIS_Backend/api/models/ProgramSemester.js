/**
 * ProgramSemester.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "program_semester",
  fetchRecordsOnUpdate: true,
  primaryKey: "id",
  attributes: {
    semester: {
      model: "semester",
      columnName: "semester_id",
    },
    program: {
      model: "program",
      columnName: "program_id",
    },
  },
};
