module.exports = {


  friendlyName: 'View homepage or redirect',


  description: 'Display or redirect to the appropriate homepage, depending on login status.',


  exits: {

    // success: {
    //   statusCode: 200,
    //   description: 'Requesting user is a guest, so show the public landing page.',
    //   viewTemplatePath: 'pages/homepage'
    // },

    // redirect: {
    //   responseType: 'redirect',
    //   description: 'Requesting user is logged in, so redirect to the internal welcome page.'
    // },

    // success: {
    //   responseType: 'redirect',
    // },
    redirect: {
      responseType: 'redirect',
    }

  },


  fn: async function (inputs, exits) {
    if (this.req.session.adminId) {
      return exits.redirect('admin/dashboard');
      //   throw { redirect: 'admin/dashboard'  };
    }
    return exits.redirect('admin/login');
    // throw { redirect: 'admin/login' };

  }
};
