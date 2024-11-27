module.exports = {
  friendlyName: "View Course Curriculum",

  description: "Display Course Curriculum",

  inputs: {},

  exits: {
    success: {},
  },
  fn: async function (inputs, exits) {
    const userId = this.req.userId;
    console.log({ userId });
    let registrations = await Registration.find({
      createdBy: userId,
    })
      .populate("courses")
      .populate("semesterId")
      .populate("grade")
      .sort("id DESC");
    const application = await Application.findOne({
      createdBy: userId,
    }).populate("programId");
    let coursesData = [];
    for (let index = 0; index < registrations.length; index++) {
      const registration = registrations[index];
      const semester = await SemesterCourse.find({
        semester: registration.semesterId.id,
      });
      const coursesId = semester?.map((semester) => semester?.course);
      const courses = await Course.find({
        where: {
          id: {
            in: coursesId,
          },
        },
      }).select(["id", "course_id", "name", "course_credit"]);
      const newCourses = courses?.map(({ id, ...course }) => {
        const grade = registration?.grade?.filter(
          (grade) => grade?.course_id === id
        );
        const coursePresent = registration?.courses?.filter(
          (courseData) => courseData?.id == id
        );
        console;
        return {
          ...course,
          semesterName: registration?.semesterId?.name,
          grade,
          status:
            registration?.is_approved && coursePresent?.length > 0
              ? grade?.length > 0
                ? grade?.[0]?.grade_point > 1.3
                  ? "Pass"
                  : "Failed"
                : "In Progress"
              : "Pending",
        };
      });
      coursesData.push(...newCourses);
    }

    return exits.success({ data: coursesData, program: application?.programId?.name });
  },
};
