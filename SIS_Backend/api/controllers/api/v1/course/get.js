module.exports = {
  friendlyName: "View Courses",

  description: "Display Courses",

  inputs: {},

  //   exits: {
  //     success: {
  //     }
  //   },

  fn: async function (inputs, exits) {
    let courses = await Course.find({
      active: true,
    })
    return exits.success(courses);
  },
};
