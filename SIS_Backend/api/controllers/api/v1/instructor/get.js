module.exports = {
  friendlyName: "View Instructor",

  description: "Display Instructor",

  inputs: {},

  //   exits: {
  //     success: {
  //     }
  //   },

  fn: async function (inputs, exits) {
    let instructors = await Instructor.find();
    return exits.success(instructors);
  },
};
