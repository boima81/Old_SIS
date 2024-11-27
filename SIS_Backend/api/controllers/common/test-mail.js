module.exports = {
  friendlyName: "Test mail",

  description: "",

  inputs: {
    emailAddress: {
      description:
        "The email address of the alleged user who wants to recover their password.",
      example: "rydahl@example.com",
      type: "string",
    },
    subject: {
      type: "string",
    },
    header: {
      type: "string",
    },
    body: {
      type: "string",
    },
    footer: {
      type: "string",
    },
  },

  exits: {
    success: {},
    showTemplate: {
      responseType: "view",
      viewTemplatePath: "emails/test-view",
    },
  },

  fn: async function (inputs, exits) {
    const { emailAddress, subject, header, body, footer } = inputs;
    let mailStatus = await sails.helpers.sendEmail.with({
      to: emailAddress || "pofojec414@brandoza.com",
      subject: subject || "Test subject",
      template: "common/email-template",
      typeOfSend: "now", // 'now', 'queue', 'preview'
      layout: "layout-email",
      templateData: {
        header: header || "test mail",
        body: body || "test body",
        footer: footer || "Copyrights &copy Company All Rights Reserved",
      },
    });

    return exits.success({
      data: mailStatus,
    });
    // if (
    //   mailStatus &&
    //   mailStatus.typeOfSend &&
    //   mailStatus.typeOfSend == "preview"
    // ) {
    //   return exits.showTemplate({
    //     emailHtmlStream: mailStatus.emailHtmlStream,
    //   });
    // }
    // return exits.success(mailStatus);
  },
};
