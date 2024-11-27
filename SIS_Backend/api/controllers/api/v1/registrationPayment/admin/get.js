module.exports = {
  friendlyName: "View Registration Fees",

  description: "Display Registration Fees",

  inputs: {},

  //   exits: {
  //     success: {
  //     }
  //   },

  fn: async function (inputs, exits) {
    await Payment.find({
      // payment_type: "offline",
      module_type: "registration",
    })
      .populate("application")
      .exec(async function (err, result) {
        const results = [];
        for (let index = 0; index < result.length; index++) {
          const element = result[index];

          if (element?.registration) {
            const registration = await Registration.findOne({
              id: element?.registration,
            });
            const applicationData = await Application.findOne({
              id: registration?.applicationId,
            })
              .populate("student")
              .populate("userInformationId");
            const userInformation = await User.findOne({
              id: applicationData?.createdBy,
            });
            const userInformationData = await UserInformation.findOne({
              id: userInformation?.userInformationId,
            }).populate("student");
            element.application = {
              ...registration,
              ...applicationData,
              userInfo: userInformation,
              userInformationData,
            };
            element.userInformationData = userInformationData;
          }
          results.push(element);
        }

        return exits.success(results);
      });

    // .populate("semester")
    // return exits.success(payments);
  },
};
