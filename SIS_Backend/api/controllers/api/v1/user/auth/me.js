var moment = require("moment");

module.exports = {
  friendlyName: "View Single User",

  description: "Display Single User",

  inputs: {},

  //   exits: {
  //     success: {
  //     }
  //   },

  fn: async function (inputs, exits) {

    function getGradeInfo(gradeNumber) {
      if (gradeNumber >= 90 && gradeNumber <= 100) {
        return { name: "A", point: 4 };
      } else if (gradeNumber >= 80 && gradeNumber < 90) {
        return { name: "B", point: 3 };
      } else if (gradeNumber >= 70 && gradeNumber < 80) {
        return { name: "C", point: 2 };
      } else if (gradeNumber >= 60 && gradeNumber < 70) {
        return { name: "D", point: 1 };
      } else if (gradeNumber >= 0 && gradeNumber < 60) {
        return { name: "F", point: 0 };
      }
    }
    const userId = this.req.userId;

    // let result = await sails.helpers.datatable(Project, this.req.query);
    let user = await User.findOne({
      id: userId,
    })
      .populate("applicationId")
      .populate("userInformationId")
      .populate("avatarFile");

    const registrationFilter = {
      applicationId: user?.applicationId?.id,
    };

    let applicationSetting = await ApplicationSettings.find()
      .limit(1)
      .populate("logo")
      .populate("favicon");
    applicationSetting = applicationSetting?.[0] || {};

    let registrationOld = {};
    const previewDate = moment(applicationSetting.registrationStartDate)
      .subtract(1, "day")
      .format("YYYY-MM-DD");
    const endDate = moment(applicationSetting.registrationEndDate)
      .add(1, "day")
      .format("YYYY-MM-DD");
    console.log({ previewDate, endDate });
    let currentDate = false;
    if (applicationSetting?.registrationStarted) {
      currentDate = moment().isBetween(previewDate, endDate, "days");
    }
    console.log({ currentDate });
    if (user?.role === "student" && user?.applicationId?.id) {
      if (currentDate) {
        registrationOld = await Registration.find({
          ...registrationFilter,
          semesterId: applicationSetting.registrationSemester,
        })
          .populate("programId")
          .populate("courses")
          .populate("invoiceId")
          .sort("id DESC")
          .limit(1);
        registrationOld = registrationOld?.[0];
        if (registrationOld?.courses) {

          const programId = user?.applicationId?.programId;
          console.log({ programId });
          if (programId) {
            const programData = await Program.find(programId);
            // user.applicationId.programId = programData;
            user["registration"] = { programId: programData };
          }
          user.coursesCount = registrationOld?.courses?.length || 0;
        }

      }
      let registrationsId = await Registration.find({
        ...registrationFilter,
      });
      registrationsId = registrationsId?.map((registration) => registration.id);
      if (registrationsId?.length > 0) {
        const grades = await Grade.find({
          where: {
            registration_id: registrationsId,
          },
        }).populate('course_id')
        console.log({ grades })
        const totalGradePoint = grades?.reduce(
          (sum, grade) => sum + (grade?.grade_point * grade?.course_id?.course_credit || 0),
          0
        );
        const courseCredits = grades.reduce(
          (value, currentValue) => {
            console.log({ currentValue });
            return {
              credit:
                (currentValue?.course_id?.course_credit || 0) + value?.credit,
              qualityPoint:
                getGradeInfo(currentValue?.grade_number)?.point *
                (currentValue?.course_id?.course_credit || 0) +
                value?.qualityPoint,
            };
          },
          { credit: 0, qualityPoint: 0 }
        );
        console.log({ courseCredits })
        const currentQualityPoint =
          courseCredits?.qualityPoint > 0
            ? (
              (courseCredits?.qualityPoint || 0) /
              (courseCredits?.credit || 0)
            ).toFixed(2)
            : 0;
        const coursesData = await RegistrationCourse.find({
          where: {
            registration: registrationsId,
          },
        }).populate("course");
        const courseCredit = coursesData?.reduce(
          (sum, course) => sum + (course?.course?.course_credit || 0),
          0
        );
        console.log({ courseCredit });
        user.coursesCredit = courseCredit;

        // const gpa = totalGradePoint / courseCredit
        const gpa = parseFloat(currentQualityPoint)
        console.log({ gpa })
        user.gpa = gpa.toFixed(2)

        const invoiceData = await Invoice.find({
          where: {

            registration: registrationsId

          }
        })
        const totalInvoiceOverage = invoiceData?.reduce(
          (sum, invoice) => {
            const balanceOverage = invoice?.total_amount - (+invoice?.amount_paid || "0")
            return sum + (balanceOverage < 0 ? (-balanceOverage) : 0)
          },
          0
        );

        user.balanceOverage = totalInvoiceOverage
      }
      const programCourse = await Course.find({
        where: {
          program: user?.applicationId?.programId
        }
      })
      console.log({ programCourse })
      if (programCourse?.length > 0) {
        const courseCredit = programCourse?.reduce(
          (sum, course) => sum + (course?.course_credit || 0),
          0
        );
        user.programTotalCredit = courseCredit
      }
      const program = await Program.findOne({
        where: {
          id: user?.applicationId?.programId
        }
      })
      if (program?.id) {
        user.programName = program?.name
      }
    }
    if (user?.role === "admin" || user?.role === "admission") {
      let applicationPending = await Application.find({
        where: {
          is_completed: true,
          is_approved: false,
        },
      }).select("id");
      applicationPending = applicationPending?.map((id) => id?.id);
      let registrationPending = await Registration.find({
        where: {
          is_completed: true,
          is_approved: false,
        },
      }).select("id");

      registrationPending = registrationPending?.map((id) => id?.id);

      user.applicationPending = applicationPending?.length || 0;
      user.registrationPending = registrationPending?.length || 0;
    }
    if (user?.role === "admin" || user?.role === "academics") {
      const totalCourses = await Course.count();
      const totalCreditHours = await Course.sum("course_credit");

      const totalPrograms = await Program.count();
      user.totalPrograms = totalPrograms;
      user.totalCourses = totalCourses;
      user.totalCreditHours = totalCreditHours;
    }
    if (user?.role === "admin" || user?.role === "finance") {
      // let applicationPending = await Application.find({
      //   where: {
      //     is_completed: false,
      //     is_approved: false,
      //   },
      // }).select("id");
      // applicationPending = applicationPending?.map((id) => id?.id);
      // console.log({ applicationPending });
      // let registrationPending = await Registration.find({
      //   where: {
      //     is_completed: false,
      //     is_approved: false,
      //   },
      // }).select("id");

      // registrationPending = registrationPending?.map((id) => id?.id);
      const totalApplicationFess = await Payment.sum("amount").where({
        module_type: "application",
      });
      const totalPendingApplicationFees = await Payment.sum("amount").where({
        module_type: "application",
        // application: applicationPending,
        approve_payment: null,
      });

      const totalPendingRegistrationFees = await Payment.sum("amount").where({
        module_type: "registration",
        // application: registrationPending,
        approve_payment: null,
      });
      const totalRegistrationFees = await Invoice.sum("amount_paid");
      const totalAmountRegistrationFees = await Invoice.sum("total_amount");
      user.totalApplicationFess = totalApplicationFess;
      user.totalRegistrationFees = totalRegistrationFees;
      user.totalWaitingApplicationFees = totalPendingApplicationFees;
      user.totalWaitingRegistrationFees = totalPendingRegistrationFees;

      user.totalBalance = (
        totalAmountRegistrationFees - totalRegistrationFees
      ).toFixed(2);
    }

    if (user?.role === "admin" || user?.role === "instructors") {
      let where = {};
      if (user?.role === "instructors") {
        where = {
          instructor: userId,
        };
      }
      const totalUserData = await Course.find(where).populate("registrations");

      let totalUser = 0;
      let totalInstructorCourses = 0;
      for (let index = 0; index < totalUserData?.length; index++) {
        const element = totalUserData[index];

        totalUser += element?.registrations?.length || 0;
        totalInstructorCourses += 1;
      }
      if (user?.role === 'admin') {
        const invoiceData = await Invoice.find()
        const totalInvoiceOverage = invoiceData?.reduce(
          (sum, invoice) => {
            const balanceOverage = invoice?.total_amount - (+invoice?.amount_paid || "0")
            return sum + (balanceOverage < 0 ? (-balanceOverage) : 0)
          },
          0
        );

        user.balanceOverage = totalInvoiceOverage
      }

      user.totalAssignCourses = totalInstructorCourses;
      user.totalAssignCoursesStudent = totalUser;
    }

    if (
      user?.role === "admin" ||
      user?.role === "admission" ||
      user?.role === "academics"
    ) {
      const totalStudents = await User.count({
        role: "student",
      });
      user.totalStudents = totalStudents;
    }

    if (user?.userInformationId?.id) {
      const userInformationData = await UserInformation.findOne({
        id: user?.userInformationId?.id,
      }).populate("student");
      user.userInformationId = userInformationData;
    }
    let courseFee = await CoursesFees.find()
      .limit(1)
      .meta({ skipRecordVerification: true });
    courseFee = courseFee?.[0] || {};

    const userData = {
      ...user,
      data: user.userInformationId,
      registration: registrationOld,
      role: [user?.role || "student"],
      photoURL: user?.avatarFile?.url,
      applicationFee: courseFee,
      applicationSetting,
    };
    return exits.success({ user: userData });
  },
};
