module.exports = {
  friendlyName: "Update",

  description: "Update user.",

  inputs: {
    userId: {
      type: "string",
    },
    id: {
      type: "number",
    },
    firstName: {
      type: "string",
      required: true,
    },
    lastName: {
      type: "string",
      required: true,
    },
    email: {
      unique: true,
      required: true,
      type: "string",
      isEmail: true,
      description: "The email address for the new account, e.g. m@example.com.",
      extendedDescription: "Must be a valid email address.",
    },
    password: {
      required: false,
      type: "string",
      maxLength: 15,
      minLength: 6,
      example: "",
      description: "The unencrypted password to use for the new account.",
    },
    phoneNumber: {
      type: "string",
      required: true,
    },
    phoneNumber_country: {
      type: "string",
      required: true,
    },
    userType: {
      type: "string",
      required: false,
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
  },

  fn: async function (inputs, exits) {
    let objUser = {
      // firstName: inputs.firstName,
      // lastName: inputs.lastName,
      email: inputs.email,
    };
    const userInfo = {
      firstName: inputs.firstName,
      lastName: inputs.lastName,
      phone_number: inputs.phoneNumber,
      phone_number_country_code: inputs.phoneNumber_country,
    }
    if (inputs?.password) {
      objUser['password'] = inputs.password
    }
    if (inputs?.userType) {
      objUser['roles'] = inputs.userType
    }
    const userId = inputs.userId
    const user = await User.findOne({
      id: userId,
    }).populate("userInformationId");

    console.log({ userid: inputs.userId })
    // await User.replaceCollection(inputs.userId, "roles").members(inputs.roles);

    await User.update({
      id: userId,
    }).set(objUser)

    if (user?.userInformationId) {
      var updatedUserInformation = await UserInformation.updateOne({
        id: user?.userInformationId?.id,
      }).set(userInfo);
    }

    return exits.success({
      message: "User has been created successfully.",
      data: objUser,
    });

    // throw {
    //   redirect: "/admin/users",
    // };
  },
};
