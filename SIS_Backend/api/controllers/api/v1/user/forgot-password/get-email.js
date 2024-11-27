module.exports = {
  friendlyName: "Get email for forgot password",

  description: "Get Email",

  inputs: {
    email: {
      type: "string",
      description: "take the email to send forgot-password link",
    },
  },

  exits: {
    success: {},
  },

  fn: async function (inputs, exits) {
    const { email } = inputs;

    const getUser = await User.findOne({ email }).populate("userInformationId");
    const getToken = await jwToken.forgotIssue({
      email: email,
      id: getUser?.id,
    });
    var frontendUrl = sails.config.custom.frontendUrl;

    let applicationSetting = await ApplicationSettings.find()
      .limit(1)
      .populate("logo");
    applicationSetting = applicationSetting?.[0];

    const mailStatus = await sails.helpers.sendEmail.with({
      to: email,
      subject: "Reset password",
      template: "email-reset-password",
      typeOfSend: "now", // 'now', 'queue', 'preview'
      layout: "layout-email",
      templateData: {
        fullName: getUser?.userInformationId?.first_name,
        token: getToken,
        url: `${frontendUrl}/reset-password`,
        logo:
          applicationSetting?.logo?.url ||
          `${sails.config.custom.baseUrl}/images/logo.png`,
      },
    });
    console.log("mailStatus", mailStatus);
    await User.updateOne({ email: email }).set({
      isForgotPass: true,
    });
    return exits.success(getUser);
  },
};
