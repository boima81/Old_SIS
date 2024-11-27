module.exports = {
  friendlyName: "Index",

  description: "Index permission.",

  inputs: {},

  exits: {},

  fn: async function(inputs) {
    let permissionArrList = sails.config.permissions;
    let arrPermissions = [];
    for (var key in permissionArrList) {
      var arrSingleModulePermission = permissionArrList[key];
      arrPermissions = arrPermissions.concat(arrSingleModulePermission);
    }

    let nameList = _.map(arrPermissions, "name");

    let permissionResult = await Permission.find({
      name: { in: nameList },
    });

    if (Object.keys(permissionResult).length > 0) {
      let permission = _.differenceWith(arrPermissions, permissionResult, function(permission1, permission2) {
        return permission1["name"] === permission2["name"];
      });
      return this.res.json(permission);
    }

    return this.res.json(arrPermissions);
  },
};
