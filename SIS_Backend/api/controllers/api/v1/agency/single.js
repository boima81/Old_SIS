module.exports = {
  friendlyName: "View agency",

  description: "Display agency",

  inputs: {},

  exits: {
    invalid: {
      statusCode: 409,
      description: "All field is required.",
    },
  },

  fn: async function (inputs, exits) {
    const agency = await Agency.findOne({ id: this.req.params.id });

    return exits.success(agency);
  },
};
