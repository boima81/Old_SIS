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
    const semester = await Semester.findOne({ id: this.req.params.id })
      .populate("programs")
      .populate("courses");
    
    return exits.success(semester);
  },
};
