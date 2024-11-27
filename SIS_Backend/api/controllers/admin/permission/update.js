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
    let permissionResult = await Permission.update({ id: inputs.id }, inputs);

    if (Object.keys(permissionResult).length > 0) {
      this.req.session.flash = {
        type: "success",
        message: "Permission update successfully",
      };
      throw {
        redirect: "/admin/permission",
      };
    }

    this.req.session.flash = {
      type: "error",
      message: "Permission not found",
    };
    throw {
      redirect: "/admin/permission/edit" + inputs.id,
    };
  },
};
