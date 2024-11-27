module.exports = {
  friendlyName: "Namecheck",

  description: "Namecheck role.",

  inputs: {
    name: {
      type: "string",
      required: true,
    },
    id: {
      type: "ref",
    },
  },

  exits: {},

  fn: async function(inputs, exits) {
    let obj = { name: inputs.name };
    if (inputs.id) obj.id = { "!=": inputs.id };

    let roleResult = await Role.findOne(obj);

    if (roleResult) return this.res.send("false");

    return this.res.send("true");
  },
};
