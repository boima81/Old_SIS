const html_to_pdf = require("html-pdf-node");
const fs = require("fs");
const path = require("path");
const moment = require("moment");

module.exports = {
  friendlyName: "Letter Of Condition Helper",

  description: "",

  inputs: {
    id: {
      type: "number",
      required: true,
    },
    createdBy: {
      type: "number",
      required: true,
    },
    type: {
      type: "string",
      require: true,
    },
    conditions: {
      type: "string",
      require: true,
    },
  },

  exits: {
    success: {
      description: "All done.",
    },
  },
  fn: async function (inputs, exits) {
    const existApplication = inputs;
    let options = {
      format: "A4",
    };

    // const user = await User.findOne({
    //   id: inputs.createdBy,
    // });
    // let userInformation = await UserInformation.findOne({
    //   id: user?.userInformationId,
    // }).populate("student");

    let applicationData = await Application.findOne({
      id: inputs.id,
    })
      .populate("semesterId")
      .populate("programId")
      .populate("userInformationId")
      .populate('student');
    
    applicationData = applicationData.toJSON();
    const studentData = applicationData?.student
    console.log({studentData})
    let userInformation = {};
    if (applicationData?.userInformationId) {
      userInformation = applicationData?.userInformationId?.toJSON();
    }
    console.log({ userInformation });
    const studentName = userInformation?.displayName;
    const address = userInformation?.address;
    const semester = applicationData?.semesterId?.name;
    const program = applicationData?.programId?.name;
    const baseUrl = sails.config.custom.baseUrl;
    const currentDate = moment().format("MM/DD/YYYY");
    let file = {
      content: `<div style="padding: 50px; max-width: 1500px; margin: auto">
  <div style="-aw-headerfooter-type: header-primary">
    <p
      style="
        margin-top: 0pt;
        margin-bottom: 0pt;
        text-align: right;
        font-size: 11pt;
        display: flex;
        justify-content: flex-end;
      "
    >
      <img
        src="${baseUrl}/images/ab5qx-iz85b.001.png"
        width="222"
        height="68"
        alt=""
        style="
          -aw-left-pos: 0pt;
          -aw-rel-hpos: column;
          -aw-rel-vpos: paragraph;
          -aw-top-pos: 0pt;
          -aw-wrap-type: inline;
        "
      />
    </p>
  </div>
  <p style="margin-top: 0pt; margin-bottom: 0pt; font-size: 12pt">Date: ${currentDate}</p>

  <p style="margin-top: 0pt; margin-bottom: 0pt; font-size: 12pt">&#xa0;</p>
  <div style="display:flex">
  <p style="margin-top: 0pt; margin-bottom: 0pt; font-size: 12pt">
    STUDENT NAME <span style="margin-left: 65px">: ${studentName}</span>
  </p>
  </div>
  <p style="margin-top: 0pt; margin-bottom: 0pt; font-size: 12pt">
    STUDENT ID <span style="margin-left: 95px">: ${studentData?.student_id}</span>
  </p>
  <p style="margin-top: 0pt; margin-bottom: 0pt; font-size: 12pt">
    STUDENT ADDRESS <span style="margin-left: 40px">: ${address}</span>
  </p>
  <p style="margin-top: 0pt; margin-bottom: 0pt; font-size: 12pt">
    SCHOOL OR COLLEGE <span style="margin-left: 23px">: ${program}</span>
  </p>
    <p style="margin-top: 0pt; margin-bottom: 0pt; font-size: 12pt">
    PURSUING DEGREE <span style="margin-left: 45px">: ${program}</span>
  </p>
  <p style="margin-top: 0pt; margin-bottom: 0pt; font-size: 12pt">
    STUDENT STATUS <span style="margin-left: 56px">: NEW</span>
  </p>

  <h1 style="margin-block: 50px; text-align: center; font-size: 14pt;">
    <b>LETTER OF ADMISSION</b>
  </h1>

  <p style="margin-top: 0pt; margin-bottom: 0pt; font-size: 12pt">
    Dear ${studentName},
  </p>
  <p style="margin-top: 0pt; margin-bottom: 0pt; font-size: 12pt">
    Congratulations! On behalf of President and the entire community of
    Nubian American Advanced College community (NAAC), I am delighted to inform you that 
    the College’s committee on admission has admitted you to NAAC for
    ${semester}, in the ${program}.
  </p>

    <h1 style="margin-top: 10pt; margin-bottom: 0pt; font-size: 14pt;">
      <b>CONDITIONS AND REQUIREMENTS.</b>
    </h1>
    <p style="margin-top: 5px; margin-bottom: 0pt; font-size: 12pt">
      ${inputs?.conditions?.replace(/\n/g, '<br>') }
    </p>

  <p
    style="
      margin-top: 20px;
      margin-bottom: 0pt;
      text-align: justify;
      font-size: 12pt;
    "
  >
   NAAC is a US model community college with US university partners. If you have
  completed college level credit courses by proficiency exam, dual-enrollment or any
  other programs, you must provide transcripts from each institution prior to
  registration for those credits to be reviewed for transferability. Meanwhile, please
  continue to check your email for any information regarding your NAAC Email
  address, and instructions on how to activate your BOIMA Online Learning platform
  account.
  </p>

  <p style="margin-top: 0pt; margin-bottom: 0pt; font-size: 12pt">
  We look forward to answering any questions regarding your academic pathway
    and welcoming you to the NAAC community.
  </p>

  <p style="margin-top: 30px; margin-bottom: 0pt; font-size: 12pt">
    With warm regards,
  </p>
  <div style="margin-top: 0pt; margin-bottom: 0pt; font-size: 12pt">
    <img
      src="${baseUrl}/images/pdf_signature.png"
      width="107"
      height="41"
      alt=""
      style="
        margin: 3.22pt 9pt 3.6pt 8.62pt;
        -aw-left-pos: 2pt;
        -aw-rel-hpos: column;
        -aw-rel-vpos: paragraph;
        -aw-top-pos: 7.75pt;
        -aw-wrap-type: square;
      "
    />
  </div>

  <div style="margin-top: 10px">
    <p style="margin-top: 0pt; margin-bottom: 0pt; font-size: 12pt">
      Mrs. Ogechi Felicia Ibegbu
    </p>
    <p style="margin-top: 1pt; margin-bottom: 0pt; font-size: 12pt">
      <b>BA, MSc, PDE, TRCN Certified</b>
    </p>
    <p style="margin-top: 1px; margin-bottom: 0pt; font-size: 12pt">
      Director
    </p>
    <p
      style="
        margin-top: 0pt;
        margin-bottom: 0pt;
        text-align: justify;
        font-size: 12pt;
      "
    >
      Admission, Records & Registration
    </p>
  </div>
  <div style="-aw-headerfooter-type: footer-primary">
    <div
      style="
        margin-top: 0pt;
        margin-bottom: 0pt;
        text-align: right;
        font-size: 11pt;
        display: flex;
        align-items: flex-end;
        flex-direction: column;
      "
    >
      <div>
        <div>
          <img
            src="${baseUrl}/images/ab5qx-iz85b.003.png"
            width="196"
            height="57"
            alt=""
          />
        </div>
        <div style="text-align: center">www.nubianaacollege.org</div>
      </div>
    </div>
    <!-- <p
      style="
        margin-top: 0pt;
        margin-bottom: 0pt;
        text-align: right;
        font-size: 11pt;
      "
    >
      www.nubianaacollege.org
    </p> -->
  </div>
</div>
`,
    };

    let dbPathStore = `/application/condition/${existApplication?.createdBy}/${existApplication?.id}`;
    let admissionPah = `assets${dbPathStore}`;

    const dirName = path.dirname(admissionPah);
    console.log({ dirName });
    if (!fs.existsSync(admissionPah)) {
      fs.mkdir(admissionPah, { recursive: true }, (error) =>
        console.log({ error })
      );
    }
    let fileName = `${existApplication?.type || "Letter Of Condition"}.pdf`;

    admissionPah += `/${fileName}`;
    dbPathStore += `/${fileName}`;

    await html_to_pdf
      .generatePdf(file, options)
      .then((pdfBuffer) => {
        console.log("PDF Buffer:-", pdfBuffer);
        fs.writeFile(`${admissionPah}`, pdfBuffer, async (err) => {
          console.log({ err });
          if (!err) {
            return exits.success({
              path: dbPathStore,
              error: "",
              fileName,
              name: existApplication?.type,
            });
          } else {
            return exits.success({ path: "", error: err });
          }
        });
      })
      .catch((error) => {
        console.log({ error });
        return exits.success({ path: "", error: error });
      });
  },
};
