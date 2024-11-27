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
    const courseId = this.req.query["courseId"];
    const programId = this.req.query["programId"];
    const semesterId = this.req.query["semesterId"];
    console.log({ courseId });
    let registrations = [];
    let registerCourses = await RegistrationCourse.find({});
    const registrationIds = registerCourses?.map(
      (course) => course?.registration
    );
    console.log("registrationIds", registrationIds);
    let searchObj = {
      id: registrationIds,
      is_approved: true,
    };
    if (programId) {
      delete searchObj["id"];
      searchObj = { ...searchObj, programId: programId };
    }
    if (semesterId) {
      searchObj = { ...searchObj, semesterId: semesterId };
    }
    const registrationsData = await Registration.find({
      where: searchObj,
    })
      .populate("grade")
      .populate("programId")
      .populate("semesterId")
      .populate("applicationId")
      .populate("courses");

    for (let index = 0; index < registrationsData?.length; index++) {
      const element = registrationsData[index];
      console.log({ element: element.courses, semesterId:element.semesterId });
      const userInformationData = await User.findOne({
        id: element?.createdBy,
      }).populate("userInformationId");
      const [grade] = await Grade.find({
        registration_id: element?.id,
        course_id: courseId,
        user_id: element.createdBy,
      });
      console.log("grade", grade);
      element.userInformationId = userInformationData?.userInformationId;
      element.courseId = courseId;
      element.grade = grade;
      const { courses, ...rest } = element;
      const newCourseData = courses?.map?.((course) => ({
        course,
        ...rest,
      }));
      registrations.push(...newCourseData);
    }
    console.log("registrationsData", registrationsData);
    const finalData = registrationsData.filter((data) =>
      data?.userInformationId ? true : false
    );
    return exits.success(finalData);
  },
};
