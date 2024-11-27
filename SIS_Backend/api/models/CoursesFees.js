/**
 * CoursesFees.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "courses_fees",
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
    },
    applicationAmount: {
      type: "number",
      required: true,
      columnType: "decimal(10,2)",
      columnName: "application_fee_amount",
    },
    createdBy: {
      model: "user",
      columnName: "created_by",
    },
  },
};
