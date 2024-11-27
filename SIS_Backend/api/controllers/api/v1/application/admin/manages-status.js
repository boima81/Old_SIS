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
        message: "Application is required.",
      });
    }

    const inputData = {
      is_approved: inputs?.is_approved,
      reviewBy: userId,
      comment: inputs?.comment,
      application_status: inputs?.type,
      is_conditional: inputs?.is_approved && !!inputs?.comment,
      condition: inputs?.is_approved ? inputs?.comment : "",
    };
    console.log({ inputs, inputData });
    if (inputData?.application_status === "feedback") {
      inputData["is_completed"] = false;
      inputData["last_step_completed"] = 2;
    }

    let applicationData = await Application.updateOne({
      id: id,
    }).set(inputData);
    const notification = await sails.helpers.notification.with({
      type:
        inputData?.application_status === "feedback"
          ? "application_feedback"
          : inputData?.application_status === "approved"
          ? "application_approved"
          : "application_decline",
      id: userId,
      application: id,
    });
    // console.log({ notification });

    async function sendEmail(params, is_conditional) {
      let attachments = [];
      if (params === "application_approval" && applicationData.createdBy) {
        const baseUrl = sails.config.custom.baseUrl;
        console.log({ is_conditional });
        if (is_conditional) {
          const receiptGenerateData =
            await sails.helpers.letterOfAdmissionCondition.with({
              id: applicationData?.id,
              createdBy: applicationData.createdBy,
              type: "Letter Of Admission",
              conditions: is_conditional,
            });
          attachments = [
            {
              filename: receiptGenerateData?.fileName,
              path: `${baseUrl}${receiptGenerateData?.path}`,
              // cid: receiptGenerateData?.name,
            },
          ];
        } else {
          const receiptGenerateData =
            await sails.helpers.letterOfAdmission.with({
              id: applicationData?.id,
              createdBy: applicationData.createdBy,
              type: "Letter Of Admission",
            });
          attachments = [
            {
              filename: receiptGenerateData?.fileName,
              path: `${baseUrl}${receiptGenerateData?.path}`,
              // cid: receiptGenerateData?.name,
            },
          ];
        }
      }
      await sails.helpers.sendMails.with({
        userId: applicationData.createdBy,
        type: params,
        attachments,
      });
      return;
    }
    if (inputData?.application_status === "feedback") {
      await sendEmail("application_feedback");
    } else if (inputData?.application_status === "decline") {
      await sendEmail("application_deny");
    } else {
      console.log({ inputData });
      await sendEmail("application_approval", inputData?.comment);
    }

    return exits.success({
      message: "Application has been updated successfully.",
      data: applicationData,
    });
  },
};
