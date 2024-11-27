module.exports = {


  friendlyName: 'Refresh token',


  description: '',


  inputs: {
    userId: {
      type: 'string'
    },
    token: {
      type: 'string',
      required: true
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    // exits.success(inputs.userId);

    jwToken.refreshToken(inputs.token, function (token) {
      exits.success({
        refreshedToken: token
      })
    });
    // exits.success(inputs.token);
  }

};
