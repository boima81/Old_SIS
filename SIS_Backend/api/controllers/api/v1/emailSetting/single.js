module.exports = {
  friendlyName: "View EmailSettings",

  description: "Display EmailSettings",

  inputs: {},

  exits: {
    invalid: {
      statusCode: 409,
      description: "All field is required.",
    },
  },

  fn: async function (inputs, exits) {
    const setting = await EmailSettings.findOne({
      id: this.req.params.id,
    }).populate("updated_by");

    return exits.success(setting);
  },
};
