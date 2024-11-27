module.exports = {
  friendlyName: "View Payment Terms",

  description: "Display Payment Terms",

  inputs: {},

  //   exits: {
  //     success: {
  //     }
  //   },

  fn: async function (inputs, exits) {
    let sections = await PaymentTerms.find();

    return exits.success(sections);
  },
};
