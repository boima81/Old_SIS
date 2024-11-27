const html_to_pdf = require("html-pdf-node");
const fs = require("fs");
const path = require("path");
const moment = require("moment");
module.exports = {
  friendlyName: "View Transcript",

  description: "Display Transcript",

  inputs: {},

  exits: {
    success: {},
  },
  fn: async function (inputs, exits) {
    const userId = this.req.userId;
    const search = this.req?.param("search") || "";
    let where = {};
    function arrayToTuple(arr) {
      return "(" + arr.map((item) => `'${item}'`).join(", ") + ")";
    }
    if (search) {
      // UserInformation
      var UserInformationRawSql = `SELECT id from public.user_information where CONCAT(first_name , ' ' , middle_name , ' ' , last_name) ILIKE '%${search}%' `;
      const userInformationRawResult = await sails
        .sendNativeQuery(UserInformationRawSql, [])
        .meta({ skipRecordVerification: true });
      let userInformationSearchQueriesRows =
        userInformationRawResult?.rows?.map((row) => row?.id) || [];

      // Student Id
      var studentIdRawSql = `SELECT id from public.student where student_id ILIKE '%${search}%' `;
      const studentIdRawResult = await sails
        .sendNativeQuery(studentIdRawSql, [])
        .meta({ skipRecordVerification: true });
      let studentIdSearchQueriesRows =
        studentIdRawResult?.rows?.map((row) => row?.id) || [];
      console.log({ studentIdSearchQueriesRows });
      var userRawSql = "";
      if (userInformationSearchQueriesRows?.length > 0) {
        userRawSql += `SELECT id from public.user where user_information_id IN ${arrayToTuple(
          userInformationSearchQueriesRows
        )}`;
      }

      // User
      let userSearchQueriesRows = [];
      if (userRawSql) {
        const userRawResult = await sails
          .sendNativeQuery(userRawSql, [])
          .meta({ skipRecordVerification: true });
        userSearchQueriesRows =
          userRawResult?.rows?.map((row) => row?.id) || [];
        console.log({ userSearchQueriesRows });
      }
      where = {
        or: [
          {
            id: { in: studentIdSearchQueriesRows },
          },
          {
            user: { in: userSearchQueriesRows },
          },
        ],
      };
    }

    const students = await Student.find({
      where,
    });
    console.log({ students });
    for (let index = 0; index < students.length; index++) {
      const student = students[index];
      console.log({ student });
      const user = await User.findOne({
        id: student?.user,
      }).populate("userInformationId");
      let transcriptsData = await Transcript.find({
        student_id: student.id,
      })
        .limit(1)
        .sort("id DESC");
      transcriptsData = transcriptsData?.[0];
      let registrations = await Registration.find({
        createdBy: student?.user,
        is_approved: true,
      })
        .populate("programId")
        .populate("semesterId")
        .populate("courses")
        .populate("grade")
        .populate("invoiceId")
        .sort("id DESC");
      const invoices = registrations?.[0]?.invoiceId;
      const program = registrations?.[0]?.programId?.name;
      const registrationDate = invoices?.updatedAt;
      const registrationsId = registrations?.map(
        (registration) => registration.id
      );
      console.log({ registrationsId });
      let gradePointAvg = 0;
      if (registrationsId?.length > 0) {
        gradePointAvg = await Grade.avg("grade_point").where({
          registration_id: { in: registrationsId },
        });
      }
      const studentName = `${user?.userInformationId?.first_name || ""} ${
        user?.userInformationId?.middle_name
      } ${user?.userInformationId?.last_name}`;
      student["gpa"] = gradePointAvg;

      student["name"] = studentName;
      student["registration_date"] = registrationDate;
      student["generated_date"] = transcriptsData?.createdAt;
      student["program"] = program;
      student["file_link"] = transcriptsData?.file_link;
    }
    return exits.success(students);
  },
};
