/**
 * Program.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "mail_setting",
  fetchRecordsOnUpdate: true,
  primaryKey: "id",
  attributes: {
    title: {
      type: "string",
      required: true,
    },
    subject: {
      type: "string",
      required: true,
    },
    html: {
      type: "string",
      required: true,
    },
    key: {
      type: "string",
      required: true,
    },
    header: {
      type: "string",
      required: true,
    },
    footer: {
      type: "string",
      required: true,
    },
    created_by: {
      model: "user",
      columnName: "created_by",
    },
    updated_by: {
      model: "user",
      columnName: "updated_by",
    },
  },
};
