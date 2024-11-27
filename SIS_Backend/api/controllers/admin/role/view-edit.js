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
      viewTemplatePath: "admin/role/edit",
    },
  },

  fn: async function(inputs, exits) {
    var roleResult = await Role.findOne({
      id: inputs.id,
    });

    return exits.success({
      roleRecord: roleResult,
    });
  },
};
