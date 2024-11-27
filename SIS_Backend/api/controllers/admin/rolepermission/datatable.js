module.exports = {
  friendlyName: "Datatable",

  description: "Datatable rolepermission.",

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
