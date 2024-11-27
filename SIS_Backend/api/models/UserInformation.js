/**
 * UserInformation.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "user_information",
  fetchRecordsOnUpdate: true,
  primaryKey: "id",
  attributes: {
    first_name: {
      type: "string",
      required: true,
    },
    middle_name: {
      type: "string",
      required: false,
    },
    last_name: {
      type: "string",
      required: true,
    },
    phone_number: {
      type: "string",
      required: true,
    },
    phone_number_country_code: {
      type: "string",
      required: false,
    },
    country: {
      type: "string",
      required: false,
    },
    city: {
      type: "string",
      required: false,
    },
    gender: {
      type: "string",
      required: false,
    },
    nationality: {
      type: "string",
      required: false,
    },
    date_of_birth: {
      type: "ref",
      columnType: "date",
      required: false,
    },
    maritalStatus: {
      type: "string",
      required: false,
      allowNull: true,
    },
    physicalDisability: {
      type: "boolean",
      defaultsTo: false,
      allowNull: true,
    },
    kInUserFullName: {
      type: "string",
      required: false,
      columnName: "kin_userFullName",
      allowNull: true,
    },
    kInResidentialAddress: {
      type: "string",
      required: false,
      columnName: "kin_residentialAddress",
      allowNull: true,
    },
    kInRelationship: {
      type: "string",
      required: false,
      columnName: "kin_relationship",
      allowNull: true,
    },
    user: {
      collection: "user",
      via: "userInformationId",
    },
    student: {
      model: "student",
      columnName: "student_id",
    },
  },
  customToJSON: function () {
    const data = {
      ...this,
      displayName: `${this.first_name} ${this.middle_name} ${this.last_name}`,
      photoURL: "",
      shortcuts: [],
      address: `${this.city},${this.country}`,
    };
    // Return a shallow copy of this record with the password and ssn removed.
    return _.omit(data, ["password"]);
  },
};
