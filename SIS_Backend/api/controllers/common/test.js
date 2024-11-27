module.exports = {
  friendlyName: "Test",

  description: "",

  inputs: {},

  exits: {
    success: {},
    showTemplate: {
      responseType: "view",
      viewTemplatePath: "emails/test-view",
    },
  },

  fn: async function (inputs, exits) {
    const test = await sails.helpers.sendMails.with({
      userId: 145,
      type: "billing_email",
    });
    return exits.success({
      data: test,
    });
  },
};
