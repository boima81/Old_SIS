module.exports = {
  friendlyName: "Manage Status",

  description: "Manage Status Application.",

  inputs: {
    type: {
      type: "string",
      required: true,
    },
    comment: {
      type: "string",
      required: false,
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
      comment: inputs?.comment,
      admin_payment_status: inputs?.type,
      approve_payment: inputs?.is_approved,
    };

    const paymentInformation = await Payment.findOne({
      id,
    });
    await Payment.updateOne({
      id,
    }).set(inputData);
    console.log({ paymentInformation, inputs });
    if (paymentInformation?.application) {
      await Application.updateOne({
        id: paymentInformation?.application,
      }).set({
        last_step_completed: inputs?.is_approved ? 2 : 0,
        isPaymentApprove: inputs?.is_approved,
        comment: inputs?.is_approved ? null : inputs?.comment,
      });
      if (inputs?.is_approved) {
        const notification = await sails.helpers.notification.with({
          type: "application_fee_approve",
          id: userId,
          application: paymentInformation?.application,
          keyValue: paymentInformation?.amount,
        });
      }
    }

    return exits.success({
      message: "Payment has been updated successfully.",
      data: paymentInformation,
    });
  },
};
