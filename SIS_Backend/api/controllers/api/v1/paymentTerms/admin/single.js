module.exports = {
  friendlyName: "View Payment Terms",

  description: "Display Payment Terms",

  inputs: {},

  exits: {
    invalid: {
      statusCode: 409,
      description: "All field is required.",
    },
  },

  fn: async function (inputs, exits) {
    const PaymentTermsData = await PaymentTerms.findOne({ id: this.req.params.id });
    
    return exits.success(PaymentTermsData);
  },
};
