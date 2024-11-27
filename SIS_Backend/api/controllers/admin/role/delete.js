module.exports = {
  friendlyName: "Delete",

  description: "Delete role.",

  inputs: {
    id: {
      type: "number",
      required: true,
    },
  },

  exits: {},

  fn: async function(inputs, exits) {
    let destroyResult = await Role.destroy(inputs).fetch();
    if (Object.keys(destroyResult).length > 0) {
      return this.res.json({ type: "success", message: "Role delete successfully" });
    }
    return this.res.status(400).json({ type: "error", message: "Role not found" });
  },
};
