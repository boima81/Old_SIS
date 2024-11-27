module.exports = {
  friendlyName: "Create",

  description: "Create role.",

  inputs: {
    name: {
      type: "string",
      required: true,
    },
    displayName: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
  },

  exits: {
    redirect: {
      responseType: "redirect",
    },
  },

  fn: async function(inputs, exits) {
    let role = await Role.create(inputs).fetch();

    if (Object.keys(role).length > 0) {
      this.req.session.flash = {
        type: "success",
        message: "Role create successfully",
      };
      throw {
        redirect: "/admin/role",
      };
    }

    this.req.session.flash = {
      type: "error",
      message: "Role not create",
    };
    throw {
      redirect: "/admin/role/create",
    };
  },
};
