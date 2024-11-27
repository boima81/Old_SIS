module.exports = {
  friendlyName: "Create Update",

  description: "Create Update Course.",

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
    course_id: {
      type: "string",
      required: true,
      description: "Course Id is required.",
    },
    course_no: {
      type: "number",
      required: true,
      description: "Course No is required.",
    },
    category: {
      type: "string",
      required: true,
      description: "Category is required.",
    },
    course_credit: {
      type: "number",
      required: false,
      allowNull: true,
      description: "Course Credit is required.",
    },
    sections: {
      type: "number",
      require: true,
      description: "Sections is required",
    },
    time: {
      type: "string",
      required: false,
      description: "Time is required",
      allowNull: true,
    },
    last_time: {
      type: "string",
      required: false,
      description: "Last Time is required",
      allowNull: true,
    },
    classroom: {
      type: "string",
      required: true,
      description: "classroom is required",
    },
    instructor: {
      type: "number",
      required: true,
      description: "instructor is required",
    },
    program: {
      type: "number",
      required: true,
      description: "Program is required",
    },
    semester: {
      type: "ref",
      required: true,
      description: "Semester is required",
    },
    mon_wed_fri: {
      type: "boolean",
      required: false,
    },
    tue_thu_sat: {
      type: "boolean",
      required: false,
    },
    tue_thu: {
      type: "boolean",
      required: false,
    },
    online: {
      type: "boolean",
      required: false,
    },
    price: {
      type: "number",
      defaultsTo: 0,
    },
    creditType: {
      type: "number",
      defaultsTo: 1,
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
        message: `Semester is required`,
      });
    }

    let course = {};
    inputs.time = inputs?.time || null;
    inputs.last_time = inputs?.last_time || null;
    if (inputs?.id) {
      course = await Course.updateOne({
        id: inputs.id,
      }).set({
        ...inputs,
        schedule: JSON.stringify({
          mon_wed_fri: inputs?.mon_wed_fri || false,
          tue_thu_sat: inputs?.tue_thu_sat || false,
          tue_thu: inputs?.tue_thu || false,
          online: inputs?.online || false,
        }),
      });
    } else {
      course = await Course.create({
        ...inputs,
        per_credit_price: inputs?.per_credit_price || 0,
        description: " ",
        schedule: JSON.stringify({
          mon_wed_fri: inputs?.mon_wed_fri || false,
          tue_thu_sat: inputs?.tue_thu_sat || false,
          tue_thu: inputs?.tue_thu || false,
          online: inputs?.online || false,
        }),
      })
        .intercept((error) => {
          console.log({ error });
          return error;
        })
        .fetch();
    }
    if (inputs.semester?.length > 0) {
      await Course.replaceCollection(course?.id, "semesters", inputs.semester);
    }
    return exits.success(course);
  },
};
