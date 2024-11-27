module.exports = {
  friendlyName: "View Program",

  description: "Display Program",

  inputs: {},

  //   exits: {
  //     success: {
  //     }
  //   },

  fn: async function (inputs, exits) {
    let programs = await Program.find({
      active: true,
    }).populate("semesters");
    return exits.success(programs);
  },
};
