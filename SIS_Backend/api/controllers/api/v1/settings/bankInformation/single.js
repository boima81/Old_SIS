
module.exports = {
  friendlyName: "View Application Setting",

  description: "Display Application Setting",

  inputs: {},

  exits: {
    invalid: {
      statusCode: 409,
      description: "All field is required.",
    },
  },

  fn: async function (inputs, exits) {
    const bankApplicationSettings = await BankInformationSettings.find()
      .limit(1)
      
    return exits.success(bankApplicationSettings?.[0] || {});
  },
};
