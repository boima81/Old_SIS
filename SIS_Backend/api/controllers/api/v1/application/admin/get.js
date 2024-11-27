module.exports = {
  friendlyName: "View Applications",

  description: "Display Applications",

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
    console.log({ search });
    function arrayToTuple(arr) {
      return "(" + arr.map((item) => `'${item}'`).join(", ") + ")";
    }
    let where = {
      or: [
        {
          createdByAdmin: { "!=": null },
        },
        {
          is_completed: true,
        },
        {
          application_status: "feedback",
        },
      ],
    };
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
      console.log({ studentIdSearchQueriesRows });
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
      console.log({ userRawSql });
      let userSearchQueriesRows = [];
      if (userRawSql) {
        const userRawResult = await sails
          .sendNativeQuery(userRawSql, [])
          .meta({ skipRecordVerification: true });
        userSearchQueriesRows =
          userRawResult?.rows?.map((row) => row?.id) || [];
        console.log({ userSearchQueriesRows });
      }
      // where["created_by"] = userSearchQueriesRows;
      where = {
        and: [
          {
            ...where,
          },
          {
            or: [
              {
                student: studentIdSearchQueriesRows,
              },
              {
                createdBy: userSearchQueriesRows,
              },
            ],
          },
        ],
      };
    }

    let application = await Application.find({
      where,
    })
      .sort("id DESC")
      // .populate("student")
      .populate("userInformationId")
      .populate("reviewBy")
      .populate("programId")
      .populate("semesterId")
      .populate("applicationFee")
      .populate("uploadLatter")
      .populate("recommendations")
      .populate("applicationFile")
      .meta({ skipRecordVerification: true })
      .exec(async function (err, result) {
        const results = [];
        if (err) {
          return exits.invalid({
            message: err,
          });
        }
        for (let index = 0; index < result?.length; index++) {
          const element = result[index];

          // if (element?.applicationId?.id) {
          const userInformationData = await User.findOne({
            id: element?.createdBy,
          }).populate("userInformationId");

          const studentId = await Student.findOne({
            user: element?.createdBy,
          });

          element.student = studentId;
          element.userInformationId = userInformationData?.userInformationId;
          results.push(element);
        }
        return exits.success(results);
      });

    // return exits.success(application);
  },
};
