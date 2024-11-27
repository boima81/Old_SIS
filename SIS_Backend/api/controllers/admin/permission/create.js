module.exports = {
  friendlyName: "Create",

  description: "Create permission.",

  inputs: {
    names: {
      type: "ref",
      required: true,
    },
  },

  exits: {},

  fn: async function(inputs) {
    let names = inputs.names;

    let permissionArrList = sails.config.permissions;
    let arrPermissions = [];
    for (var key in permissionArrList) {
      var arrSingleModulePermission = permissionArrList[key];
      arrPermissions = arrPermissions.concat(arrSingleModulePermission);
    }

    let permissionList = arrPermissions.filter(item => names.some(name => item.name == name));

    let permissionResult = await Permission.createEach(permissionList).fetch();

    if (!permissionResult)
      return this.res.status(400).json({ message: sails.config.custom.messages.permission.notAdd });

    return this.res.json({ message: "permission add successfully" });
  },
};
