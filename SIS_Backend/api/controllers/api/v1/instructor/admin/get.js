module.exports = {
  friendlyName: "View Instructor",

  description: "Display Instructor",

  inputs: {},

  //   exits: {
  //     success: {
  //     }
  //   },

  fn: async function (inputs, exits) {
    let instructors = await User.find({
      role: "instructors",
    }).populate("userInformationId");

    return exits.success(instructors);
  },
};
