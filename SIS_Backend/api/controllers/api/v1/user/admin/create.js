module.exports = {
  friendlyName: "Update",

  description: "Update user.",

  inputs: {
    user: {
      type: "string",
      required: true,
      description: "User required",
    },
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
    // email: {
    //   type: "string",
    //   required: true,
    //   unique: true,
    //   isEmail: true,
    //   description: "The email address for the new account, e.g. m@example.com.",
    //   extendedDescription: "Must be a valid email address.",
    //   maxLength: 50,
    // },
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
    dateOfBirth: {
      type: "string",
      required: true,
    },
    // avatarFile: {
    //   type: "number",
    //   required: false,
    // },
    programs: {
      type: "number",
      required: false,
    },
    semesters: {
      type: "number",
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
    notFound: {
      statusCode: 404,
      description: "No file with the specified ID was found in the database.",
    },
  },
  fn: async function (inputs, exits) {
    // return "get in update";

    // const userId = this.req.params.id;
    var userId = inputs?.user;
    var user = await User.findOne({
      id: userId,
    }).populate("userInformationId");
    // email: user.email,
    if (user?.userInformationId) {
      return exits.notFound({
        message: "Student Already created for this user please update",
      });
    }
    let newData = {};

    newData.first_name = inputs.firstName;
    newData.middle_name = inputs.middleName;
    newData.last_name = inputs.lastName;
    newData.phone_number = inputs.phoneNumber;
    newData.phone_number_country_code =
      inputs?.phoneNumberCountryCode || "+234";
    // newData.email = inputs.email;
    newData.country = inputs.country;
    newData.city = inputs.city;
    newData.nationality = inputs.nationality;
    newData.date_of_birth = inputs.dateOfBirth;
    newData.gender = inputs.gender;
    if (inputs?.programs) {
      newData.programs = inputs.programs;
    }
    if (inputs?.semesters) {
      newData.semesters = inputs.semesters;
    }

    var updatedUserInformation = await UserInformation.create(newData)
      .intercept((error) => {
        console.log({ error });
        return error;
      })
      .fetch();

    const userData = await User.updateOne({
      id: userId,
    }).set({
      userInformationId: updatedUserInformation?.id,
    });

    return exits.success({
      message: "User has been updated successfully.",
      data: updatedUserInformation,
    });
  },
};