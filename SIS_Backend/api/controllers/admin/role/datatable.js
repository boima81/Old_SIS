module.exports = {
  friendlyName: "Index",

  description: "Index role.",

  inputs: {},

  exits: {},

  fn: async function(inputs, exits) {
    let result = await sails.helpers.datatable.with({
      model: Role,
      options: this.req.query,
    });

    return exits.success(result);
  },
};
