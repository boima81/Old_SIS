module.exports = {
  friendlyName: "Manage Status",

  description: "Manage Status Application.",

  inputs: {
    type: {
      type: "string",
      required: true,
    },
    is_approved: {
      type: "boolean",
      required: false,
    },
    id: {
      type: "number",
      required: false,
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
    const id = inputs?.id;
    const userId = this.req.userId;
    // const userWithApplication = await User.findOne({ id: userId }).populate(
    //   "applicationId"
    // );
    if (!id) {
      return exits.invalid({
        message: "Payment is required.",
      });
    }

    const inputData = {
      reviewBy: userId,
      balance_fees_status: inputs?.type,
      approved_payment: inputs?.is_approved,
    };

    const balanceFeesInfo = await BalanceFees.findOne({
      id,
    });

    console.log({ balanceFeesInfo, inputs });
    if (balanceFeesInfo?.id) {
      await BalanceFees.updateOne({
        id: balanceFeesInfo?.id,
      }).set(inputData);
      if (inputData?.approved_payment) {
        let invoiceData = await Invoice.find({
          createdBy: balanceFeesInfo?.user,
        })
          .sort("id DESC")
          .limit(1);
        invoiceData = invoiceData?.[0];
        if (invoiceData) {
          invoiceData = await Invoice.updateOne({
            id: invoiceData?.id,
          }).set({
            amount_paid:
              parseFloat(invoiceData?.amount_paid || 0) +
              parseFloat(balanceFeesInfo?.balance_pay || 0),
            paidBy: balanceFeesInfo?.user,
          });
        }
      }
    }

    return exits.success({
      message: "Balance Fees has been updated successfully.",
      data: balanceFeesInfo,
    });
  },
};
