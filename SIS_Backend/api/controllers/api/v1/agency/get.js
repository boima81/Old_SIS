module.exports = {
  friendlyName: "View Agency",

  description: "Display Agency",

  inputs: {},

  //   exits: {
  //     success: {
  //     }
  //   },

  fn: async function (inputs, exits) {
    const search = this.req.param("search") || "";
    let where = {};
    if (search) {
      var agencyRawSql = `SELECT id from public.agency where name ILIKE '%${search}%' `;
      const agencyRawResult = await sails
        .sendNativeQuery(agencyRawSql, [])
        .meta({ skipRecordVerification: true });
      let agencySearchQueriesRows =
        agencyRawResult?.rows?.map((row) => row?.id) || [];
      where["id"] = agencySearchQueriesRows
    }
    let agencies = await Agency.find(where);
    return exits.success(agencies || []);
  },
};
