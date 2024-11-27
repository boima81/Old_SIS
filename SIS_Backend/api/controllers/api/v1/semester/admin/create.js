const moment = require("moment");
module.exports = {
  friendlyName: "Create Update",

  description: "Create Update Semester.",

  inputs: {
    id: {
      type: "number",
      required: false,
    },
    name: {
      type: "string",
      required: true,
      description: "Name is required.",
    },
    startDate: {
      type: "string",
      required: true,
    },
    endDate: {
      type: "string",
      required: true,
    },
    // courses: {
    //   type: "ref",
    //   required: true,
    //   description: "Courses is required.",
    // },
    // programs: {
    //   type: "ref",
    //   required: true,
    //   description: "program is required.",
    // },
  },
  exits: {
    invalid: {
      statusCode: 409,
      description: "All field is required.",
    },
    redirect: {
      responseType: "redirect",
    },
  },

  fn: async function (inputs, exits) {
    let semester = {};
    if (inputs?.id) {
      semester = await Semester.updateOne({
        id: inputs.id,
      }).set({
        ...inputs,
        startDate: moment(inputs?.startDate)
          .utc()
          .startOf("day")
          .format("YYYY/MM/DD"),
        endDate: moment(inputs?.endDate)
          .utc()
          .startOf("day")
          .format("YYYY/MM/DD"),
      });
      // if (inputs.courses?.length > 0) {
      //   await Semester.replaceCollection(
      //     semester?.id,
      //     "courses",
      //     inputs.courses
      //   );
      // }
      // if (inputs.programs?.length > 0) {
      //   await Semester.replaceCollection(semester?.id, "programs").members([
      //     inputs.programs,
      //   ]);
      // }
    } else {
      semester = await Semester.create({
        ...inputs,
        startDate: moment(inputs?.startDate)
          .utc()
          .startOf("day")
          .format("YYYY/MM/DD"),
        endDate: moment(inputs?.endDate)
          .utc()
          .startOf("day")
          .format("YYYY/MM/DD"),
        per_credit_price: inputs?.per_credit_price || 0,
        description: " ",
      })
        .intercept((error) => {
          console.log({ error });
          return error;
        })
        .fetch();
      // await Semester.addToCollection(semester?.id, "courses", inputs.courses);
      // await Semester.addToCollection(semester?.id, "programs").members([
      //   inputs.programs,
      // ]);
    }
    return exits.success(semester);
  },
};
