module.exports = {
  friendlyName: "View index",

  description: 'Display "Index" page.',

  exits: {
    success: {
      responseType: "view",
      viewTemplatePath: "admin/role/index",
    },
    redirect: {
      responseType: "redirect",
    },
  },

  fn: async function(input, exits) {
    return exits.success();
  },
};
