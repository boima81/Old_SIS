module.exports = {
  friendlyName: "View Course",

  description: "Display Course",

  inputs: {},

  exits: {
    invalid: {
      statusCode: 409,
      description: "All field is required.",
    },
  },

  fn: async function (inputs, exits) {
    const course = await Course.findOne({ id: this.req.params.id }).populate(
      "semesters"
    );
    
    return exits.success(course);
  },
};
