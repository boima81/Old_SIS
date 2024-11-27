module.exports = {


  friendlyName: 'Edit',


  description: 'Edit admin.',


  inputs: {

  },


  exits: {
    success: {
      viewTemplatePath: 'admin/admin-crud/edit'
    },
    redirect: {
      responseType: 'redirect'
    },

  },


  fn: async function (inputs, exits) {

    var user_id = this.req.params['adminId'];
    // var user_id = inputs.adminId;
    console.log("request get id :- ", user_id);

    var adminRecord = await Admin.findOne({
      id: user_id
    });
    return exits.success({
      adminRecord: adminRecord
    });
    // return this.res.view("admin/admin-crud/edit", {
    //   adminRecord: adminRecord[0]
    // });
  }




};
