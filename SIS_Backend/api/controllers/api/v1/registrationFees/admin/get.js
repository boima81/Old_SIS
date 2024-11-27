module.exports = {
  friendlyName: "View Registration Fees",

  description: "Display Registration Fees",

  inputs: {},

  //   exits: {
  //     success: {
  //     }
  //   },

  fn: async function (inputs, exits) {
    const search = this.req.param("search") || "";
    let where = {};
    if (search) {
      var registrationFeesRawSql = `SELECT id from public.registration_fees where name ILIKE '%${search}%'`;
      const registrationFeesRawResult = await sails
        .sendNativeQuery(registrationFeesRawSql, [])
        .meta({ skipRecordVerification: true });
      let registrationFeesSearchQueriesRows =
        registrationFeesRawResult?.rows?.map((row) => row?.id) || [];
      console.log({ registrationFeesSearchQueriesRows });
      where["id"] = registrationFeesSearchQueriesRows;
    }
    let registrationFees = await RegistrationFees.find(where).meta({
      skipRecordVerification: true,
    });

    // .populate("semester")
    return exits.success(registrationFees);
  },
};
