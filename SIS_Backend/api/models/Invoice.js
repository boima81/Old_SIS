/**
 * Invoice.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

// Application of user
module.exports = {
  tableName: "invoice",
  fetchRecordsOnUpdate: true,
  primaryKey: "id",
  attributes: {
    total_amount: {
      type: "number",
      required: true,
    },
    invoice_number: {
      type: "string",
      required: false,
    },
    receipt_number: {
      type: "string",
      required: false,
    },
    amount_paid: {
      type: "number",
      required: false,
      defaultsTo: 0,
      columnType: "decimal(10,2)",
    },
    totalTerms: {
      type: "number",
      columnName: "total_terms",
      defaultsTo: 0,
    },
    paidBy: {
      model: "user",
      columnName: "paid_by",
    },
    paymentTerm: {
      model: "paymentTerms",
      columnName: "payment_term_id",
    },
    createdBy: {
      model: "user",
      columnName: "created_by",
    },
    registrationId: {
      collection: "registration",
      via: "invoiceId",
    },
    registration: {
      model: "registration",
      columnName: "registration_id",
    }
  },
  customToJSON: function () {
    const remainingBalance = (this.total_amount || 0) - (this.amount_paid || 0)
    const data = {
      ...this,
      remainingBalance: remainingBalance > 0 ? remainingBalance : 0,
      total_display_amount_paid: this.amount_paid > 0 ? this.amount_paid : 0,
      balance_overage: remainingBalance < 0 ? (-remainingBalance) : 0
    };
    // Return a shallow copy of this record with the password and ssn removed.
    return data;
  },
};
