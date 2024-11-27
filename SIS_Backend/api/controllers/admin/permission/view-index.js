module.exports = {
  friendlyName: "View index",

  description: 'Display "Index" page.',

  exits: {
    success: {
      viewTemplatePath: "admin/permission/index",
    },
  },

  fn: async function() {
    return {};
  },
};
