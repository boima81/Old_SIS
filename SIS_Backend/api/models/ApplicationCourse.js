/**
 * SemesterCourse.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "application_courses",
  fetchRecordsOnUpdate: true,
  primaryKey: "id",
  attributes: {
    application: {
      model: "application",
      columnName: "application_id",
    },
    course: {
      model: "course",
      columnName: "course_id",
    },
  },
};
