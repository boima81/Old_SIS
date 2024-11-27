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
    function getGradeInfo(gradeNumber) {
      if (gradeNumber >= 90 && gradeNumber <= 100) {
        return { name: "A", point: 4 };
      } else if (gradeNumber >= 80 && gradeNumber < 90) {
        return { name: "B", point: 3 };
      } else if (gradeNumber >= 70 && gradeNumber < 80) {
        return { name: "C", point: 2 };
      } else if (gradeNumber >= 60 && gradeNumber < 70) {
        return { name: "D", point: 1 };
      } else if (gradeNumber >= 0 && gradeNumber < 60) {
        return { name: "F", point: 0 };
      }
    }
    const userIdFromAdmin = this.req?.param("userId");
    const userId = userIdFromAdmin || this.req.userId;
    console.log({ userId });
    const userData = await User.findOne({
      id: userId,
    }).populate("userInformationId");
    const student = await Student.findOne({
      user: userId,
    });
    let registrations = await Registration.find({
      createdBy: userId,
      is_approved: true,
    })
      .populate("programId")
      .populate("semesterId")
      .populate("courses")
      .populate("grade")
      .populate("invoiceId")
      .populate("applicationId")
      .sort("id DESC");
    if (registrations?.length > 0) {
      const studentName = `${userData?.userInformationId?.first_name || ""} ${
        userData?.userInformationId?.middle_name
      } ${userData?.userInformationId?.last_name}`;
      const invoices = registrations?.[0]?.invoiceId;
      const applicationUpdateDate = registrations?.[0]?.applicationId?.updatedAt
        ? moment(registrations?.[0]?.applicationId?.updatedAt).format(
            "MMM DD YYYY"
          )
        : "";
      const transcriptDate = moment().format("MMM DD YYYY");
      let bodyTables = "";
      let semestersData = [];
      let prevCreditHours = 0;
      let prevQualityPoint = 0;
      let prevGPA = 0;
      for (let index = 0; index < registrations.length; index++) {
        const registration = registrations[index];
        console.log({ invoices });
        const applicationId = registration?.applicationId;
        console.log({ applicationId });
        const grades = await Grade.find({
          registration_id: registration.id,
        }).populate("course_id");
        const gradePointAvg = await Grade.avg("grade_point").where({
          registration_id: registration.id,
        });
        const courseCredits = grades.reduce(
          (value, currentValue) => {
            console.log({ currentValue });
            return {
              credit:
                (currentValue?.course_id?.course_credit || 0) + value?.credit,
              qualityPoint:
                getGradeInfo(currentValue?.grade_number)?.point *
                  (currentValue?.course_id?.course_credit || 0) +
                value?.qualityPoint,
            };
          },
          { credit: 0, qualityPoint: 0 }
        );
        console.log({ courseCredits });
        const semesterName = registration?.semesterId?.name;
        const semesterYear = moment(registration?.semesterId?.createdAt).format(
          "YYYY"
        );

        const programName = registration?.programId?.name;
        let coursesDetails = "";
        grades?.forEach((grade) => {
          coursesDetails += `<tr>
              <td>${grade?.course_id?.course_id}</td>
              <td>${grade?.course_id?.name}</td>
              <td>${getGradeInfo(grade?.grade_number)?.name}</td>
              <td>${grade?.course_id?.course_credit}</td>
              <td>${
                getGradeInfo(grade?.grade_number)?.point *
                (grade?.course_id?.course_credit || 0)
              }</td>
            </tr>`;
        });
        const courseRegistrationId = registration?.courses?.[0]?.id;
        console.log({ coursesDetails, courseRegistrationId });
        const semesterData = registration?.semesterId;
        // semestersData.push({
        //   semesterData: registration?.semesterId,
        //   courseCredits: courseCredits,
        //   registrationId: registration.id,
        // });
        // semestersData = `<tr><td>${semesterName}</td>
        //     <td>${courseCredits?.credit}</td>
        //     <td>${courseCredits?.qualityPoint}</td>
        //     <td>${
        //       courseCredits?.qualityPoint > 0
        //         ? (
        //             (courseCredits?.qualityPoint || 0) /
        //             (courseCredits?.credit || 0)
        //           ).toFixed(2)
        //         : 0
        //     }
        //     </td></tr>`;
        console.log({ endDate: registration?.semesterId.endDate });
        const currentDate = registration?.semesterId?.endDate
          ? moment(registration?.semesterId?.endDate || null).format()
          : moment().format();
        console.log({ currentDate });
        let where = {
          endDate: {
            "<=": currentDate,
          },
        };
        if (semesterData?.id) {
          where = {
            ...where,
            id: {
              "!=": semesterData?.id,
            },
          };
        }
        let pastSemester = await Semester.find({
          where,
        })
          .populate("courses", {
            where: {
              id: courseRegistrationId,
            },
          })
          .sort("endDate DESC")
          .limit(1);
        pastSemester = pastSemester?.[0];
        // let pastSemesterDate = semestersData?.filter((semesterData) => {
        //   return semesterData?.semesterData.id === pastSemester?.id;
        // });
        // pastSemesterDate = pastSemesterDate?.[0];

        const pastCourses = pastSemester?.courses;
        console.log({ pastCourses });
        let pastGrades = [];
        if (pastSemester?.id) {
          pastGrades = await Grade.find({
            course_id: pastCourses?.id,
          }).populate("course_id");
        }
        const pastCourseCredits = pastGrades.reduce(
          (value, currentValue) => {
            return {
              credit:
                (currentValue?.course_id?.course_credit || 0) + value?.credit,
              qualityPoint:
                getGradeInfo(currentValue?.grade_number)?.point *
                  (currentValue?.course_id?.course_credit || 0) +
                value?.qualityPoint,
            };
          },
          { credit: 0, qualityPoint: 0 }
        );
        const currentQualityPoint =
          courseCredits?.qualityPoint > 0
            ? (
                (courseCredits?.qualityPoint || 0) /
                (courseCredits?.credit || 0)
              ).toFixed(2)
            : 0;
        const pastQualityPoint =
          pastCourseCredits?.qualityPoint > 0
            ? (
                (pastCourseCredits?.qualityPoint || 0) /
                (pastCourseCredits?.credit || 0)
              ).toFixed(2)
            : 0;
        prevCreditHours = prevCreditHours + (courseCredits?.credit || 0);
        prevQualityPoint =
          prevQualityPoint + (courseCredits?.qualityPoint || 0);

        let totalQualityPoint =
          parseFloat(prevQualityPoint || 0) / (prevCreditHours || 0);
        totalQualityPoint = (totalQualityPoint || 0).toFixed(2);
        // ENR, GRD, DRP
        const status = "ENR";

        bodyTables += `<table class="mt" style="min-width: 600px">
            <tbody class="table">
            <tr>
              <td>Academic Year</td>
              <td>${semesterYear}</td>
            </tr>
            <tr>
              <td>Semester</td>
              <td>${semesterName}</td>
            </tr>
            <tr>
              <td>Program</td>
              <td>${programName}</td>
            </tr>
            <tr>
              <td>Status</td>
              <td>${status}</td>
            </tr>
            <tr>
              <td class="header">Course ID</td>
              <td class="header">Courses</td>
              <td class="header">Grades</td>
              <td class="header">Credit Hours</td>
              <td class="header">Quality Points</td>
            </tr>
            ${coursesDetails}
          </tbody></table>
          <table class="mt-5" style="min-width: 600px">
          <tbody class="table">
            <tr>
              <td class="header">Semester Summary</td>
              <td class="header">Credit Hours</td>
              <td class="header">Quality Points</td>
              <td class="header">GPA</td>
            </tr>
            <tr>
            <td>Current</td>
                 <td>${courseCredits?.credit || 0}</td>
             <td>${courseCredits?.qualityPoint || 0}</td>
            <td>${currentQualityPoint}
             </td>
            </tr>
            <tr>
            <td>Cumulative</td>
               <td>${prevCreditHours}</td>
             <td>${prevQualityPoint}</td>
            <td>${totalQualityPoint}
             </td>
            </tr>
            </tbody>
            </table>

          `;
      }
      const displayOfficial = `${
        userIdFromAdmin
          ? '<div style="border: 1px solid black; color:green;font-size:30px;padding-top:0px;"> <h1>OFFICIAL TRANSCRIPT</h1> </div>'
          : "<div style='border: 1px solid black; color:red;font-size:30px;padding-top:0px;'> <h1>UNOFFICIAL TRANSCRIPT</h1> </div>"
      }`;
      const imageUrl = `${sails.config.custom.baseUrl}/transcript/upload/sign/transcript_sign.png`;
      const imageTag = `<img src='${imageUrl}' width="100%  height="100%" alt="img" />`;
      const signDisplay = `${
        userIdFromAdmin
          ? `</div>
      <div style="display:flex;justify-content:center; margin-left:20%;margin-top:5%">
      <div style="align-self:flex-end">${imageTag}</div>
      </div>`: ""
      }`;
      const createTranscript = await Transcript.create({
        student_id: student.id,
        // generated_date: transcriptDate,
      })
        .intercept((error) => {
          console.log({ error });
          return error;
        })
        .fetch();

      if (createTranscript?.id) {
        let file = {
          content: `
      <style>
      table,th,td {
        border: 1px solid black;
        border-collapse: collapse;
        padding-inline: 10px;
        padding-block: 5px;
      }
      .header {
        font-weight: bold;
      }
      table {
        border: none;
      }
      .mt {
        margin-top: 50px;
      }
      .mt-5{
        margin-top: 20px;
      }
    </style>
      <h2 style="text-align: center" class="mt">Nubian American Advanced College</h2>
      <h2 style="text-align: center">Transcript</h2>
      <div style="display: flex; justify-content: center; margin-left:100px;margin-right:100px">
      
        <div>
          <table class="mt">
            <tbody class="table">
              <tr>
                <td>Student Id</td>
                <td>${student?.student_id}</td>
              </tr>
              <tr>
                <td>Student Name</td>
                <td>${studentName}</td>
              </tr>
              <tr>
                <td>Enrollment Date</td>
                <td>${applicationUpdateDate}</td>
              </tr>
              <tr>
                <td>Transcript Date</td>
                <td>${transcriptDate}</td>
              </tr>
            </tbody>
          </table>
          ${bodyTables}
           
      </div>
      <div style="width:13%;font-align:center">
      
      ${displayOfficial}
        
      </div>
      
      ${signDisplay}
      
      `,
        };
        // console.log({ content: file?.content });
        let options = {
          format: "A1",
          landscape: true,
        };

        let dbPathStore = `/transcript/${createTranscript.id}`;
        let InvoicePath = `assets${dbPathStore}`;

        const dirName = path.dirname(InvoicePath);
        console.log({ dirName });
        if (!fs.existsSync(InvoicePath)) {
          fs.mkdir(InvoicePath, { recursive: true }, (error) =>
            console.log({ error })
          );
        }
        let fileName = "transcript.pdf";
        InvoicePath += `/${fileName}`;
        dbPathStore += `/${fileName}`;

        await html_to_pdf.generatePdf(file, options).then((pdfBuffer) => {
          console.log("PDF Buffer:-", pdfBuffer);
          fs.writeFile(`${InvoicePath}`, pdfBuffer, async (err) => {
            console.log({ err });

            if (!err) {
              await Transcript.update({
                id: createTranscript.id,
              }).set({
                file_link: dbPathStore,
              });
              return exits.success({
                path: dbPathStore,
                error: "",
                fileName,
              });
            } else {
              if (createTranscript?.id) {
                await Transcript.destroy({
                  id: createTranscript?.id,
                });
              }
              return exits.success({ path: "", error: err });
            }
          });
        });
      } else {
        return exits.success({
          message: "Transcript file not generated please try again",
        });
      }
    } else {
      return exits.success({ message: "There are no registration", err: true });
    }
  },
};
