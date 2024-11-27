module.exports = {
  friendlyName: "View Sections",

  description: "Display Sections",

  inputs: {},

  //   exits: {
  //     success: {
  //     }
  //   },

  fn: async function (inputs, exits) {
    let sections = await Sections.find();

    return exits.success(sections);
  },
};
