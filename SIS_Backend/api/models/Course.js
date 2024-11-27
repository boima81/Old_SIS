/**
 * Course.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "course",
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
    course_id: {
      type: "string",
      required: true,
    },
    category: {
      type: "string",
      required: false,
      columnName: "course_category",
    },
    course_no: {
      type: "number",
      required: false,
    },
    course_credit: {
      type: "number",
      required: false,
      allowNull: true,
    },
    per_credit_price: {
      type: "number",
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
    semesters: {
      collection: "semester",
      via: "course",
      through: "semestercourse",
    },
    program: {
      model: "program",
      columnName: "program_id",
    },
    sections: {
      model: "sections",
      columnName: "section_id",
    },
    instructor: {
      model: "user",
      columnName: "instructor_user_id",
    },
    schedule: {
      type: "ref",
      required: false,
    },
    classroom: {
      type: "string",
      required: false,
      allowNull: true,
    },
    time: {
      type: "ref",
      required: false,
      columnName: "course_time",
    },
    last_time: {
      type: "ref",
      required: false,
      columnName: "course_last_time",
    },
    applications: {
      collection: "application",
      via: "course",
      through: "applicationcourse",
    },
    registrations: {
      collection: "registration",
      via: "course",
      through: "registrationcourse",
    },
    grade: {
      collection: "grade",
      via: "course_id",
    },
    price: {
      type: "number",
      defaultsTo: 0,
    },
    creditType: {
      type: "number", // 1= credit, 2=noCredit
      defaultsTo: 1,
    },
  },
};
