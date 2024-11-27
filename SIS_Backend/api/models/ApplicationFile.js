/**
 * ApplicationFile.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "application_file",
  fetchRecordsOnUpdate: true,
  primaryKey: "id",
  attributes: {
    fileSectionType: {
      type: "string",
      columnName: "file_section_type",
    },
    applicationId: {
      model: "application",
      columnName: "application_id",
    },
    fileId: {
      model: "fileUpload",
      columnName: "file_id",
    },
    balanceFeeId: {
      model: "fileUpload",
      columnName: "balance_fee_id",
    },
  },
};
