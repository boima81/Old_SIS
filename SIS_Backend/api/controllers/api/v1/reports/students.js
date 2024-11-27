module.exports = {
  friendlyName: "View Applications",

  description: "Display Applications",

  inputs: {},

  //   exits: {
  //     success: {
  //     }
  //   },
  fn: async function (inputs, exits) {
    // let result = await sails.helpers.datatable(Project, this.req.query);
    const query = this.req.query;
    let where = { role: "student" };
    if (query?.course) {
      const courses = await RegistrationCourse.find({
        course: query?.course,
      })
        .populate("registration")
        .select("registration");

      const registrationUserIds = courses?.map(
        (course) => course?.registration?.createdBy
      );

      where = {
        ...where,
        id: registrationUserIds,
      };
    }

    if (query?.instructor) {
      let coursesData = await Course.find({
        instructor: query?.instructor,
      }).select("id");
      coursesData = coursesData?.map((courseData) => courseData?.id);
      const courses = await RegistrationCourse.find({
        course: coursesData,
      })
        .populate("registration")
        .select("registration");

      const registrationUserIds = courses?.map(
        (course) => course?.registration?.createdBy
      );

      where = {
        ...where,
        id: [...registrationUserIds, ...(where?.id || [])],
      };
    }
    if (query?.semester) {
      const applications = await Application.find({
        semesterId: query?.semester,
      }).select("id");
      console.log({ applications });
      const applicationIds = applications?.map(
        (application) => application?.id
      );
      where = {
        ...where,
        applicationId: applicationIds,
      };
    }

    if (query?.registrationStatus) {
      const registrations = await Registration.find({
        registration_status: query?.registrationStatus,
      }).select("createdBy");
      const registrationUserIds = registrations?.map(
        (registration) => registration?.createdBy
      );
      where = {
        ...where,
        id: [...registrationUserIds, ...(where?.id || [])],
      };
    }

    if (query?.gender) {
      const userInformation = await UserInformation.find({
        gender: query?.gender,
      }).select("id");
      const userInformationIds = userInformation?.map((info) => info?.id);

      where = {
        ...where,
        userInformationId: userInformationIds,
      };
    }
    console.log({ query });
    if (
      (query.balance && query.balance === "true") ||
      (query.paidFull && query.paidFull === "true")
    ) {
      const invoices = await Invoice.find().meta({
        skipRecordVerification: true,
      });
      const userIds = [];
      invoices?.forEach((invoice) => {
        const invoiceData = invoice.toJSON();
        if (query.balance === "true") {
          if (invoiceData?.remainingBalance > 0 && invoiceData?.createdBy) {
            userIds.push(invoiceData?.createdBy);
          }
        } else if (query.paidFull === "true") {
          if (invoiceData?.remainingBalance <= 0 && invoiceData?.createdBy) {
            userIds.push(invoiceData?.createdBy);
          }
        }
      });

      const newIds = [...(userIds || []), ...(where.id || [])];
      const grabUniqueValues = newIds.filter(
        (currentValue, currentIndex) =>
          newIds.indexOf(currentValue) !== currentIndex
      );

      where = {
        ...where,
        id: grabUniqueValues,
      };
    }


    let students = await User.find(where)
      //   .limit(10)
      .sort("id DESC")
      .populate("userInformationId")
      .select(['email',"userInformationId", "role", "applicationId"])
      .exec(async function (err, result) {
        const results = [];
        for (let index = 0; index < result?.length; index++) {
          const element = result[index];
          //   if (element?.userInformationId) {
          //     const student = await Student.findOne({
          //       id: element?.userInformationId.student,
          //     });

          //     element.userInformationId.student = student;
          //   }
          if (element?.applicationId) {
            const applicationData = await Application.findOne({
              id: element?.applicationId,
            })
              .populate("programId")
              .populate("semesterId")
              .select(["programId", "semesterId"]);

            const registrationData = await Registration.find({
              applicationId: element?.applicationId,
            })
              .sort('id DESC')
              .limit(1)
              .select("registration_status");
            //   .populate("courses")
            //   .populate("invoiceId");
            element.registrationData = registrationData?.[0] || {};
            element.applicationData = applicationData;

            // const files = await ApplicationFile.find({
            //   applicationId: element?.applicationId,
            //   fileSectionType: "registration_fee_offline_payment",
            // }).populate("fileId");
            // if (files?.length > 0) {
            //   let receiptFile = files?.[0]?.fileId?.url;
            //   element.receiptFile = receiptFile;
            //   console.log({ receiptFile, id: applicationData?.id });
            // }
          }

          results.push(element);
        }

        return exits.success({ data: results, count: results?.length });
      });
  },
};
