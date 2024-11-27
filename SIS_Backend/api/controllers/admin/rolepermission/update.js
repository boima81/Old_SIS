module.exports = {
  friendlyName: "Update",

  description: "Update rolepermission.",

  inputs: {
    id: {
      type: "number",
    },
    permission: {
      type: "ref",
    },
  },

  exits: {
    redirect: {
      responseType: "redirect",
    },
  },

  fn: async function(inputs, exits) {
    if (inputs.permission) await Role.replaceCollection(inputs.id, "permissions").members(inputs.permission);
    else await Permission_role.destroy({ roleId: inputs.id });

    this.req.session.flash = {
      type: "success",
      message: "Permission assign in role successfully",
    };
    throw {
      redirect: "/admin/role-permission",
    };
  },
};
