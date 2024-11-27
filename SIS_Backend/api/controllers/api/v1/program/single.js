module.exports = {
  friendlyName: "View Program",

  description: "Display Program",

  inputs: {},

  exits: {
    invalid: {
      statusCode: 409,
      description: "All field is required.",
    },
  },

  fn: async function (inputs, exits) {
    const program = await Program.findOne({ id: this.req.params.id });
    let semesters = await Semester.find({
      active: true,
      id: program.semester,
    })
      .populate("courses");
    return exits.success(semesters);
  },
};
