module.exports = {
  friendlyName: "View Semester",

  description: "Display Semester",

  inputs: {},

  //   exits: {
  //     success: {
  //     }
  //   },

  fn: async function (inputs, exits) {
    const id = this.req.params.id;
    let course = await Course.findOne({
      active: true,
      id: id,
    }).intercept((err) => {
      return exits.invalid(err);
    });

    if (!course) {
      return exits.invalid({ message: "Course not found" });
    }
    return exits.success(course);
  },
};
