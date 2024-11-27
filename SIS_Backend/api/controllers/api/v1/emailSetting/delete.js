module.exports = {
  friendlyName: "Delete",

  description: "Delete EmailSettings.",

  inputs: {},

  exits: {
    invalid: {
      statusCode: 409,
      description: "All field is required.",
    },
    success: {
      description: "EmailSettings Delete.",
    },
    redirect: {
      responseType: "redirect",
    },
  },

  fn: async function (inputs, exits) {
    const ids = this.req?.param("id")?.split(",") || [];
    try {
      var emailSettingRecord = await EmailSettings.destroy({
        id: { in: ids },
      });
      exits.success();
    } catch (error) {
      return exits.invalid({
        message: `EmailSettings can't delete`,
      });
    }
  },
};
