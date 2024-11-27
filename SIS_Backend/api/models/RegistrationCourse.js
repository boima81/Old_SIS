/**
 * SemesterCourse.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "registration_courses",
  fetchRecordsOnUpdate: true,
  primaryKey: "id",
  attributes: {
    registration: {
      model: "registration",
      columnName: "registration_id",
    },
    course: {
      model: "course",
      columnName: "course_id",
    },
  },
};
