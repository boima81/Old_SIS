module.exports = {
  friendlyName: "Create Update",

  description: "Create Update Grade.",

  inputs: {
    registration_id: {
      type: "number",
      required: true,
      // allowNull: true,
    },
    grade_number: {
      type: "number",
      require: true,
    },
    user_id: {
      type: "number",
      require: true,
    },
    course_id: {
      type: "number",
      require: true,
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
    if (inputs?.grade_number > 100 || inputs?.grade_number < 0) {
      return exits.invalid({
        message: `Application not attached with current user`,
      });
    }
    function getGradeInfo(gradeNumber) {
      if (gradeNumber >= 90 && gradeNumber <= 100) {
        return { name: "A", point: 4 };
      } 
      else if (gradeNumber >= 80 && gradeNumber < 90) {
        return { name: "B", point: 3 };
      }
      else if (gradeNumber >= 70 && gradeNumber < 80) {
        return { name: "C", point: 2 };
      }
      else if (gradeNumber >= 60 && gradeNumber < 70) {
        return { name: "D", point: 1 };
      }
      else if (gradeNumber >= 0 && gradeNumber < 60) {
        return { name: "F", point: 0 };
      }
    }
    let gradeDetail = await Grade.find({
      where: {
        registration_id: inputs?.registration_id,
        course_id: inputs?.course_id,
        user_id: inputs?.user_id,
      },
    }).limit(1);
    const gradeId = gradeDetail?.[0]?.id;
    const gradeNumber = getGradeInfo(inputs?.grade_number);

    const storeData = {
      ...inputs,
      grade_name: gradeNumber?.name,
      grade_point: gradeNumber?.point,
    };

    if (gradeId) {
      gradeDetail = await Grade.updateOne({
        id: gradeId,
      }).set(storeData);
    } else {
      gradeDetail = await Grade.create(storeData)
        .intercept((error) => {
          console.log({ error });
          return error;
        })
        .fetch();
    }
    return exits.success(gradeDetail);
  },
};
