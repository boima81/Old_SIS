module.exports = {
  friendlyName: "View Payment",

  description: "Display Payment",

  inputs: {},

  //   exits: {
  //     success: {
  //     }
  //   },

  fn: async function (inputs, exits) {
    let payments = await Payment.find();
    return exits.success(payments);
  },
};
