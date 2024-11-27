const he = require("he");
const { lte } = require("lodash");
var HTMLParser = require("node-html-parser");

module.exports = {
  friendlyName: "Send email",

  description: "",

  inputs: {
    userId: {
      type: "string",
      description: "Email you want to send",
      required: true,
    },
    type: {
      type: "string",
      description: "type of the email you want to send",
      required: true,
    },
    attachments: {
      type: "ref",
      required: false,
    },
    roleId: {
      type: "string",
      description: "Role Email you want to send",
      required: false,
    },

    role: {
      type: "string",
      required: false,
      defaultsTo: "student",
    },
  },

  exits: {
    // success: {
    //   viewTemplatePath: 'emails/test-view'
    // },
  },

  fn: async function (inputs, exits) {
    const { userId, role, roleId, type, attachments } = inputs;
    console.log("userId----->>>", userId);

    let email = "";
    if (role === "student") {
      const userEmail = await User.findOne({ id: userId }).select("email");
      email = userEmail?.email;
    } else {
      const userEmail = await User.findOne({ id: roleId }).select("email")
      email = userEmail?.email
    }
    console.log({ email });
    let studyData = await User.findOne({ id: userId })
      .populate("programs")
      .populate("semesters")
      .populate("userInformationId");
    console.log("studyData ----- >>>", studyData);

    let applicationData = {};

    if (studyData?.applicationId) {
      applicationData = await Application.findOne({
        id: studyData.applicationId,
      })
        .populate("programId")
        .populate("semesterId");
    }

    let userInformation = await UserInformation.findOne({
      id: studyData.userInformationId.id,
    }).populate("student");
    userInformation = userInformation.toJSON();

    const commonDetails = {
      student_name: userInformation.displayName,
      student_id: userInformation?.student?.student_id,
      program: applicationData?.programId?.name,
      semester: applicationData?.semesterId?.name,
    };

    const emailType = await EmailSettings.findOne({ key: type });

    if (!emailType) {
      return exits.success(true);
    }
    const { subject, header, key, footer } = emailType;
    let { html } = emailType;
    html = he.decode(html);

    let encode;

    function replaceCommon() {
      encode = html.replace("<%student_name%>", commonDetails.student_name);
      encode = encode.replace("<%student_id%>", commonDetails.student_id);
      encode = encode.replace("<%program%>", commonDetails.program);
      encode = encode.replace("<%semester%>", commonDetails.semester);
      // encode = encode.replace("<%file_attached%>", "");
      return encode;
    }
    // encode = await replaceCommon();
    console.log("key----->>>>", key);
    switch (key) {
      case "new_registered_user":
        encode = replaceCommon();
        break;
      case "password_reset":
        encode = replaceCommon();
        break;
      case "application_approval":
        encode = replaceCommon();
        break;
      case "application_feedback":
        encode = replaceCommon();
        break;
      case "application_deny":
        encode = replaceCommon();
        break;
      case "billing_email":
        encode = replaceCommon();
        break;
      case "invoice":
        encode = replaceCommon();
        break;
      case "registration_complete":
        encode = replaceCommon();
        break;
      case "registration_fee_submitted":
        encode = replaceCommon();
        break;
      case "registration_submitted":
        encode = replaceCommon();
        break;
      case "application_fee_submitted":
        encode = replaceCommon();
        break;
      case "application_submitted":
        encode = replaceCommon();
        break;

      default:
        break;
    }

    console.log("encode----->>>>>", encode);
    let applicationSetting = await ApplicationSettings.find()
      .limit(1)
      .populate("logo");
    applicationSetting = applicationSetting?.[0];
    if (email) {
      await sails.helpers.sendEmail.with({
        to: email,
        subject: subject,
        template: "common/email-template",
        typeOfSend: "queue", // 'now', 'queue', 'preview'
        layout: "layout-email",
        templateData: {
          header: header,
          body: encode,
          footer: footer,
          logo:
            applicationSetting?.logo?.url ||
            `${sails.config.custom.baseUrl}/images/logo.png`,
        },
        attachments,
      });
    }
    return exits.success(true);
  },
};
