/**
 * Semester.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "transcript",
  fetchRecordsOnUpdate: true,
  primaryKey: "id",
  attributes: {
    student_id: {
      model: "student",
    },
    // generated_date: {
    //   type: "ref",
    //   columnType: "datetime",
    //   allowNull: true,
    // },
    file_link: {
      type: "string",
      columnType: "text",
      allowNull: true,
    },
  },
};
