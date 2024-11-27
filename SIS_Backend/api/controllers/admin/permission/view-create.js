module.exports = {
  friendlyName: "View create",

  description: 'Display "Create" page.',

  exits: {
    success: {
      viewTemplatePath: "admin/permission/create",
    },
  },

  fn: async function(inputs, exits) {
    return exits.success({ permissionRecord: "" });
  },
};
