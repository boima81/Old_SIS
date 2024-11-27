module.exports = {
  friendlyName: "Update",

  description: "Update role.",

  inputs: {
    id: {
      type: "number",
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

  fn: async function(inputs) {
    let roleResult = await Role.update({ id: inputs.id }, inputs);

    if (Object.keys(roleResult).length > 0) {
      this.req.session.flash = {
        type: "success",
        message: "Role update successfully",
      };
      throw {
        redirect: "/admin/role",
      };
    }

    this.req.session.flash = {
      type: "error",
      message: "Role not found",
    };
    throw {
      redirect: "/admin/role/edit" + inputs.id,
    };
  },
};
