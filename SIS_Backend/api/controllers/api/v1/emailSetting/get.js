module.exports = {
  friendlyName: "View Emails",

  description: "Display Emails",

  inputs: {},

  //   exits: {
  //     success: {
  //     }
  //   },

  fn: async function (inputs, exits) {
    let settingList = await EmailSettings.find({}).populate("updated_by");

    return exits.success(settingList);
  },
};
