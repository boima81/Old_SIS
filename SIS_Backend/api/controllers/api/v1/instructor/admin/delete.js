module.exports = {
  friendlyName: "Delete",

  description: "Delete Instructor.",

  inputs: {},

  exits: {
    invalid: {
      statusCode: 409,
      description: "All field is required.",
    },
    success: {
      description: "Instructor Delete.",
    },
    redirect: {
      responseType: "redirect",
    },
  },

  fn: async function (inputs, exits) {
    const ids = this.req?.param("id")?.split(",") || [];
    try {
      var instructorRecord = await Instructor.destroy({
        id: { in: ids },
      });
      exits.success();
    } catch (error) {
      return exits.invalid({
        message: `Instructor can't delete because it's attached with somewhere`,
      });
    }
  },
};
