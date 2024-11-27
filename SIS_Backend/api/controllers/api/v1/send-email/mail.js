module.exports = {
  friendlyName: "Mails",

  description: "Send mail",

  inputs: {
    receiverId: {
      type: "string",
      defaultsTo: "princebhut203@gmail.com",
      // required: true,
      description: "Add receiver email-id to send the mail",
    },
    messageType: {
      type: "string",
      defaultsTo: "registration-approval",
      isIn: [
        "application-approval",
        "application-by-admin",
        "registration-approval",
        "registration-by-admin",
      ],
      // required: true,
      description: "Which type of mail you want to send",
    },
  },

  exits: {
    invalid: {
      statusCode: 404,
      description: "All field is required.",
    },
    success: {
      statusCode: 200,
      description: "Email send",
    },
  },

  fn: async function (inputs, exits) {
    const { receiverId, messageType } = inputs;
    let mailStatus;
    switch (messageType) {
      case "application-approval":
        mailStatus = await sails.helpers.sendEmail.with({
          to: receiverId,
          subject: "Your account has been updated",
          //   template: "email-verify-new-email",
          template: "internal/email-application-approval",
          typeOfSend: "now", // 'now', 'queue', 'preview'
          layout: "layout-email",
          templateData: {
            fullName: "ak",
            //   token: 'my Token'
          },
        });
        console.log("mailStatus", mailStatus);
        break;

      case "application-by-admin":
        mailStatus = await sails.helpers.sendEmail.with({
          to: receiverId,
          subject: "Your account has been updated",
          template: "internal/email-application-by-admin",
          typeOfSend: "now", // 'now', 'queue', 'preview'
          layout: "layout-email",
          templateData: {
            fullName: "ak",
            //   token: 'my Token'
          },
        });
        console.log("mailStatus", mailStatus);
        break;

      case "registration-approval":
        mailStatus = await sails.helpers.sendEmail.with({
          to: receiverId,
          subject: "Your account has been updated",
          template: "internal/email-registration-approval",
          typeOfSend: "now", // 'now', 'queue', 'preview'
          layout: "layout-email",
          templateData: {
            fullName: "ak",
            //   token: 'my Token'
          },
        });
        console.log("mailStatus", mailStatus);
        break;

      case "registration-by-admin":
        mailStatus = await sails.helpers.sendEmail.with({
          to: receiverId,
          subject: "Your account has been updated",
          template: "internal/email-registration-by-admin",
          typeOfSend: "now", // 'now', 'queue', 'preview'
          layout: "layout-email",
          templateData: {
            fullName: "ak",
            //   token: 'my Token'
          },
        });
        console.log("mailStatus", mailStatus);
        break;

      default:
        return exits.invalid({
          message: "Something went wrong",
        });
    }
    if (mailStatus.status) {
      return exits.success({
        message: "Email send successfully",
      });
    } else {
      return exits.invlaid({
        message: "Email did not send",
      });
    }
  },
};
