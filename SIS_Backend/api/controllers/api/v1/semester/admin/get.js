module.exports = {
  friendlyName: "View Semester",

  description: "Display Semester",

  inputs: {},

  //   exits: {
  //     success: {
  //     }
  //   },

  fn: async function (inputs, exits) {
    let semesters = await Semester.find()

    return exits.success(semesters);
  },
};
