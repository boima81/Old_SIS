/**
 * Application.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

// Application of user
module.exports = {
  tableName: "application",
  fetchRecordsOnUpdate: true,
  primaryKey: "id",
  attributes: {
    goal_statement: {
      type: "ref",
      required: false,
      // allowNull: true,
    },
    apply_scholarship: {
      type: "boolean",
      defaultsTo: false,
      allowNull: true,
    },
    is_approved: {
      type: "boolean",
      defaultsTo: false,
      allowNull: true,
    },
    is_completed: {
      type: "boolean",
      defaultsTo: false,
    },
    notes: {
      type: "string",
      required: false,
      allowNull: true,
    },
    last_step_completed: {
      type: "number",
      required: true,
    },
    application_status: {
      type: "string",
      isIn: ["pending", "approved", "feedback", "decline"],
      defaultsTo: "pending",
    },
    comment: {
      type: "string",
      required: false,
      allowNull: true,
    },
    condition: {
      type: "string",
      required: false,
      allowNull: true,
    },
    student: {
      model: "student",
      columnName: "student_id",
    },
    reviewBy: {
      model: "user",
      columnName: "review_by",
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
    applicationFee: {
      model: "applicationfee",
      columnName: "application_fee_id",
    },
    uploadLatter: {
      collection: "recommendation",
      via: "applicationId",
    },
    createdBy: {
      model: "user",
      unique: true,
      columnName: "created_by",
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
    recommendations: {
      collection: "recommendation",
      via: "applicationId",
    },
    applicationFile: {
      collection: "applicationFile",
      via: "applicationId",
    },
    courses: {
      collection: "course",
      via: "application",
      through: "applicationcourse",
    },
    createdByAdmin: {
      model: "user",
      columnName: "created_by_admin",
    },
    updatedByAdmin: {
      model: "user",
      columnName: "updated_by_admin",
    },
  },
  customToJSON: function () {
    const data = {
      ...this,
      goal_statement: this?.goal_statement || "",
    };
    // Return a shallow copy of this record with the password and ssn removed.
    return data;
  },
};
