module.exports = {
  friendlyName: "View Registration Fees",

  description: "Display Registration Fees",

  inputs: {},

  //   exits: {
  //     success: {
  //     }
  //   },

  fn: async function (inputs, exits) {
    const userId = this.req.userId;
    const userData = await User.findOne({ id: userId });
    const search = this.req.param("search") || "";
    function arrayToTuple(arr) {
      return "(" + arr.map((item) => `'${item}'`).join(", ") + ")";
    }

    let where = {
      // payment_type: "offline",
      module_type: "application",
    };
    if (userData?.role === "student") {
      where = {
        // ...where,
        user: userData?.id,
      };
    }
    if (search) {
      var UserInformationRawSql = `SELECT id from public.user_information where CONCAT(first_name , ' ' , middle_name , ' ' , last_name) ILIKE '%${search}%' `;
      const userInformationRawResult = await sails
        .sendNativeQuery(UserInformationRawSql, [])
        .meta({ skipRecordVerification: true });
      let userInformationSearchQueriesRows =
        userInformationRawResult?.rows?.map((row) => row?.id) || [];

      let userSearchQueriesRows = []
      if (userInformationSearchQueriesRows?.length > 0) {
        var userRawSql = `SELECT id from public.user where user_information_id IN ${arrayToTuple(
          userInformationSearchQueriesRows
        )}`;
        const userRawResult = await sails
          .sendNativeQuery(userRawSql, [])
          .meta({ skipRecordVerification: true });
        userSearchQueriesRows =
          userRawResult?.rows?.map((row) => row?.id) || [];
        
      }
      if (userSearchQueriesRows?.length > 0) {
        var applicationIdRawSql = `SELECT id from public.application where created_by IN ${arrayToTuple(
          userSearchQueriesRows
        )} `;
        const applicationIdRawResult = await sails
          .sendNativeQuery(applicationIdRawSql, [])
          .meta({ skipRecordVerification: true });
        applicationIdSearchQueriesRows =
          applicationIdRawResult?.rows?.map((row) => row?.id) || [];
        console.log({ applicationIdSearchQueriesRows });
        where["application"] = applicationIdSearchQueriesRows;
      }
    }
    await Payment.find(where)
      .populate("application")
      .sort("id DESC")
      // .limit(10)
      .meta({ skipRecordVerification: true })
      .exec(async function (err, result) {
        const results = [];
        for (let index = 0; index < result.length; index++) {
          const element = result[index];

          if (element?.application?.id) {
            const applicationData = await Application.findOne({
              id: element?.application?.id,
            })
              .populate("student")
              .populate("userInformationId");
            let receiptFile = "";

            const files = await ApplicationFile.find({
              applicationId: applicationData.id,
            })
              .sort("id DESC")
              .populate("fileId");
            if (files?.length > 0) {
              receiptFile = files?.filter(
                (file) =>
                  file?.fileSectionType === "application_fee_offline_payment"
              )?.[0]?.fileId?.url;
            }
            const userInformation = await User.findOne({
              id: applicationData?.createdBy,
            }).populate("userInformationId");
            element.application = {
              ...applicationData,
              userInfo: userInformation,
              receiptFile,
            };
          }
          results.push(element);
        }

        return exits.success(results);
      });

    // .populate("semester")
    // return exits.success(payments);
  },
};
