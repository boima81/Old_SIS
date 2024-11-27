module.exports = {
  friendlyName: "View index",

  description: 'Display "Index" page.',

  exits: {
    success: {
      viewTemplatePath: "admin/rolepermission/index",
    },
  },

  fn: async function() {
    // Respond with view.
    return {};
  },
};
