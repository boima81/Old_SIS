var moment = require("moment");
module.exports = {
  friendlyName: "Login",

  inputs: {
    email: {
      description: 'The email to try in this attempt, e.g. "irl@example.com".',
      type: "string",
      required: true,
    },

    password: {
      description:
        'The unencrypted password to try in this attempt, e.g. "passwordlol".',
      type: "string",
      required: true,
    },
  },

  exits: {
    invalid: {
      statusCode: 401,
      description: "email or password not matched",
    },
    success: {
      description: "The requesting user agent has been successfully logged in.",
    },

    badCombo: {
      description: `The provided email and password combination does not
      match any user in the database.`,
      responseType: "unauthorized",
    },

    redirect: {
      description: "The requesting user is already logged in.",
      responseType: "redirect",
    },
  },

  fn: async function (inputs, exits) {
    const userRecord = await User.findOne({
      email: inputs.email.toLowerCase(),
    }).populate("userInformationId");

    // If there was no matching user, respond thru the "badCombo" exit.
    if (!userRecord) {
      return exits.invalid({
        type: "email",
        message: "User not register please check your email",
      });
    }
    // If the password doesn't match, then also exit thru "badCombo".
    await sails.helpers.passwords
      .checkPassword(inputs.password, userRecord.password)
      .intercept("incorrect", () => {
        return exits.invalid({
          type: "password",
          message: "Please check password it's not matched",
        });
      });

    this.req.session.userId = userRecord.id;
    const userData = {
      ...userRecord,
      data: userRecord?.userInformationId,
      role: userRecord?.role,
    };

    let presidentMessage = "";
    if (userRecord?.id) {
      const applicationSetting = await ApplicationSettings.find().limit(1);
      if (!userRecord?.loginAt) {
        presidentMessage = applicationSetting?.[0]?.president_message;
      }
      await User.updateOne({ id: userRecord?.id }).set({
        loginAt: moment().format(),
      });
    }

    exits.success({
      user: userData,
      access_token: jwToken.issue({
        id: userRecord.id,
      }),
      presidentMessage,
      message: "login successfully",
    });
  },
};
