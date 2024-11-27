var moment = require("moment");

module.exports = {
  friendlyName: "Create Update",

  description: "Create Update Application Setting.",

  inputs: {
    president_message: {
      type: "ref",
      required: false,
      // allowNull: true,
    },
    course_prefix: {
      type: "string",
      require: true,
    },
    application_name: {
      type: "string",
      require: true,
    },
    application_color: {
      type: "string",
      require: true,
    },
    logo: {
      type: "number",
      required: false,
      allowNull: true,
    },
    favicon: {
      type: "number",
      required: false,
      allowNull: true,
    },
    privacy_policy: {
      type: "ref",
      required: false,
      // allowNull: true,
    },
    services: {
      type: "ref",
      required: false,
      // allowNull: true,
    },
    login_page_content: {
      type: "ref",
      required: false,
      // allowNull: true,
    },
    registration_page_content: {
      type: "ref",
      required: false,
      // allowNull: true,
    },
    forgot_password_page_content: {
      type: "ref",
      required: false,
      // allowNull: true,
    },
    reset_page_content: {
      type: "ref",
      required: false,
      // allowNull: true,
    },
    registration_started: {
      type: "boolean",
      required: false,
    },
    registrationSemester: {
      type: "number",
      required: false,
      allowNull: true,
    },
    registrationStartDate: {
      type: "string",
      required: false,
      allowNull: true,
    },
    registrationEndDate: {
      type: "string",
      required: false,
      allowNull: true,
    },
    registration: {
      type: "boolean",
      defaultsTo: false,
    },
  },
  exits: {
    invalid: {
      statusCode: 409,
      description: "All field is required.",
    },
    redirect: {
      responseType: "redirect",
    },
  },

  fn: async function (inputs, exits) {
    let applicationSettingDetail = await ApplicationSettings.find().limit(1);
    const applicationId = applicationSettingDetail?.[0]?.id;
    let convertStartDate = null;
    let convertEndDate = null;

    if (inputs?.registrationStartDate) {
      convertStartDate = moment(inputs.registrationStartDate)
        .startOf("day")
        .format("YYYY-MM-DD");
    }
    if (inputs?.registrationEndDate) {
      convertEndDate = moment(inputs.registrationEndDate)
        .startOf("day")
        .format("YYYY-MM-DD");
    }

    const storeData = {
      ...inputs,
      president_message: inputs?.president_message || "",
      course_prefix: inputs?.course_prefix || "",
      application_name: inputs?.application_name || "",
      application_color: inputs?.application_color,
      privacy_policy: inputs?.privacy_policy,
      services: inputs?.services,
      login_page_content: inputs?.login_page_content,
      registration_page_content: inputs?.registration_page_content,
      forgot_password_page_content: inputs?.forgot_password_page_content,
      reset_page_content: inputs?.reset_page_content,
      registrationStartDate: convertStartDate,
      registrationEndDate: convertEndDate,
      registrationStarted: inputs.registration
    };
    if (inputs?.logo) {
      storeData["logo"] = inputs?.logo;
    }
    if (inputs?.favicon) {
      storeData["favicon"] = inputs?.favicon;
    }
    if (applicationId) {
      applicationSettingDetail = await ApplicationSettings.updateOne({
        id: applicationId,
      }).set(storeData);
    } else {
      applicationSettingDetail = await ApplicationSettings.create(storeData)
        .intercept((error) => {
          console.log({ error });
          return error;
        })
        .fetch();
    }
    return exits.success(applicationSettingDetail);
  },
};
