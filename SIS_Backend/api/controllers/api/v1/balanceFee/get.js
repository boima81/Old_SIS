module.exports = {
  friendlyName: "View Registration Fees",

  description: "Display Registration Fees",

  inputs: {},

  //   exits: {
  //     success: {
  //     }
  //   },

  fn: async function (inputs, exits) {
    const userId = this.req.userId;
    const id = this.req.params?.userId;
    let registration = await Registration.find({
      where: {
        createdBy:id || userId,
      }
    })
      .sort("id DESC").limit(1)
    registration = registration?.[0]
    if (registration?.id) {
      let registrationFees = await BalanceFees.find({
        user: registration?.id,
        or: [{ balance_fees_status: null }, { approved_payment: null }],
      }).meta({ skipRecordVerification: true });
      return exits.success(registrationFees);
    }
    return exits.success([]);
    
  },
};
