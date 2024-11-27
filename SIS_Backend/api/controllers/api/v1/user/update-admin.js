var moment = require("moment");
module.exports = {
  friendlyName: "Create",

  description: "Create User.",

  inputs: {
    firstName: {
      type: "string",
      required: true,
      description: "The first name is required.",
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
    userType: {
      type: "string",
      required: false,
    },
    email: {
      required: true,
      unique: true,
      type: "string",
      isEmail: true,
      description: "The email address for the new account, e.g. m@example.com.",
      extendedDescription: "Must be a valid email address.",
      maxLength: 50,
    },
    password: {
      required: true,
      type: "string",
      maxLength: 15,
      minLength: 6,
      example: "passwordlol",
      description: "The unencrypted password to use for the new account.",
    },
    isAgency: {
      type: "boolean",
      defaultsTo: false,
    },
    agencyId: {
      type: "number",
      required: false,
      allowNull: true,
    },
    agencyName: {
      type: "string",
      required: false,
      allowNull: true,
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
    // try {
    //   Object.entries(inputs).forEach(([key, value]) => {
    //     if (value == "") {

    //       // return true;
    //       throw `${key} must be required`
    //     }
    //   });
    // } catch (error) {
    //   return exits.badRequest({
    //     statusCode: 400,
    //     message: sails.__(error),
    //   });
    // }
    const userId = this.req.params.userId;
    const userData = await User.findOne({
      id: userId,
    });
    if (!userData?.id) {
      return exits.invalid({
        type: "user",
        message: "User not found",
      });
    }
    const userInfoParams = {
      first_name: inputs.firstName,
      last_name: inputs.lastName,
      phone_number: inputs.phoneNumber,
      phone_number_country_code: inputs.phoneNumber_country,
    };
    if (userData?.userInformationId) {
      var userInfoRecord = await UserInformation.updateOne({
        id: userData?.userInformationId,
      }).set(userInfoParams);
    } else {
      var userInfoRecord = await UserInformation.create(userInfoParams).fetch()
    }

    const userRecord = await User.updateOne({
      id: userData?.id,
    })
      .set({
        email: inputs.email,
        password: inputs.password,
        userInformationId: userInfoRecord.id,
        role: inputs?.userType || "student",
        isAgency: inputs.isAgency,
        agencyId: inputs.agencyId,
        agencyName: inputs.agencyName,
      })
      .intercept("E_UNIQUE", (err) => {
        return exits.invalid({
          type: err?.attrNames?.[0],
          message: err?.message,
        });
      });

    return exits.success({
      message: "User has been created successfully.",
      data: userRecord,
    });
  },
};
