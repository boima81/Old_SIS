module.exports = {
  friendlyName: "View Courses Fees",

  description: "Display Courses Fees",

  inputs: {},

  //   exits: {
  //     success: {
  //     }
  //   },

  fn: async function (inputs, exits) {
    let coursesFees = await CoursesFees.find();

    // .populate("semester")
    return exits.success(coursesFees);
  },
};
