module.exports = {
  friendlyName: "View Registration Fees",

  description: "Display Registration Fees",

  inputs: {},

  //   exits: {
  //     success: {
  //     }
  //   },

  fn: async function (inputs, exits) {
    let registrationFees = await RegistrationFees.find().meta({ skipRecordVerification: true })
    return exits.success(registrationFees);
  },
};
