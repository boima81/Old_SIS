module.exports = {
  friendlyName: "Update",

  description: "Update user.",

  inputs: {
    firstName: {
      type: "string",
      required: false,
      description: "The first name is required.",
    },
    middleName: {
      type: "string",
      required: true,
    },
    lastName: {
      type: "string",
      required: true,
    },
    phoneNumber: {
      type: "string",
      required: true,
    },
    phoneNumber_country: {
      type: "string",
      required: true,
    },
    country: {
      type: "string",
      required: true,
    },
    city: {
      type: "string",
      required: true,
    },
    nationality: {
      type: "string",
      required: true,
    },
    gender: {
      type: "string",
      required: true,
    },
    date_of_birth: {
      type: "string",
      required: true,
    },
    avatarFile: {
      type: "number",
      required: false,
      allowNull: true,
    },
    password: {
      required: false,
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
    }).populate("userInformationId");
    if (!user) {
      return exits.notFound({
        message: "User not found.",
      });
    }
    // email: user.email,
    let objUser = {};

    if (inputs.avatarFile) {
      objUser.avatarFile = inputs.avatarFile;
    }
    if (inputs.password) {
      //   objUser.password = await sails.helpers.passwords.hashPassword(inputs.password);
      objUser.password = inputs.password;
    }
    if (objUser) {
      var updatedUser = await User.updateOne({
        id: userId,
      }).set(objUser);
    }

    let newData = {};

    newData.first_name = inputs.firstName;
    newData.middle_name = inputs.middleName;
    newData.last_name = inputs.lastName;
    newData.phone_number = inputs.phoneNumber;
    newData.phone_number_country_code =
      inputs?.phoneNumberCountryCode || "+234";
    newData.email = inputs.email;
    newData.country = inputs.country;
    newData.city = inputs.city;
    newData.nationality = inputs.nationality;
    newData.date_of_birth = inputs.date_of_birth;
    newData.gender = inputs.gender;

    if (user?.userInformationId) {
      var updatedUserInformation = await UserInformation.updateOne({
        id: user?.userInformationId?.id,
      }).set(newData);
    }

    return exits.success({
      message: "User has been updated successfully.",
      data: updatedUserInformation,
    });
  },
};
