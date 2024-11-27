module.exports = {
  friendlyName: "View Registration Fees",

  description: "Display Registration Fees",

  inputs: {},

  //   exits: {
  //     success: {
  //     }
  //   },

  fn: async function (inputs, exits) {
    const id = this.req.params.id;
    let registrationFees = await RegistrationFees.findOne({
      id: id,
    }).intercept((err) => {
      return exits.invalid(err);
    }).meta({ skipRecordVerification: true })

    if (!registrationFees) {
      return exits.invalid({ message: "Fees not found" });
    }
    return exits.success(registrationFees);
  },
};
