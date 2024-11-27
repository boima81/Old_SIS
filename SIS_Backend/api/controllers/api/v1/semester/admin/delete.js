module.exports = {
  friendlyName: "Delete",

  description: "Delete Semester.",

  inputs: {},

  exits: {
    invalid: {
      statusCode: 409,
      description: "All field is required.",
    },
    success: {
      description: "Semester Delete.",
    },
    redirect: {
      responseType: "redirect",
    },
  },

  fn: async function (inputs, exits) {
    const ids = this.req?.param("id")?.split(",") || [];
    // const programSemId = await ProgramSemester.destroy({
    //   semester: { in: ids },
    // });
    try {
      var semesterRecord = await Semester.destroy({
        id: { in: ids },
      });
      exits.success();
    } catch (error) {
      return exits.invalid({
        message: `Semester can't delete because it's attached with somewhere`,
      });
    }
  },
};
