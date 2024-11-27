module.exports = {
  friendlyName: "View Registration Fees",

  description: "Display Registration Fees",

  inputs: {},

  exits: {
    invalid: {
      statusCode: 409,
      description: "All field is required.",
    },
  },

  fn: async function (inputs, exits) {
    const registrationFees = await RegistrationFees.findOne({
      id: this.req.params.id,
    }).meta({ skipRecordVerification: true })

    return exits.success(registrationFees);
  },
};
