/**
 * Student.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "student",
  fetchRecordsOnUpdate: true,
  primaryKey: "id",
  attributes: {
    is_block: {
      type: "boolean",
      defaultsTo: false,
    },
    user: {
      model: "user",
      columnName: "user_id",
    },
    application: {
      collection: "application",
      via: "student",
    },
    student_id: {
      type: "string",
      required: false,
    },  
  },
};
