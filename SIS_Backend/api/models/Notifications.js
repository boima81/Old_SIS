/**
 * Semester.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "notification",
  fetchRecordsOnUpdate: true,
  primaryKey: "id",
  attributes: {
    message: {
      type: "string",
      required: true,
    },
    notificationType: {
      type: "string",
      required: false,
      columnName: "notification_type",
    },
    notificationKey: {
      type: "string",
      required: true,
      columnName: "notification_key",
    },
    redirectUrl: {
      type: "string",
      required: false,
      columnName: "redirect_url",
    },
    markAsRead: {
      type: "boolean",
      columnName: "mark_as_read",
      defaultsTo: false,
    },
    roleName: {
      type: "string",
      columnName: "role_name",
    },
    createdFor: {
      model: "user",
      columnName: "created_for",
    },
    createdBy: {
      model: "user",
      columnName: "created_by",
    },
  },
};
