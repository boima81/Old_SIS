/**
 * RegistrationsFees.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "registration_fees",
  fetchRecordsOnUpdate: true,
  primaryKey: "id",
  attributes: {
    name: {
      type: "string",
      required: true,
    },
    amount: {
      type: "number",
      required: true,
      columnType: "decimal(10,2)",
    },
    createdBy: {
      model: "user",
      columnName: "created_by",
    },
  },
};
