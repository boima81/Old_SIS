/**
 * FileUpload.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "file_upload",
  fetchRecordsOnUpdate: true,
  primaryKey: "id",
  attributes: {
    name: {
      type: "string",
      required: true,
    },
    url: {
      type: "string",
      required: true,
    },
    local_file_upload: {
      type: "string",
      required: true,
    },
    type: {
      type: "string",
      required: true,
    },
    applicationFile: {
      collection: "applicationfile",
      via: "fileId",
    },
    userAvatarFile: {
      collection: "user",
      via: "avatarFile",
    },
  },
};
