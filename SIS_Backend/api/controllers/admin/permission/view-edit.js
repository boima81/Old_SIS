module.exports = {
  friendlyName: "View edit",

  description: 'Display "Edit" page.',
  inputs: {
    id: {
      type: "number",
      required: true,
    },
  },
  exits: {
    success: {
      viewTemplatePath: "admin/permission/edit",
    },
  },

  fn: async function(inputs, exits) {
    var permissionResult = await Permission.findOne({
      id: inputs.id,
    });

    return exits.success({
      permissionRecord: permissionResult,
    });
  },
};
