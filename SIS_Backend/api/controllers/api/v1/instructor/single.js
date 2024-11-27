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
    const instructor = await Instructor.findOne({ id: this.req.params.id });
    
    return exits.success(instructor);
  },
};
