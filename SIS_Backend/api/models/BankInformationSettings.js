/**
 * BankInformationSettings.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "setting_bank_information",
  fetchRecordsOnUpdate: true,
  primaryKey: "id",
  attributes: {
    offlinePayment: {
      type: "boolean",
      columnName: "offline_payment",
      defaultsTo: true,
    },
    onlinePayment: {
      type: "boolean",
      columnName: "online_payment",
      defaultsTo: true,
    },
    bankName: {
      type: "string",
      required: true,
      columnName: "bank_name",
    },
    accountName: {
      type: "string",
      required: true,
      columnName: "account_name",
    },
    accountNumber: {
      type: "string",
      required: true,
      columnName: "account_number",
    },
    swiftCode: {
      type: "string",
      required: true,
      columnName: "swift_code",
    },
  },
  //   customToJSON: function () {
  //     const data = {
  //       ...this,
  //       displayName: `${this.first_name} ${this.middle_name} ${this.last_name}`,
  //       photoURL: "",
  //       shortcuts: [],
  //     };
  //     // Return a shallow copy of this record with the password and ssn removed.
  //     return _.omit(data, ["password"]);
  //   },
};
