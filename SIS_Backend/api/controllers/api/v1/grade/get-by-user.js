module.exports = {
  friendlyName: "View Semester Course",

  description: "Display Semester Course",

  inputs: {},

  exits: {
    success: {},
    invalid: {
      statusCode: 409,
      description: "All field is required.",
    },
  },

  fn: async function (inputs, exits) {
    const userId = this.req.userId;
    const semester = this.req.params.semester;

    if (userId && semester) {
      const semestersData = await SemesterCourse.find({
        where: {
          semester,
        },
      });
      const coursesId = semestersData?.map((sc) => sc.course);

      const userInformationData = await User.findOne({
        id: userId,
      })
        .populate("userInformationId")
        .populate("student")
        .populate("programs")
        .populate("semesters");
      const grades = await Grade.find({
        user_id: userId,
        course_id: coursesId,
      }).populate("course_id");
      const gradePointAvg = await Grade.avg("grade_point").where({
        user_id: userId,
      });
      let registration = await Registration.find({
        createdBy: userId,
          is_approved: true,
          semesterId:semester
      })
        .populate("programId")
        .populate("semesterId")
        .sort("id DESC")
        .limit(1);
      registration = registration?.[0];
        console.log({ registration })
      // const receiptGenerateData = await sails.helpers.generateGrade.with({
      //     id: userId,
      // });
      // console.log({ receiptGenerateData })
      const baseUrl = sails.config.custom.baseUrl;
      return exits.success({
        grades: grades,
        userInformation: {
            ...userInformationData,
            semesters: registration?.semesterId?.name,
            programs: registration?.programId?.name,
        },
        gradePointAvg: gradePointAvg,
        isRegistered: !!registration?.id && grades?.length > 0,
      });
      // downloadPath: `${baseUrl}${path}`
      // const registrationIds = registerCourses?.map(
      //     (course) => course?.registration
      // );
      // registrations = await Registration.find({
      //     where: {
      //         createdBy: userId,
      //     },
      // }).populate("grade").populate('applicationId')
      //     .exec(async function (err, result) {
      //         const results = [];
      //         if (err) {
      //             return exits.invalid({
      //                 message: err,
      //             });
      //         }
      //         for (let index = 0; index < result?.length; index++) {
      //             const element = result[index];
      //             const userInformationData = await User.findOne({
      //                 id: element?.createdBy,
      //             }).populate("userInformationId");
      //             const grade = await Grade.findOne({
      //                 registration_id: element?.id,
      //                 course_id: courseId,
      //                 user_id: element.createdBy,
      //             })
      //             element.userInformationId = userInformationData?.userInformationId;
      //             element.courseId = courseId
      //             element.grade = grade
      //             results.push(element);
      //         }
      //         return exits.success(results);

      //     })
    } else {
      return exits.success({
        grades: [],
        userInformation: {},
        gradePointAvg: 0,
        isRegistered: false,
        downloadPath: "",
      });
    }
  },
};
