module.exports = {
  friendlyName: "View Payment Fees",

  description: "Display Payment Fees",

  inputs: {},

  exits: {
    success: {},
    invalid: {},
  },

  fn: async function (inputs, exits) {
    try {
      const userId = this.req.userId;
      const userRole = this.req.userRole;
      const registrationId = this.req.params["registrationId"];
      console.log("registrationId", registrationId);
      const list = await PaymentHistory.find({
        registration_id: registrationId,
      })
        .sort("id DESC")
        .populateAll();

      for (const data of list) {
        const findUser = await User.findOne({
          userInformationId: data?.added_by?.userInformationId,
        }).populate("userInformationId");

        data.added_by = `${findUser?.userInformationId?.first_name} ${findUser?.userInformationId?.last_name}`;
      }

      return exits.success({
        message: "Payment history fetched successfully",
        data: list || [],
      });
    } catch (error) {
      console.log("error", error);
      return exits.invalid({ message: "Something went wrong" });
    }
  },
};
