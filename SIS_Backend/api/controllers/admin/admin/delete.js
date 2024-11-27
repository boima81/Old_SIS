module.exports = {


  friendlyName: 'Delete',


  description: 'Delete admin.',


  inputs: {

  },


  exits: {
    success: {
      statusCode: 200,
      description: 'Admin Deleted.',
    },
    redirect: {
      responseType: 'redirect'
    },
    invalid: {
      statusCode: 409,
      description: 'Invalid request'
    },
  },


  fn: async function (inputs, exits) {
    var user_id = this.req.params['id'];
    console.log("delete request get id :- ", this.req.params['id']);
    var userRecord = await Admin.destroy({
      id: user_id
    });
    if (!userRecord) {
      return exits.invalid({
        message: 'invalid'
      });
    }
    exits.success();
  }


};
