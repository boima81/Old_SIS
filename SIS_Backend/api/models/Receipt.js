/**
 * Program.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "receipt",
  fetchRecordsOnUpdate: true,
  primaryKey: "id",
  attributes: {
    feeType: {
      type: "string",
      required: true,
      columnName: "fee_type",
    },
    filePath: {
      type: "string",
      columnName: "file_path",
    },
    registration: {
      model: "registration",
      columnName: "registration_id",
    },
    fileName: {
      type: "string",
      required: false,
      columnName: "file_name",
    },
    fileId: {
      model: "fileUpload",
      columnName: "file",
      required: false,
    },
    paymentId: {
      model: "payment",
      columnName: "payment_id",
      required: false,
    },
    createdBy: {
      model: "user",
      columnName: "created_by",
    },
  },
};
