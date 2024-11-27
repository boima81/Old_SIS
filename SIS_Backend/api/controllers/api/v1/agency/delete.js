module.exports = {
  friendlyName: "Delete",

  description: "Delete Agency.",

  inputs: {},

  exits: {
    invalid: {
      statusCode: 409,
      description: "All field is required.",
    },
    success: {
      description: "Agency Delete.",
    },
    redirect: {
      responseType: "redirect",
    },
  },

  fn: async function (inputs, exits) {
    const ids = this.req?.param("id")?.split(",") || [];
    try {
      var agencyRecord = await Agency.destroy({
        id: { in: ids },
      });
      exits.success();
    } catch (error) {
      return exits.invalid({
        message: `Agency can't delete because it's attached with somewhere`,
      });
    }
  },
};
