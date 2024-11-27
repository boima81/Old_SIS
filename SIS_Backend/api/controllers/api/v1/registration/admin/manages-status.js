module.exports = {
  friendlyName: "Manage Status",

  description: "Manage Status Registration.",

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
    const baseUrl = sails.config.custom.baseUrl;
    // "https://avcschoolmanagement.loca.lt";

    const id = inputs?.id;
    const userId = this.req.userId;

    if (!id) {
      return exits.invalid({
        message: "Registration is required.",
      });
    }

    let receiptGenerateData = {};
    if (inputs?.is_approved) {
      const registrationUser = await Registration.findOne({
        id,
      });
      receiptGenerateData = await sails.helpers.generateInvoice.with({
        id: id,
        createdBy: registrationUser?.createdBy,
        type: "receipt",
      });
      if (receiptGenerateData?.error) {
        return exits.invalid({
          message: receiptGenerateData?.error,
        });
      }
    }

    const inputDataPayment = {
      reviewBy: userId,
      comment: inputs?.comment,
      admin_payment_status: inputs?.type,
      approve_payment: inputs?.is_approved,
    };

    let paymentInformation = await Payment.find({
      registration: id,
    })
      .sort("id DESC")
      .limit(1);
    paymentInformation = paymentInformation?.[0] || {};
    await Payment.updateOne({
      id: paymentInformation?.id,
    }).set(inputDataPayment);
    const inputData = {
      is_approved: inputs?.is_approved,
      reviewBy: userId,
      comment: inputs?.comment,
      registration_status: inputs?.type,
      isPaymentApprove: inputs?.is_approved,
    };
    if (paymentInformation?.registration) {
      if (inputData?.registration_status === "feedback") {
        inputData["is_completed"] = false;
        inputData["last_step_completed"] = 0;
      }

      let registrationData = await Registration.updateOne({
        id: id,
      }).set(inputData);
      if (inputData.is_approved) {
        const notification = await sails.helpers.notification.with({
          type: "registration_complete",
          id: userId,
          registration: id,
        });
        await sails.helpers.sendMails.with({
          userId: registrationData?.createdBy,
          type: "registration_complete",
        });
        console.log({
          path: `${baseUrl}${receiptGenerateData?.path}`,
        });
        await sails.helpers.sendMails.with({
          userId: registrationData?.createdBy,
          type: "invoice",
          attachments: [
            {
              filename: receiptGenerateData?.fileName,
              path: `${baseUrl}${receiptGenerateData?.path}`,
              // "https://api.avcstudentportal.com/invoice/11/4/receipt.pdf",
              // cid: receiptGenerateData?.name,
            },
          ],
        });
      }
    }

    return exits.success({
      message: "Registration has been updated successfully.",
      data: { id, ...inputData },
    });
  },
};
