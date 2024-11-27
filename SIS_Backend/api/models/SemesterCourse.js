/**
 * SemesterCourse.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "semester_course",
  fetchRecordsOnUpdate: true,
  primaryKey: "id",
  attributes: {
    semester: {
      model: "semester",
      columnName: "semester_id",
    },
    course: {
      model: "course",
      columnName: "course_id",
    },
  },
};
