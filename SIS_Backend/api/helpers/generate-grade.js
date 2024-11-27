const html_to_pdf = require("html-pdf-node");
const fs = require("fs");
const path = require("path");
const moment = require("moment");

module.exports = {
  friendlyName: "Generate Grade helper",

  description: "",

  inputs: {
    id: {
      type: "number",
      required: true,
    },
  },

  exits: {
    success: {
      description: "All done.",
    },
  },
  fn: async function (inputs, exits) {
    const existRegistration = inputs;
    let options = {
      format: "A1",
    };
    const currentDate = moment().format("MMM Do YYYY");



    const userId = existRegistration.id
    const userInformationData = await User.findOne({
      id: userId,
    }).populate("userInformationId").populate('student').populate('programs').populate('semesters')
    
    const grades = await Grade.find({
      user_id: userId,
    }).populate('course_id')

    let tbody = grades?.map((grade) => (
      `<tr>
                      <td class="thick-line">${grade?.course_id?.course_id}</td>
                      <td class="thick-line">${grade?.course_id?.name}</td>
                      <td class="thick-line">${grade?.course_id?.course_credit}</td>
                      <td class="thick-line text-center">${grade?.grade_name}</td>
                      <td class="thick-line text-center">${grade?.grade_point}</td>
                    </tr>`
    ))

    let userInformation = await UserInformation.findOne({
      id: userInformationData?.userInformationId?.id,
    }).populate("student");


    console.log({ userInformation });


    const gradePointAvg = await Grade.avg('grade_point').where({
      user_id: userId,
    })
    let registration = await Registration.find({
      createdBy: userId,
      is_approved: true
    }).populate("invoiceId")
      .populate("programId")
      .populate("semesterId")
      .populate("courses")
      .sort("id DESC")
      .limit(1)
    registration = registration?.[0]
    console.log({ registration });

    let applicationSetting = await ApplicationSettings.find()
      .limit(1)
      .populate("logo");
    applicationSetting = applicationSetting?.[0];
    console.log({ applicationSetting })
    const logo =
      applicationSetting?.logo?.url ||
      `${sails.config.custom.baseUrl}/images/logo.png`;
    let headingTitle = "Grade ";

    let file = {
      content: `<link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css"
      integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
      crossorigin="anonymous"
    />
    
    <script
      src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
      integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
      crossorigin="anonymous"
    ></script>
    <script
      src="https://cdn.jsdelivr.net/npm/popper.js@1.14.3/dist/umd/popper.min.js"
      integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49"
      crossorigin="anonymous"
    ></script>
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/js/bootstrap.min.js"
      integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy"
      crossorigin="anonymous"
    ></script>
    
    <script src="https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio,line-clamp"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    
    <style>
      .invoice-title h2,
      .invoice-title h3 {
        display: inline-block;
      }
    
      .table > tbody > tr > .no-line {
        border-top: none;
      }
    
      .table > thead > tr > .no-line {
        border-bottom: none;
      }
    
      .table > tbody > tr > .thick-line {
        border-top: 2px solid;
      }
    </style>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="invoice-title flex justify-between">
          <div>
          <h2>${headingTitle}</h2>
          </div>
          <div><img src="${logo}" width="100px" height="100px" /></div>
            <div></div>
          </div>
          <hr />
          <div class="row">
            <div class="col-6">
              <address>
                <h5>Student Id: ${userInformation?.student_id
        }  <br /></h5>
                <h5>Student Name: ${userInformation?.displayName} <br /></h5>
                <h5>Program: ${registration?.programId?.name} <br /></h5>
                <h5>Semester: ${registration?.semesterId?.name}</h5>
              </address>
            </div>
            <div class="col-6 text-right">
              <address>
                <h5>${currentDate}</h5>
              </address>
            </div>
          </div>
        </div>
      </div>
    
      <div class="row">
        <div class="col-md-12">
          <div class="panel panel-default">
            <div class="panel-heading text-center">
              <h3 class="panel-title"><strong>${headingTitle}</strong></h3>
            </div>
            <div class="panel-body">
              <div class="table-responsive">
                <table class="table table-condensed">
                  <thead>
                    <tr>
                      <td><strong>Course Id</strong></td>
                      <td class="text-center"><strong>Course</strong></td>
                      <td class="text-center"><strong>Credit HR</strong></td>
                      <td class="text-center"><strong>Grade</strong></td>
                      <td class="text-center"><strong>Grade Points</strong></td>
                    </tr>
                  </thead>
                  <tbody>
                    
                   ${tbody}
                    <tr>
                      <td class="thick-line"></td>
                      <td class="thick-line"></td>
                      <td class="thick-line"></td>
                      <td class="thick-line text-center"><strong>Grade Point Average</strong></td>
                      <td class="thick-line text-center">${gradePointAvg}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    `,
    };

    let dbPathStore = `/grade/${userInformation?.student_id}`;
    let InvoicePath = `assets${dbPathStore}`;

    const dirName = path.dirname(InvoicePath);
    console.log({ dirName });
    if (!fs.existsSync(InvoicePath)) {
      fs.mkdir(InvoicePath, { recursive: true }, (error) =>
        console.log({ error })
      );
    }
    let fileName = "grade.pdf";
    InvoicePath += `/${fileName}`;
    dbPathStore += `/${fileName}`;

    await html_to_pdf.generatePdf(file, options).then((pdfBuffer) => {
      console.log("PDF Buffer:-", pdfBuffer);
      fs.writeFile(`${InvoicePath}`, pdfBuffer, async (err) => {
        console.log({ err });
        if (!err) {

          return exits.success({
            path: dbPathStore,
            error: "",
            fileName,
            userInformationData,
            grades,
            gradePointAvg,
            registration
          });
        } else {
          return exits.success({ path: "", error: err, userInformationData, grades, gradePointAvg, registration });
        }
      });
    });
  },
};
