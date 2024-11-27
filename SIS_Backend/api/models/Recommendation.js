/**
 * Recommendation.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "recommendation",
  fetchRecordsOnUpdate: true,
  primaryKey: "id",
  attributes: {
    first_name: {
      type: "string",
      required: true,
    },

    last_name: {
      type: "string",
      required: true,
    },
    email: {
      type: "string",
      required: true,
      isEmail: true,
    },
    phone_number: {
      type: "string",
      required: true,
    },
    phone_number_country_code: {
      type: 'string',
      required: true,
    },
    uploadLatter: {
      model: "fileUpload",
      columnName: "upload_letter",
    },
    applicationId: {
      model: "application",
      columnName: "application_id",
    },
  },
  customToJSON: function () {
    const data = {
      ...this,
      displayName: `${this.first_name} ${this.middle_name} ${this.last_name}`,
      photoURL: "",
      shortcuts: [],
    };
    // Return a shallow copy of this record with the password and ssn removed.
    return _.omit(data, ["password"]);
  },
};
