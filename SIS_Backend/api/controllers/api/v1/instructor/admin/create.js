module.exports = {
  friendlyName: "Create Instructor",

  description: "Create Instructor Semester.",

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
    let instructor = {};
    if (inputs?.id) {
      instructor = await Instructor.updateOne({
        id: inputs.id,
      }).set(inputs);
    } else {
      instructor = await Instructor.create({
        ...inputs,
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
    return exits.success(instructor);
  },
};
