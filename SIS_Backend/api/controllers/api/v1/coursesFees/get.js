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
    return exits.success(coursesFees);
  },
};
