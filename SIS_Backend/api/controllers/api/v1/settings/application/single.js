module.exports = {
  friendlyName: "View Application Setting",

  description: "Display Application Setting",

  inputs: {},

  exits: {
    invalid: {
      statusCode: 409,
      description: "All field is required.",
    },
  },

  fn: async function (inputs, exits) {
    const applicationSetting = await ApplicationSettings.find()
      .limit(1)
      .populate("logo")
      .populate("favicon")

    return exits.success(applicationSetting?.[0] || {});
  },
};
