module.exports = {
  friendlyName: "View Program",

  description: "Display Program",

  inputs: {},

  //   exits: {
  //     success: {
  //     }
  //   },

  fn: async function (inputs, exits) {
    const search = this.req.param("search") || "";
    let where = {};
    if (search) {
      var programRawSql = `SELECT id from public.program where name ILIKE '%${search}%' `;
      const programRawResult = await sails
        .sendNativeQuery(programRawSql, [])
        .meta({ skipRecordVerification: true });
      let programSearchQueriesRows =
        programRawResult?.rows?.map((row) => row?.id) || [];
      where["id"] = programSearchQueriesRows
    }
    let programs = await Program.find({
      where,
    });
    // .populate("semester")
    return exits.success(programs);
  },
};
