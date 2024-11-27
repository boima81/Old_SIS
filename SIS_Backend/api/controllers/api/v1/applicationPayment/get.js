module.exports = {
  friendlyName: "View Payment",

  description: "Display Payment",

  inputs: {},

  //   exits: {
  //     success: {
  //     }
  //   },

  fn: async function (inputs, exits) {
    const userId = this.req.userId;

    let payments = await Payment.find({
      user: userId,
    });
    return exits.success(payments);
  },
};
