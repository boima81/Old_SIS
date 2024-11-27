/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  fetchRecordsOnUpdate: true,
  primaryKey: "id",
  attributes: {
    email: {
      type: "string",
      required: true,
      unique: true,
      isEmail: true,
    },
    password: {
      type: "string",
      required: true,
      protect: true,
    },
    userInformationId: {
      model: "userInformation",
      // via: "user",
      unique: true,
      columnName: "user_information_id",
    },
    application: {
      collection: "application",
      via: "reviewBy",
    },
    applicationId: {
      model: "application",
      columnName: "application_id",
    },
    courses: {
      collection: "course",
      via: "createdBy",
    },
    programs: {
      collection: "program",
      via: "createdBy",
    },
    semesters: {
      collection: "semester",
      via: "createdBy",
    },
    invoice: {
      collection: "invoice",
      via: "createdBy",
    },
    role: {
      type: "string",
      isIn: [
        "student",
        "admission",
        "academics",
        "finance",
        "instructors",
        "admin",
      ],
      defaultsTo: "student",
    },
    avatarFile: {
      model: "fileUpload",
      columnName: "avatar_file_id",
    },
    isForgotPass: {
      type: "boolean",
      defaultsTo: false,
    },
    balanceFees: {
      collection: "balanceFees",
      via: "user",
    },
    student: {
      collection: "student",
      via: "user",
    },
    loginAt: { type: "ref", columnType: "datetime" },
    isAgency: {
      type: "boolean",
      defaultsTo: false,
      columnName: "is_agency",
    },
    agencyId: {
      model: "agency",
      columnName: "agency_id",
    },
    agencyName: {
      type: "string",
      allowNull: true,
      columnName: "agency_name",
    },
    // emailStatus: {
    //   type: 'string',
    //   isIn: ['unconfirmed', 'change-requested', 'confirmed'],
    //   defaultsTo: 'confirmed',
    //   description: 'The confirmation status of the user\'s email address.',
    // },
    // emailProofToken: {
    //   type: 'string',
    //   description: 'A pseudorandom, probabilistically-unique token for use in our account verification emails.'
    // },

    // emailProofTokenExpiresAt: {
    //   type: 'number',
    //   description: 'A JS timestamp (epoch ms) representing the moment when this user\'s `emailProofToken` will expire (or 0 if the user currently has no such token).',
    //   example: 1502844074211
    // },
  },
  customToJSON: function () {
    const data = {
      ...this,
      role: [this?.role || ""],
    };
    // Return a shallow copy of this record with the password and ssn removed.
    return _.omit(data, ["password"]);
  },

  beforeCreate: async function (valuesToSet, proceed) {
    // Hash password
    await sails.helpers.passwords
      .hashPassword(valuesToSet.password)
      .exec((err, hashedPassword) => {
        if (err) {
          return proceed(err);
        }
        valuesToSet.password = hashedPassword;
        valuesToSet.email = valuesToSet?.email?.toLowerCase();
        return proceed();
      });
  },

  afterCreate: async function (valuesToSet, proceed) {
    // if (sails.config.custom.verifyEmailAddresses) {
    //   await sails.helpers.sendEmail.with({
    //     to: valuesToSet.email,
    //     subject: "Please confirm your account",
    //     template: "email-verify-account",
    //     layout: "layout-email",
    //     typeOfSend: "queue", // 'now', 'queue', 'preview'
    //     templateData: {
    //       id: valuesToSet.id,
    //       fullName: valuesToSet.firstName + " " + valuesToSet.lastName,
    //       // token: valuesToSet.verificationToken,
    //     },
    //   });
    // } else {
    //   sails.log.info(
    //     "Skipping new account email verification... (since `verifyEmailAddresses` is disabled)"
    //   );
    // }
    return proceed();
  },

  beforeUpdate: async function (valuesToSet, proceed) {
    if (valuesToSet.password) {
      await sails.helpers.passwords
        .hashPassword(valuesToSet.password)
        .exec((err, hashedPassword) => {
          if (err) {
            return proceed(err);
          }

          valuesToSet.password = hashedPassword;
          return proceed();
        });
    }
    return proceed();
  },

  //   afterUpdate: function (valuesToSet, proceed) {
  //     return proceed();
  //   },

  //   beforeDestroy: function (valuesToSet, proceed) {
  //     return proceed();
  //   },

  //   afterDestroy: function (valuesToSet, proceed) {
  //     return proceed();
  //   },
};
