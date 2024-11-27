module.exports = {
  friendlyName: "View Course",

  description: "Display Course",

  inputs: {},

  //   exits: {
  //     success: {
  //     }
  //   },

  fn: async function (inputs, exits) {
    const userRole = this.req.userRole;
    const userId = this.req.userId;
    const search = this.req.param("search") || "";
    let where = {};

    console.log({ userRole });

    if (userRole === "instructors") {
      where = {
        instructor: userId,
      };
    }
    if (search) {
      var courseRawSql = `SELECT id from public.course where name ILIKE '%${search}%' OR course_id ILIKE '%${search}%'`;
      const courseRawResult = await sails
        .sendNativeQuery(courseRawSql, [])
        .meta({ skipRecordVerification: true });
      let courseSearchQueriesRows =
        courseRawResult?.rows?.map((row) => row?.id) || [];
      console.log({ courseSearchQueriesRows })
      where["id"] = courseSearchQueriesRows;
    }
    console.log({where})
    let courses = await Course.find(where)
      .populate("program")
      .populate("semesters")
      .meta({ skipRecordVerification: true });
    // .populate("semester")
    return exits.success(courses);
  },
};
