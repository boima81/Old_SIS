module.exports = {
  friendlyName: "Create Section",

  description: "Create Update Section.",

  inputs: {
    id: {
      type: "number",
      required: false,
    },
    sectionNumber: {
      type: "number",
      required: true,
      description: "Section Number is required.",
    },
    sectionLimits: {
      type: "number",
      required: true,
      description: "Section Limits is required.",
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
    let sections = {};
    if (inputs?.id) {
      sections = await Sections.updateOne({
        id: inputs.id,
      }).set(inputs);
    } else {
      sections = await Sections.create({
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
    return exits.success(sections);
  },
};
