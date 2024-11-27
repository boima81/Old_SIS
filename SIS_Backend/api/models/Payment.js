/**
 * Payment.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "payment",
  fetchRecordsOnUpdate: true,
  primaryKey: "id",
  attributes: {
    approve_payment: {
      type: "boolean",
      required: false,
      allowNull: true,
    },
    user: {
      model: "user",
      columnName: "user_id",
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
    module_type: {
      type: "string",
      required: true,
    },
    amount: {
      type: "number",
      required: true,
    },
    transaction_id: {
      type: "string",
      required: true,
    },
    payment_type: {
      type: "string",
      required: true,
    },
    payment_status: {
      type: "string",
      required: true,
    },
    admin_payment_status: {
      type: "string",
      isIn: ["pending", "approved", "decline", "feedback"],
      defaultsTo: "pending",
    },
    comment: {
      type: "string",
      required: false,
      allowNull: true,
    },
  },
};
