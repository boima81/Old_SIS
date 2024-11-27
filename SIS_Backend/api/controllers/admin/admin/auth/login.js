module.exports = {
  friendlyName: "Login",

  inputs: {
    email: {
      description: 'The email to try in this attempt, e.g. "irl@example.com".',
      type: "string",
      required: true,
    },

    password: {
      description: 'The unencrypted password to try in this attempt, e.g. "passwordlol".',
      type: "string",
      required: true,
    },
  },

  exits: {
    success: {
      description: "The requesting user agent has been successfully logged in.",
    },

    badCombo: {
      description: `The provided email and password combination does not
      match any user in the database.`,
      responseType: "unauthorized",
      // ^This uses the custom `unauthorized` response located in `api/responses/unauthorized.js`.
      // To customize the generic "unauthorized" response across this entire app, change that file
      // (see api/responses/unauthorized).
      //
      // To customize the response for _only this_ action, replace `responseType` with
      // something else.  For example, you might set `statusCode: 498` and change the
      // implementation below accordingly (see http://sailsjs.com/docs/concepts/controllers).
    },

    redirect: {
      description: "The requesting user is already logged in.",
      responseType: "redirect",
    },
  },

  fn: async function(inputs) {
    // console.log("user login inputs data :- ", inputs.email,inputs.password);

    // Look up by the email address.
    // (note that we lowercase it to ensure the lookup is always case-insensitive,
    // regardless of which database we're using)

    var userRecord = await Admin.findOne({
      email: inputs.email.toLowerCase(),
    });
    // console.log("user is login ", userRecord);

    // If there was no matching user, respond thru the "badCombo" exit.
    if (!userRecord) {
      throw "badCombo";
    }
    console.log("after if check ");

    // If the password doesn't match, then also exit thru "badCombo".
    await sails.helpers.passwords
      .checkPassword(inputs.password, userRecord.password)
      .intercept("incorrect", "badCombo");
    if (inputs.rememberMe) {
      if (this.req.isSocket) {
        sails.log.warn(
          "Received `rememberMe: true` from a virtual request, but it was ignored\n" +
            "because a browser's session cookie cannot be reset over sockets.\n" +
            "Please use a traditional HTTP request instead."
        );
      } else {
        this.req.session.cookie.maxAge = sails.config.custom.rememberMeCookieMaxAge;
      }
    } //ﬁ
    // console.log("this request data :- ", this.req);

    // Modify the active session instance.
    // (This will be persisted when the response is sent.)
    this.req.session.admin = userRecord;
    this.req.session.adminId = userRecord.id;
    throw {
      redirect: "/admin/dashboard",
    };
  },
};
