module.exports = {
  friendlyName: "Delete",

  description: "Delete permission.",

  inputs: {
    id: {
      type: "number",
      required: true,
    },
  },

  exits: {},

  fn: async function(inputs) {
    let destroyResult = await Permission.destroy(inputs).fetch();
    if (Object.keys(destroyResult).length > 0)
      return this.res.json({ type: "success", message: "Permission delete successfully" });

    return this.res.status(400).json({ type: "error", message: "Permission not found" });
  },
};
