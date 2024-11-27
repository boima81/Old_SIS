module.exports = {
  friendlyName: "View Courses Fees",

  description: "Display Courses Fees",

  inputs: {},

  //   exits: {
  //     success: {
  //     }
  //   },

  fn: async function (inputs, exits) {
    const id = this.req.params.id;
    let coursesFees = await CoursesFees.findOne({
      id: id,
    }).intercept((err) => {
      return exits.invalid(err);
    });

    if (!coursesFees) {
      return exits.invalid({ message: "Courses Fees not found" });
    }
    return exits.success(coursesFees);
  },
};
