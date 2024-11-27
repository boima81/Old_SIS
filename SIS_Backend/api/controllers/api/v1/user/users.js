const { orderBy } = require("lodash");

module.exports = {
  friendlyName: "View Users",

  description: "Display Users",

  inputs: {},

  //   exits: {
  //     success: {
  //     }
  //   },

  fn: async function (inputs, exits) {
    const role = this.req?.param("role");
    const registration = this.req?.param("registration");
    const application = this.req?.param("application");
    const search = this.req.param("search") || "";

    function arrayToTuple(arr) {
      return "(" + arr.map((item) => `'${item}'`).join(", ") + ")";
    }

    const where = {};

    if (role) {
      where["role"] = [role];
    }

    if ((registration && parseInt(registration)) || 0) {
      let applications = await Application.find({
        where: {
          is_completed: true,
          is_approved: true,
        },
        select: ["id", "createdBy"],
      });
      const applicationData = [];
      for (const data of applications) {
        console.log("application data", data.id);
        const findData = await Registration.find({
          where: {
            is_approved: false,
            is_completed: false,
            applicationId: data.id,
            registration_status: {
              nin: ["approved", "feedback"]
            },
          }
        }).sort("createdBy DESC")
        console.log("findData registration", findData);
        if (findData?.length <= 0) {
          applicationData.push(data);
        }
      }

      applications = applicationData
        ?.map(({ createdBy }) => createdBy)
        ?.filter((id) => id);
      console.log({ applicationData })
      if (applications?.length > 0) {
        where["id"] = applications;
      }
    }

    if ((application && parseInt(application)) || 0) {
      // let applications = await Application.find({
      //   where: {
      //     is_completed: true,
      //     is_approved: true,
      //   },
      //   select: ["id", "createdBy"],
      // });
      // applications = applications
      //   ?.map(({ createdBy }) => createdBy)
      //   ?.filter((id) => id);
      // if (applications?.length > 0) {
      //   where["id"] = applications;
      where["applicationId"] = null;
      // }
    }
    if (search) {
      var UserInformationRawSql = `SELECT id from public.user_information where first_name ILIKE '%${search}%' OR middle_name ILIKE '%${search}%' OR last_name ILIKE '%${search}%' OR CONCAT(first_name , ' ' , middle_name , ' ' , last_name) ILIKE '%${search}%' `;
      const userInformationRawResult = await sails
        .sendNativeQuery(UserInformationRawSql, [])
        .meta({ skipRecordVerification: true });
      let userInformationSearchQueriesRows =
        userInformationRawResult?.rows?.map((row) => row?.id) || [];

      var userRawSql = `SELECT id from public.user where email ILIKE '%${search}%'`;
      if (userInformationSearchQueriesRows?.length > 0) {
        userRawSql += `OR user_information_id IN ${arrayToTuple(
          userInformationSearchQueriesRows
        )}`;
      }
      const userRawResult = await sails
        .sendNativeQuery(userRawSql, [])
        .meta({ skipRecordVerification: true });
      let userSearchQueriesRows =
        userRawResult?.rows?.map((row) => row?.id) || [];
      console.log({ userSearchQueriesRows });
      where["id"] = userSearchQueriesRows;
    }

    let user = await User.find(where)
      .sort("id DESC")
      .populate("userInformationId")
      .meta({ skipRecordVerification: true });
    return exits.success(user);
  },
};
