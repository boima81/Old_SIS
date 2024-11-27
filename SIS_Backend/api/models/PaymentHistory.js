/**
 * Program.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "payment_history",
  fetchRecordsOnUpdate: true,
  primaryKey: "id",
  attributes: {
    amount: {
      type: "number",
      defaultsTo: 0,
    },
    registration_id: {
      model: "registration",
    },
    semester_id: {
      model: "semester",
    },
    added_by: {
      model: "user",
    },
    receipt_file: {
      type: "string",
    },
  },
};
