var moment = require("moment");

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
    const searchQuery = this.req?.param("search");
    const search = decodeURI(searchQuery || "");
    const type = this.req.param("type");

    const courseId = this.req.query["courseId"];
    const programId = this.req.query["programId"];
    const semesterId = this.req.query["semesterId"];
    const startDate = this.req.query["startDate"];
    const endDate = this.req.query["endDate"];
    const balance = this.req.query["balance"];
    const paidFull = this.req.query["paidFull"];

    let whereObj = {};

    if (programId) {
      whereObj = { ...whereObj, programId: programId };
    }
    if (semesterId) {
      whereObj = { ...whereObj, semesterId: semesterId };
    }
    if (startDate && endDate) {
      whereObj = {
        ...whereObj,
        createdAt: {
          ">=": moment(startDate).format(),
          "<=": moment(endDate).format(),
        },
      };
    }

    function arrayToTuple(arr) {
      return "(" + arr.map((item) => `'${item}'`).join(", ") + ")";
    }
    let where = {
      role: "student",
    };

    if (search) {
      // UserInformation
      var UserInformationRawSql = `SELECT id from public.user_information where CONCAT(first_name , ' ' , middle_name , ' ' , last_name) ILIKE '%${search}%l' `;
      const userInformationRawResult = await sails
        .sendNativeQuery(UserInformationRawSql, [])
        .meta({ skipRecordVerification: true });
      let userInformationSearchQueriesRows =
        userInformationRawResult?.rows?.map((row) => row?.id) || [];

      // Student Id
      var studentIdRawSql = `SELECT user_id from public.student where student_id ILIKE '%${search}%' `;
      const studentIdRawResult = await sails
        .sendNativeQuery(studentIdRawSql, [])
        .meta({ skipRecordVerification: true });
      let studentIdSearchQueriesRows =
        studentIdRawResult?.rows?.map((row) => row?.user_id) || [];

      var userRawSql = `SELECT id from public.user where email ILIKE '%${search}%'`;
      if (userInformationSearchQueriesRows?.length > 0) {
        userRawSql += `OR user_information_id IN ${arrayToTuple(
          userInformationSearchQueriesRows
        )}`;
      }
      if (studentIdSearchQueriesRows?.length > 0) {
        userRawSql += `OR id IN ${arrayToTuple(studentIdSearchQueriesRows)}`;
      }
      // User
      const userRawResult = await sails
        .sendNativeQuery(userRawSql, [])
        .meta({ skipRecordVerification: true });
      let userSearchQueriesRows =
        userRawResult?.rows?.map((row) => row?.id) || [];
      where["id"] = userSearchQueriesRows;
    }
    console.log("where", where);
    let students = await User.find({
      where,
    })
      .sort("id DESC")
      .populate("userInformationId")
      .populate("agencyId")
      // .limit(10)
      .meta({ skipRecordVerification: true })
      .exec(async function (err, result) {
        let results = [];
        for (let index = 0; index < result?.length; index++) {
          const element = result[index];

          if (element?.userInformationId) {
            const student = await Student.findOne({
              id: element?.userInformationId.student,
            }).meta({ skipRecordVerification: true });

            element.userInformationId.student = student;
          }
          if (element?.applicationId) {
            const applicationData = await Application.findOne({
              id: element?.applicationId,
            })
              .populate("programId")
              .populate("semesterId")
              .meta({ skipRecordVerification: true });

            console.log("whereObj", whereObj);

            let registrationData = await Registration.find(
              type === "registrationFees"
                ? whereObj
                : {
                    applicationId: element?.applicationId,
                  }
            )
              .populate("courses", {
                where: {
                  id: courseId,
                },
              })
              .populate("invoiceId")
              .populate("semesterId")
              .meta({ skipRecordVerification: true })
              .sort("id Desc");
            // console.log({
            //   registrationData: registrationData?.[0]?.id,
            //   applicationId: element?.applicationId,
            //   userInfo: element?.userInformationId?.first_name,
            // });
              console.log({registrationData})
            if (
              type === "registrationFees" &&
              !registrationData?.[0]?.id &&
              registrationData?.[0]?.registration_status !== "pending"
            ) {
              continue;
            }
            // const invoicesData = registrationData?.reduce(
            //   (sum, invoice) => ({
            //     total_amount:
            //       sum.total_amount + (invoice?.invoiceId?.total_amount || 0),
            //     amount_paid:
            //       sum.amount_paid + +(invoice?.invoiceId?.amount_paid || 0),
            //   }),
            //   {
            //     total_amount: 0,
            //     amount_paid: 0,
            //   }
            // );
            const invoicesId = registrationData?.[0]?.invoiceId?.toJSON();
            const remainingBalance = invoicesId?.remainingBalance;
            // const amountPaid = invoicesId?.amount_paid
            element.registrationData = {
              ...(registrationData?.[0] || {}),
              invoiceId: {
                ...registrationData?.[0]?.invoiceId,
                remainingBalance,
              },
            };
            element.applicationData = applicationData;

            const files = await ApplicationFile.find({
              applicationId: element?.applicationId,
              fileSectionType: "registration_fee_offline_payment",
            })
              .populate("fileId")
              .meta({ skipRecordVerification: true })
              .sort("id DESC");

            if (files?.length > 0) {
              let receiptFile = files?.[0]?.fileId?.url;
              element.receiptFile = receiptFile;
            }
          } else {
            if (type == "registrationFees") {
              continue;
            } else {
              console.log("in else");
            }
          }
          console.log("element", element);
          results.push(element);
        }
        if (balance == "true") {
          results = results.filter((data) => {
            return data?.registrationData?.invoiceId?.remainingBalance > 0;
          });
        }
        if (paidFull == "true") {
          results = results.filter((data) => {
            return data?.registrationData?.invoiceId?.remainingBalance <= 0;
          });
        }
        if (type == "registrationFees") {
          results = results.filter((data) =>
            data.registrationData ? true : false
          );
        }
        console.log("results", results);
        return exits.success(results);
      });
  },
};
