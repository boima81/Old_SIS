/**
 * Payment.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "balance_fee",
  fetchRecordsOnUpdate: true,
  primaryKey: "id",
  attributes: {
    approved_payment: {
      type: "boolean",
      required: false,
      allowNull: true,
    },
    user: {
      model: "user",
      columnName: "created_by",
    },
    reviewBy: {
      model: "user",
      columnName: "review_by",
    },
    application: {
      model: "application",
      columnName: "application_id",
    },
    registration: {
      model: "registration",
      columnName: "registration_id",
    },

    balance_pay: {
      type: "number",
      required: true,
      columnType: "float",
    },
    transaction_id: {
      type: "string",
      required: false,
    },
    payment_type: {
      type: "string",
      required: true,
    },
    balance_fees_status: {
      type: "string",
      required: true,
    },
  },
};
