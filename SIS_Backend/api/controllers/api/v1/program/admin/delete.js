module.exports = {
  friendlyName: "Delete",

  description: "Delete Program.",

  inputs: {},

  exits: {
    invalid: {
      statusCode: 409,
      description: "All field is required.",
    },
    success: {
      description: "Program Delete.",
    },
    redirect: {
      responseType: "redirect",
    },
  },

  fn: async function (inputs, exits) {
    const ids = this.req?.param("id")?.split(",") || [];
    try {
      var programRecord = await Program.destroy({
        id: { in: ids },
      });
      exits.success();
    } catch (error) {
      return exits.invalid({
        message: `Program can't delete because it's attached with somewhere`,
      });
    }
  },
};