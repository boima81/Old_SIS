module.exports = {
  friendlyName: "Change Password",

  description: "Change Password user.",

  inputs: {
    oldPassword: {
      required: true,
      type: "string",
    },
    password: {
      required: true,
      type: "string",
      maxLength: 15,
      minLength: 6,
      example: "passwordlol",
      description: "The unencrypted password to use for the new account.",
    },
  },

  exits: {
    invalid: {
      statusCode: 409,
      description:
        "firstname, lastname, phonenumber, email and password is required.",
    },
    unique: {
      statusCode: 409,
      description: "email or phonenumber is already taken.",
    },
    redirect: {
      responseType: "redirect",
    },
    notFound: {
      statusCode: 404,
      description: "No file with the specified ID was found in the database.",
    },
  },
  fn: async function (inputs, exits) {

    const userId = this.req.userId;
    var user = await User.findOne({
      id: userId,
    });
    if (!user) {
      return exits.notFound({
        message: "User not found.",
      });
    }

    await sails.helpers.passwords
      .checkPassword(inputs.oldPassword, user.password)
      .intercept("incorrect", () => {
        return exits.invalid({
          type: "password",
          message: "Please check password it's not matched",
        });
      });

    let objUser = {};

    //   objUser.password = await sails.helpers.passwords.hashPassword(inputs.password);
    objUser.password = inputs.password;
    var updatedUser = await User.updateOne({
      id: userId,
    }).set(objUser);

    return exits.success({
      message: "User has been updated successfully.",
      data: user,
    });
  },
};
