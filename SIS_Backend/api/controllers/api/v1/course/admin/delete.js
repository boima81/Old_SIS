module.exports = {
  friendlyName: "Delete",

  description: "Delete Course.",

  inputs: {},

  exits: {
    invalid: {
      statusCode: 409,
      description: "All field is required.",
    },
    success: {
      description: "Course Delete.",
    },
    redirect: {
      responseType: "redirect",
    },
  },

  fn: async function (inputs, exits) {
    const ids = this.req?.param("id")?.split(",") || [];
    try {
      // const programSemId = await SemesterCourse.destroy({
      //   course: { in: ids },
      // });
      var courseRecord = await Course.destroy({
        id: { in: ids },
      });
      exits.success();
    } catch (error) {
      return exits.invalid({
        message: `Courses can't delete because it's attached with somewhere`,
      });
    }
  },
};
