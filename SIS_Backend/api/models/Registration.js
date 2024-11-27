/**
 * Application.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

// Application of user
module.exports = {
  tableName: "registration",
  fetchRecordsOnUpdate: true,
  primaryKey: "id",
  attributes: {
    is_approved: {
      type: "boolean",
      defaultsTo: false,
      allowNull: true,
    },
    is_completed: {
      type: "boolean",
      defaultsTo: false,
    },
    last_step_completed: {
      type: "number",
      required: true,
    },
    registration_status: {
      type: "string",
      isIn: ["pending", "approved", "feedback", "decline"],
      defaultsTo: "pending",
    },
    comment: {
      type: "string",
      required: false,
      allowNull: true,
    },
    reviewBy: {
      model: "user",
      columnName: "review_by",
    },
    createdBy: {
      model: "user",
      columnName: "created_by",
    },
    applicationId: {
      model: "application",
      columnName: "application_id",
    },
    userInformationId: {
      model: "userInformation",
      columnName: "user_information_id",
    },
    programId: {
      model: "program",
      columnName: "program_id",
    },
    semesterId: {
      model: "semester",
      columnName: "semester_id",
    },
    invoiceId: {
      model: "invoice",
      columnName: "invoice_id",
    },
    registrationFee: {
      model: "applicationFee",
      columnName: "registration_fee_id",
    },
    courses: {
      collection: "course",
      via: "registration",
      through: "registrationcourse",
    },
    offline_payment: {
      type: "boolean",
      defaultsTo: false,
    },
    isPaymentApprove: {
      type: "boolean",
      columnName: "is_payment_status",
      allowNull: true,
    },
    createdByAdmin: {
      model: "user",
      columnName: "created_by_admin",
    },
    updatedByAdmin: {
      model: "user",
      columnName: "updated_by_admin",
    },
    grade: {
      collection: "grade",
      via: "registration_id",
    },
  },
  customToJSON: function () {
    let invoice = {};
    let is_paid = false;
    if (this.invoiceId?.id) {
      invoice = this.invoiceId;
      is_paid = invoice?.amount_paid
        ? parseFloat(invoice?.amount_paid) > 0
        : false;
    }
    const data = {
      ...this,
      is_paid
      // is_amount_paid
    };
    // Return a shallow copy of this record with the password and ssn removed.
    return data;
  },
};
