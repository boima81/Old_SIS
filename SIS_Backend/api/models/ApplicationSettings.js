/**
 * ApplicationSettings.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "application_setting",
  fetchRecordsOnUpdate: true,
  primaryKey: "id",
  attributes: {
    application_name: {
      type: "string",
      required: true,
    },
    president_message: {
      type: "ref",
      required: false,
    },
    course_prefix: {
      type: "string",
      required: true,
    },
    application_color: {
      type: "string",
      required: true,
    },
    privacy_policy: {
      type: "ref",
      required: false,
    },
    services: {
      type: "ref",
      required: false,
    },
    login_page_content: {
      type: "ref",
      required: false,
    },
    registration_page_content: {
      type: "ref",
      required: false,
    },
    forgot_password_page_content: {
      type: "ref",
      required: false,
    },
    reset_page_content: {
      type: "ref",
      required: false,
    },
    registrationStarted: {
      type: "boolean",
      defaultsTo: false,
      columnName:"registration_started"
    },
    registrationSemester: {
      model: "semester",
      columnName:"semester_id"
    },
    registrationStartDate: {
      type: "ref",
      columnType: "date",
      columnName: "registration_start_date",
      required: false,
    },
    registrationEndDate: {
      type: "ref",
      columnType: "date",
      columnName: "registration_end_date",
      required: false,
    },
    logo: {
      model: "fileUpload",
    },
    favicon: {
      model: "fileUpload",
    },
    updatedBy: {
      model: "user",
      columnName: "updated_by",
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
