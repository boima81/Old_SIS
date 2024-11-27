module.exports = {
  friendlyName: "Create Email settings",

  description: "Create Email settings.",

  inputs: {
    title: {
      type: "string",
      required: true,
    },
    subject: {
      type: "string",
      required: true,
    },
    html: {
      type: "string",
      required: true,
    },
    key: {
      type: "string",
      required: true,
    },
    header: {
      type: "string",
      required: true,
    },
    footer: {
      type: "string",
      required: false,
    },
  },
  exits: {
    success: {
      statusCode: 200,
      description: "All done",
    },
    bedRequest: {
      statusCode: 400,
      description: "Wrong request",
    },
    invalid: {
      statusCode: 409,
      description: "All field is required.",
    },
    redirect: {
      responseType: "redirect",
    },
  },

  fn: async function (inputs, exits) {
    const userId = this.req.userId;
    const { title, subject, key, header } = inputs;
    let { footer, html } = inputs;
    footer = footer || (await sails.config.emailFooter);
    const obj = {
      title,
      subject,
      html,
      key,
      header,
      footer,
      created_by: userId,
      updated_by: userId,
    };

    try {
      await EmailSettings.findOrCreate({ key }, obj).exec(
        async (err, settings, wasCreated) => {
          if (err) {
            console.log("err", err);
            return this.res.invalid(err);
          }

          if (wasCreated) {
            return exits.success({
              message: "Email settings created successfully",
              data: settings,
            });
          } else {
            const updateObj = {
              title,
              subject,
              html,
              key,
              header,
              footer,
              updated_by: userId,
            };

            const updateSettings = await EmailSettings.updateOne({
              key: settings?.key,
            }).set(updateObj);

            if (!updateSettings) {
              return exits.invalid({
                message: "Emails not added",
                data: [],
              });
            }
            return exits.success({
              message: "Email settings updated successfully",
              data: updateSettings,
            });
          }
        }
      );
    } catch (error) {
      return exits.invalid({ message: "Something went wrong" });
    }
  },
};
