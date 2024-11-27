module.exports = {
  friendlyName: "View Courses Fees",

  description: "Display Courses Fees",

  inputs: {},

  exits: {
    invalid: {
      statusCode: 409,
      description: "All field is required.",
    },
  },

  fn: async function (inputs, exits) {
    let coursesFeesDetail = await CoursesFees.find().limit(1);

    return exits.success(coursesFeesDetail?.[0] || {});
  },
};
