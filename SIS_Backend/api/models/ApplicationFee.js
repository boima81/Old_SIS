/**
 * ApplicationFee.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "application_fee",
  fetchRecordsOnUpdate: true,
  primaryKey: "id",
  attributes: {
    full_name: {
      type: "string",
      required: true,
    },
    card_number: {
      type: "string",
      required: true,
    },
    expire_date: {
      type: "ref",
      required: true,
      columnType: "date",
    },
    cvv: {
      type: "number",
      required: true,
    },
    application: {
      collection: "application",
      via: "applicationFee", // This is the name of the foreign key in the application table
    },
  },
};
