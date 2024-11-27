module.exports = {
  friendlyName: "View Instructor",

  description: "Display Instructor",

  inputs: {},

  exits: {
    invalid: {
      statusCode: 409,
      description: "All field is required.",
    },
  },

  fn: async function (inputs, exits) {
    const sections = await Sections.findOne({ id: this.req.params.id });

    return exits.success(sections);
  },
};
