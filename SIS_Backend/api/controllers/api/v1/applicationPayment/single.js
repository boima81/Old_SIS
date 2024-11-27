module.exports = {
  friendlyName: "View Payment",

  description: "Display Payment",

  inputs: {},

  //   exits: {
  //     success: {
  //     }
  //   },

  fn: async function (inputs, exits) {
    const id = this.req.params.id;
    let payment = await Payment.findOne({
      id: id,
    }).intercept((err) => {
      return exits.invalid(err);
    });

    if (!payment) {
      return exits.invalid({ message: "Payment not found" });
    }
    return exits.success(payment);
  },
};
