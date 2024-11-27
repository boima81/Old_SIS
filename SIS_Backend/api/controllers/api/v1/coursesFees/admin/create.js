module.exports = {
  friendlyName: "Create Update",

  description: "Create Update Courses Fees.",

  inputs: {
    name: {
      type: "string",
      required: true,
      description: "Name is required.",
    },
    amount: {
      type: "number",
      required: true,
      description: "Amount is required.",
    },
    applicationAmount: {
      type: "number",
      required: true,
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
    if (inputs?.semester?.length <= 0) {
      return exits.invalid({
        message: `Courses Fees is required`,
      });
    }

    let coursesFees = {};
    let coursesFeesDetail = await CoursesFees.find().limit(1);
    const courseId = coursesFeesDetail?.[0]?.id;
    if (courseId) {
      coursesFees = await CoursesFees.updateOne({
        id: courseId,
      }).set(inputs);
    } else {
      coursesFees = await CoursesFees.create(inputs)
        .intercept((error) => {
          console.log({ error });
          return error;
        })
        .fetch();
    }

    return exits.success(coursesFees);
  },
};
