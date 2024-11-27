module.exports = {
  friendlyName: "View Registrations",

  description: "Display Registrations",

  inputs: {},

  exits: {
    success: {},
    invalid: {
      statusCode: 409,
      description: "Something went wrong.",
    },
  },

  fn: async function (inputs, exits) {
    // let result = await sails.helpers.datatable(Project, this.req.query);
    const search = this.req.param("search") || "";
    const semester = this.req.param("semester") || "";
    const registrationState = this.req.param("registrationState") || "";
    const course = this.req.param("course") || "";
    const program = this.req.param("program") || "";

    function arrayToTuple(arr) {
      return "(" + arr.map((item) => `'${item}'`).join(", ") + ")";
    }
    let where = {};
    let applicationIdSearchQueriesRows = [];
    let userSearchQueriesRows = [];
    if (search) {
      // UserInformation
      var UserInformationRawSql = `SELECT id from public.user_information where CONCAT(first_name , ' ' , middle_name , ' ' , last_name) ILIKE '%${search}%' `;
      const userInformationRawResult = await sails
        .sendNativeQuery(UserInformationRawSql, [])
        .meta({ skipRecordVerification: true });
      let userInformationSearchQueriesRows =
        userInformationRawResult?.rows?.map((row) => row?.id) || [];

      // Student Id
      var studentIdRawSql = `SELECT id from public.student where student_id ILIKE '%${search}%' `;
      const studentIdRawResult = await sails
        .sendNativeQuery(studentIdRawSql, [])
        .meta({ skipRecordVerification: true });
      let studentIdSearchQueriesRows =
        studentIdRawResult?.rows?.map((row) => row?.id) || [];

      if (studentIdSearchQueriesRows?.length > 0) {
        var applicationIdRawSql = `SELECT id from public.application where student_id IN ${arrayToTuple(
          studentIdSearchQueriesRows
        )} `;
        const applicationIdRawResult = await sails
          .sendNativeQuery(applicationIdRawSql, [])
          .meta({ skipRecordVerification: true });
        applicationIdSearchQueriesRows =
          applicationIdRawResult?.rows?.map((row) => row?.id) || [];
        console.log({ applicationIdSearchQueriesRows });
      }

      var userRawSql = "";
      if (userInformationSearchQueriesRows?.length > 0) {
        userRawSql += `SELECT id from public.user where user_information_id IN ${arrayToTuple(
          userInformationSearchQueriesRows
        )}`;
      }
      // if (studentIdSearchQueriesRows?.length > 0) {
      //   if (userRawResult) {
      //     userRawSql += `OR id IN ${arrayToTuple(studentIdSearchQueriesRows)}`;
      //   } else {
      //     userRawSql += `SELECT id from public.user where id IN ${arrayToTuple(
      //       studentIdSearchQueriesRows
      //     )}`;
      //   }
      // }
      // User
      console.log({ userRawSql, where });

      if (userRawSql) {
        const userRawResult = await sails
          .sendNativeQuery(userRawSql, [])
          .meta({ skipRecordVerification: true });
        userSearchQueriesRows =
          userRawResult?.rows?.map((row) => row?.id) || [];
        console.log({ userSearchQueriesRows });
      }
      where = {
        or: [
          {
            applicationId: { in: applicationIdSearchQueriesRows },
          },
          {
            createdBy: { in: userSearchQueriesRows },
          },
        ],
      };
    }
    // is_completed: true,
    // is_approved: false,
    if (semester) {
      where["semesterId"] = Number(semester);
    }
    // if (course) {
    //   where["courses"] = { in: [Number(course)] };
    // }
    if (registrationState) {
      where["registration_status"] = registrationState;
    }
    if (program) {
      where["programId"] = Number(program);
    }
    console.log("findData", await Registration.find({}));
    let registration = await Registration.find({
      where,
    })
      .sort("id DESC")
      .populate("applicationId")
      .populate("userInformationId")
      .populate("reviewBy")
      .populate("programId")
      .populate("semesterId")
      .populate("registrationFee")
      .populate("courses", {
        where: {
          id: Number(course) || undefined,
        },
      })
      .populate("invoiceId")
      // .limit(10)
      // .meta({ skipRecordVerification: true })
      .exec(async function (err, result) {
        const results = [];

        if (err) {
          return exits.invalid({
            message: err,
          });
        }
        for (let index = 0; index < result?.length; index++) {
          const element = result[index];

          if (element?.applicationId?.id) {
            const applicationData = await Application.findOne({
              id: element?.applicationId?.id,
            })
              // .populate("student")
              .populate("userInformationId");
            const student = await Student.findOne({
              where: {
                user: applicationData.createdBy,
              },
            });
            element.applicationData = { ...applicationData, student };
          }

          results.push(element);
        }
        return exits.success(results);
      });
    // .populate("recommendations")
    // .populate("applicationFile");

    // return exits.success(registration);
  },
};
