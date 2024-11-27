module.exports = {


  friendlyName: 'View Admins',


  description: 'Display admins.',


  inputs: {

  },


//   exits: {
//     success: {
//     }
//   },


  fn: async function(inputs, exits) {
    // console.log("project-data req : ", this.req.query);


    // let result = await sails.helpers.datatable(Project, this.req.query);
    let result = await sails.helpers.datatable.with({
        model: Admin,
        options: this.req.query
      });
    // console.log("project-data resultProjects : ", result);
    return exits.success(result);
  }


};