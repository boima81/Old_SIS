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
    const search = this.req.param("search") || "";
    function arrayToTuple(arr) {
      return "(" + arr.map((item) => `'${item}'`).join(", ") + ")";
    }
    let where = {};
    if (search) {
      var UserInformationRawSql = `SELECT id from public.user_information where first_name ILIKE '%${search}%' OR middle_name ILIKE '%${search}%' OR last_name ILIKE '%${search}%' OR CONCAT(first_name , ' ' , middle_name , ' ' , last_name) ILIKE '%${search}%' `;
      const userInformationRawResult = await sails
        .sendNativeQuery(UserInformationRawSql, [])
        .meta({ skipRecordVerification: true });
      let userInformationSearchQueriesRows =
        userInformationRawResult?.rows?.map((row) => row?.id) || [];
      console.log({ userInformationSearchQueriesRows });

      let userSearchQueriesRows = [];
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
      where["user"] = userSearchQueriesRows;
    }
    await BalanceFees.find(
      // {
      // user: userId,
      // or: [{ approved_payment: null }, { approved_payment: false }],
      // }
      where
    )
      .populate("user")
      .meta({ skipRecordVerification: true })
      .sort("id desc")
      .exec(async function (err, result) {
        const results = [];
        for (let index = 0; index < result.length; index++) {
          const element = result[index];
          if (element?.user?.userInformationId) {
            let userInfo = await UserInformation.findOne(
              element?.user?.userInformationId
            ).select(["first_name", "last_name", "middle_name"]);

            userInfo = userInfo.toJSON();

            element.userInformation = {
              ...userInfo,
            };
          }
          const files = await ApplicationFile.find({
            balanceFeeId: element.id,
          })
            .populate("fileId")
            .sort("id desc")
            .limit(1);
          let application = null;
          if (element.application) {
            application = await Application.findOne(
              element.application
            ).populate("semesterId");
          }
          results.push({ ...element, application, files: files?.[0] });
        }

        return exits.success(results);
      });
  },
};
