module.exports = {


  friendlyName: 'Index',


  description: 'Index dashboard.',


  inputs: {

  },


  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'admin/dashboard'
    },
    redirect: {
      responseType: 'redirect',
    }
  },


  fn: async function (inputs, exits) {

    return exits.success({
      usersCount: await User.count(),
      adminCount: await Admin.count()
    });
  }
};
