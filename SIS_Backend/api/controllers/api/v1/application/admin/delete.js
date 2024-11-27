module.exports = {
  friendlyName: "Delete",

  description: "Delete Application.",

  inputs: {},

  exits: {
    invalid: {
      statusCode: 409,
      description: "All field is required.",
    },
    success: {
      description: "Application Delete.",
    },
    redirect: {
      responseType: "redirect",
    },
  },

  fn: async function (inputs, exits) {
    const ids = this.req?.param("id")?.split(",") || [];
    try {
      var applicationRecord = await Application.destroy({
        id: { in: ids },
        application_status: { "=": ["pending"] },
      });
      exits.success();
    } catch (error) {
      return exits.invalid({
        message: `Application can't delete because it's attached with somewhere`,
      });
    }
  },
};
