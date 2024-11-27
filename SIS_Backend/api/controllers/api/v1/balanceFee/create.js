module.exports = {
  friendlyName: "Create Update",

  description: "Create Update Registration Fees.",

  inputs: {
    id: {
      type: "number",
      required: false,
    },
    amount: {
      type: "number",
      required: true,
      description: "Amount is required.",
    },
    offline_payment_receipt_file: {
      type: "ref",
    },
  },
  exits: {
    invalid: {
      statusCode: 409,
      description: "All field is required.",
    },
    redirect: {
      responseType: "redirect",
    },
  },

  fn: async function (inputs, exits) {
    try {
      const userId = this.req.userId;
      const offlinePaymentFile = inputs.offline_payment_receipt_file;
      const user = await User.findOne(userId);
      if (!offlinePaymentFile) {
        return exits.invalid({
          message: `Please upload the file`,
        });
      }
      if (!user?.applicationId) {
        return exits.invalid({
          message: `Application Not created`,
        });
      }
      let registrationData = await Registration.find({
        createdBy: userId,
        is_completed: true,
        is_approved: true,
      });
      registrationData = registrationData?.[0];
      if (!registrationData?.id) {
        return exits.invalid({
          message: `Registration Not approved pls create or complete registration`,
        });
      }

      let balanceFeesData = await BalanceFees.find({
        user: userId,
        or: [{ balance_fees_status: null }, { approved_payment: null }],
      }).meta({ skipRecordVerification: true });
      if (balanceFeesData?.length > 0) {
        return exits.invalid({
          message: `Already request pending once admin will approve you will pay another amount`,
        });
      }
      const newData = {
        user: userId,
        application: user?.applicationId,
        registration: registrationData?.id,
        balance_pay: inputs?.amount,
        payment_type: "offline",
        balance_fees_status: "pending",
      };
      let balanceFees = await BalanceFees.create(newData)
        .intercept((error) => {
          console.log({ error });
          return error;
        })
        .fetch();

      if (balanceFees?.id && offlinePaymentFile) {
        if (offlinePaymentFile) {
          const offlinePaymentFileData = offlinePaymentFile?.map((item) => ({
            fileSectionType: "balance_fee_offline_payment",
            fileId: item,
            balanceFeeId: balanceFees?.id,
          }));
          const fileUpload = await ApplicationFile.createEach(
            offlinePaymentFileData
          );
        }
      }

      return exits.success(balanceFees);
    } catch (error) {
      console.log({ error });
      return exits.invalid({
        error: "something went wrong",
      });
    }
  },
};
