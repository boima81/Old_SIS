module.exports = {
  friendlyName: "Forgot password",

  description: "Forgot password",

  inputs: {
    password: {
      type: "string",
      description: "create new password",
    },
    confirmPassword: {
      type: "string",
      description: "match with new password",
    },
  },

  exits: {
    success: {},
    invalid: {},
  },

  fn: async function (inputs, exits) {
    const userId = this.req.userId;
    const { password, confirmPassword } = inputs;

    const findUser = await User.findOne({ id: userId, isForgotPass: true });

    if (!findUser) {
      return exits.invalid({
        message: "Link is broken",
      });
    }

    if (password === confirmPassword) {
      // const setNewPass = await sails.helpers.passwords.hashPassword(password);
      var updatedUser = await User.updateOne({ id: userId }).set({
        password,
        isForgotPass: false,
      });
      if (updatedUser) {
        await sails.helpers.sendMails.with({
          userId: updatedUser.id,
          type: "password_reset",
        });

        return exits.success({
          message: "User password reset successfully",
        });
      }
    } else {
      await User.updateOne({ id: userId }).set({
        isForgotPass: false,
      });
      return exits.invalid({
        message: "Both password not match",
      });
    }
  },
};
