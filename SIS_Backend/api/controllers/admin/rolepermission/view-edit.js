module.exports = {
  friendlyName: "Edit",

  description: "Edit role permission.",

  inputs: {
    id: {
      type: "number",
      required: true,
    },
  },

  exits: {
    success: {
      viewTemplatePath: "admin/rolepermission/edit",
    },
    redirect: {
      responseType: "redirect",
    },
  },

  fn: async function(inputs, exits) {
    let permissionRecordAll = await Permission.find();
    let roleResult = await Role.findOne({ id: inputs.id }).populate("permissions");

    let permissionResult = _.map(roleResult.permissions, "id");

    let query = 'SELECT moduleName FROM Permission GROUP BY moduleName';
    let permissionRecordGroupby = await sails.sendNativeQuery(query);
    let permissionModules = [];

    if (permissionRecordGroupby.rows.length > 0) permissionModules = _.map(permissionRecordGroupby.rows, "moduleName");

    let permissionRecord = [];

    permissionModules.forEach(modulename => {
      let obj = {};
      obj.moduleName = modulename;
      obj.moduleData = [];
      permissionRecordAll.forEach(permission => {
        if (modulename == permission.moduleName) obj.moduleData.push(permission);
      });
      permissionRecord.push(obj);
    });

    return exits.success({
      permissionRecord: permissionRecord,
      roleRecord: roleResult,
      permissionResult: permissionResult,
    });
  },
};
