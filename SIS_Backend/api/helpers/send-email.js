var path = require("path");
var url = require("url");
var util = require("util");
module.exports = {
  friendlyName: "Send email",

  description: "",

  inputs: {
    template: {
      description:
        "The relative path to an EJS template within our `views/emails/` folder -- WITHOUT the file extension.",
      type: "string",
      required: true,
    },

    templateData: {
      description:
        "A dictionary of data which will be accessible in the EJS template.",
      type: {},
      //   defaultsTo: {},
      required: true,
    },

    to: {
      type: "string",
      description: "The email address of the primary recipient.",
      required: true,
    },

    from: {
      type: "string",
      description: "The email address of the primary recipient.",
      defaultsTo: `${sails.config.mail.from.name} ${sails.config.mail.from.email}`, // TODO:
    },

    subject: {
      type: "string",
      description: "The subject of the email.",
      defaultsTo: "",
    },

    layout: {
      description:
        "Set to `false` to disable layouts altogether, or provide the path (relative " +
        "from `views/layouts/`) to an override email layout.",
      defaultsTo: "layout-email",
      custom: (layout) => layout === false || _.isString(layout),
    },
    // sendMail: {
    //   type: 'boolean',
    //   defaultsTo: true,
    // },
    // showPreview: {
    //   type: 'boolean',
    //   defaultsTo: false,
    // },
    typeOfSend: {
      // expecting 'now','queue','preview'
      // 'now': it will send mail instant then respond to caller.
      // 'queue': it will add mail to queue.
      // 'preview': it will just return preview (not send mail).
      type: "string",
      defaultsTo: "preview",
    },
    attachments: {
      type: "ref",
      required: false,
    },
  },

  exits: {
    // success: {
    //   viewTemplatePath: 'emails/test-view'
    // },
  },

  fn: async function (inputs, exits) {
    var emailTemplatePath = path.join("emails/", inputs.template);
    var layout;
    if (inputs.layout) {
      layout = path.relative(
        path.dirname(emailTemplatePath),
        path.resolve("layouts/", inputs.layout)
      );
    } else {
      layout = false;
    }

    var htmlEmailContents = await sails
      .renderView(
        emailTemplatePath,
        _.extend(
          {
            layout,
            url,
            util,
          },
          inputs.templateData
        )
      )
      .intercept((err) => {
        err.message =
          "Could not compile view template.\n" +
          "(Usually, this means the provided data is invalid, or missing a piece.)\n" +
          "Details:\n" +
          err.message;
        return err;
      });

    var mainOptions = {
      from: inputs.from,
      to: inputs.to,
      subject: inputs.subject,
      html: htmlEmailContents,
      generateTextFromHtml: true,
      attachments: inputs?.attachments || [],
    };

    // decide to send mail or not
    if (inputs.typeOfSend == "now") {
      Mailer.sendMail(mainOptions, function (err, info) {
        if (err) {
          console.log(err);
          return exits.success({
            message: "opps!! sending mail failed",
            status: false,
          });
        }
        console.log("inputs.to", inputs.to);
        return exits.success({
          message: "email has been sent successfully,  to:" + inputs.to,
          status: true,
        });
      });
    } else if (inputs.typeOfSend == "queue") {
      Jobs.create("sendMail", {
        mainOptions: mainOptions,
      }).save(function (err) {
        if (err) {
          return exits.success({
            message: err,
          });
        }
        return exits.success({
          message: "sending your mail",
        });
      });
    } else if (inputs.typeOfSend == "preview") {
      return exits.success({
        typeOfSend: "preview",
        emailHtmlStream: htmlEmailContents,
      });
    } else {
      return exits.success({
        message: "Something went Wrong",
      });
    }
  },
};
