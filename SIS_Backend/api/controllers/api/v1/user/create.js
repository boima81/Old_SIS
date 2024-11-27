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

    var userInfoRecord = await UserInformation.create({
      first_name: inputs.firstName,
      last_name: inputs.lastName,
      phone_number: inputs.phoneNumber,
      phone_number_country_code: inputs.phoneNumber_country,
      //   password: await sails.helpers.passwords.hashPassword(inputs.password),
    })
      .intercept("E_UNIQUE", (err) => {
        return exits.invalid({
          type: err?.attrNames?.[0],
          message: err?.message,
        });
      })
      .fetch();

    if (!userInfoRecord) {
      return exits.invalid({
        type: "email",
        message: "Please check some information not correct",
      });
    }
    const userRecord = await User.create({
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
      })
      .fetch();

    if (userRecord.role === "student") {
      let applicationSetting = await ApplicationSettings.find().limit(1);
      applicationSetting = applicationSetting?.[0];
      let prefix = applicationSetting?.course_prefix || "ST";
      const year = moment().format("YY");
      prefix += `${year}${userRecord?.id}`;
      const student = await Student.create({
        student_id: prefix,
        user: userRecord.id,
      })
        .intercept("E_UNIQUE", (err) => {
          return exits.invalid({
            type: err?.attrNames?.[0],
            message: err?.message,
          });
        })
        .fetch();

      var updatedUser = await UserInformation.updateOne({
        id: userInfoRecord.id,
      }).set({
        student: student.id,
      });
    }

    console.log("updatedUser.email", userRecord.email);
    await sails.helpers.sendMails.with({
      userId: userRecord.id,
      type: "new_registered_user",
    });
    console.log("userRecord", userRecord);
    return exits.success({
      message: "User has been created successfully.",
      data: userRecord,
    });
  },
};
