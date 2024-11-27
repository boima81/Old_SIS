module.exports = {
  friendlyName: "View Semester",

  description: "Display Semester",

  inputs: {},

  exits: {
    invalid: {
      statusCode: 404,
      description: "All field is required.",
    },
  },

  fn: async function (inputs, exits) {
    const id = this.req.params.id;
    const studentId = this.req.userId;
    console.log({ studentId })
    await Semester.findOne({
      id: id,
    })
      .populate("courses")
      .meta({ skipRecordVerification: true })
      .exec(async function (err, result) {
        if (err) {
          return exits.invalid(err);
        }
        const results = [];
        const element = result;
        for (let index = 0; index < element?.courses.length; index++) {
          const course = element?.courses?.[index];
          // const registration = await Registration.findOne({
          //   where: {
          //     createdBy: studentId,
          //   },
          // }).populate("courses", {
          //   where: {
          //     id: course?.id,
          //   },
          // });
          
          let grade = await Grade.find({
            where: {
              user_id: studentId,
              course_id: course?.id
            }
          }).sort("id ASC")
            .limit(1);
          grade = grade?.[0]
          console.log({ grade });
          if (grade ?.grade_number>=73) {
            course.alreadyRegistered = true
          } else {
            course.alreadyRegistered = false
          }
          if (course?.sections) {
            const sectionsData = await Sections.findOne({
              id: course?.sections,
            });
            course.sections = sectionsData;
          }
          if (course?.instructor) {
            let instructorData = await User.findOne({
              id: course?.instructor,
            }).populate("userInformationId");
            instructorData = instructorData.toJSON();
            const userInformationIns =
              instructorData?.userInformationId?.toJSON();
            console.log({
              displayName: instructorData?.userInformationId?.displayName,
            });
            course.instructor = {
              ...instructorData,
              name: userInformationIns?.displayName,
            };
          }

          results.push(course);
        }

        if (!result) {
          return exits.invalid({ message: "Semester not found" });
        }
        const extraFees = await CoursesFees.find()
          .limit(1)
          .meta({ skipRecordVerification: true });
        const registrationFees = await RegistrationFees.find().meta({
          skipRecordVerification: true,
        });
        const paymentTerms = await PaymentTerms.find();

        const fees = {
          courseFee: extraFees?.[0] || {},
          registrationFees,
        };
        return exits.success({
          ...element,
          courses: results,
          allFees: fees,
          paymentTerms,
        });
      });
    // .intercept((err) => {
    //   return exits.invalid(err);
    // })

    // if (!semester) {
    //   return exits.invalid({ message: "Semester not found" });
    // }
    // const extraFees = await CoursesFees.find().limit(1);
    // const registrationFees = await RegistrationFees.find();

    // const fees = {
    //   courseFee: extraFees?.[0] || {},
    //   registrationFees,
    // };
    // return exits.success({ ...semester, allFees: fees });
  },
};
