module.exports = {
  friendlyName: "Datatable",

  description: "Datatable permission.",

  inputs: {},

  exits: {},

  fn: async function(inputs, exits) {
    let result = await sails.helpers.datatable.with({
      model: Permission,
      options: this.req.query,
    });

    return exits.success(result);
  },
};
