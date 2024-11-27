/**
 * ApplicationSettings.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "grade",
  fetchRecordsOnUpdate: true,
  primaryKey: "id",
  attributes: {
    grade_number: {
      type: "number",
      required: true,
    },
    grade_name: {
      type: "string",
      required: true,
    },
    grade_point: {
      type: "number",
      columnType: "float",
      required: true,
    },
    registration_id: {
      model: "registration",
    },
    course_id: {
      model: "course",
    },
    user_id: {
      model: "user",
    },
    review_by_id: {
      model: "user",
    },
  },
  //   customToJSON: function () {
  //     const data = {
  //       ...this,
  //       displayName: `${this.first_name} ${this.middle_name} ${this.last_name}`,
  //       photoURL: "",
  //       shortcuts: [],
  //     };
  //     // Return a shallow copy of this record with the password and ssn removed.
  //     return _.omit(data, ["password"]);
  //   },
};
