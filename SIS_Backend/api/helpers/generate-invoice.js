const html_to_pdf = require("html-pdf-node");
const fs = require("fs");
const path = require("path");
const moment = require("moment");

module.exports = {
  friendlyName: "Generate Invoice helper",

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
    const receiptGenerateData = await sails.helpers.common(
      existRegistration?.id || id
    );
    console.log({ receiptGenerateData });
    let tbody = receiptGenerateData?.data?.map(
      (receiptGenerate) => receiptGenerate?.table
    );
    let invoiceData = await Invoice.find({
      createdBy: existRegistration?.createdBy,
    })
      .sort("id DESC")
      .limit(1);
    const userData = await User.findOne({
      id: existRegistration?.createdBy,
    });
    let userInformation = await UserInformation.findOne({
      id: userData?.userInformationId,
    }).populate("student");
    userInformation = userInformation.toJSON();
    console.log({ userInformation, userData });
    invoiceData = invoiceData?.[0] || {};

    let applicationSetting = await ApplicationSettings.find()
      .limit(1)
      .populate("logo");
    applicationSetting = applicationSetting?.[0];
    console.log({ applicationSetting })
    const logo =
      applicationSetting?.logo?.url ||
      `${sails.config.custom.baseUrl}/images/logo.png`;
    let headingTitle = "Billing";
    if (existRegistration?.type === "receipt") {
      tbody += `<tr>
                      <td class="thick-line"></td>
                      <td class="thick-line"></td>
                      <td class="thick-line"></td>
                      <td class="thick-line"></td>
                      <td class="thick-line"></td>
                      <td class="thick-line"></td>
                      <td class="thick-line"></td>
                      <td class="thick-line"></td>
                      <td class="thick-line"></td>
                      <td class="thick-line"></td>
                      <td class="thick-line text-center">
                        <strong>Payment Terms</strong>
                      </td>
                      <td class="thick-line text-right">${
                        (invoiceData?.totalTerms || 1) <= 1 ? "Full" : "Split"
                      }</td>
                    </tr>
                    <tr>
                      <td class="thick-line"></td>
                      <td class="thick-line"></td>
                      <td class="thick-line"></td>
                      <td class="thick-line"></td>
                      <td class="thick-line"></td>
                      <td class="thick-line"></td>
                      <td class="thick-line"></td>
                      <td class="thick-line"></td>
                      <td class="thick-line"></td>
                      <td class="thick-line"></td>
                      <td class="thick-line text-center">
                        <strong>Amount Paid</strong>
                      </td>
                      <td class="thick-line text-right">$${
                        invoiceData?.amount_paid || 0
                      }</td>
                    </tr>
                    <tr>
                      <td class="thick-line"></td>
                      <td class="thick-line"></td>
                      <td class="thick-line"></td>
                      <td class="thick-line"></td>
                      <td class="thick-line"></td>
                      <td class="thick-line"></td>
                      <td class="thick-line"></td>
                      <td class="thick-line"></td>
                      <td class="thick-line"></td>
                      <td class="thick-line"></td>
                      <td class="thick-line text-center">
                        <strong>Balance</strong>
                      </td>
                      <td class="thick-line text-right">$${
                        (invoiceData?.total_amount || 0) -
                        (invoiceData?.amount_paid || 0)
                      }</td>
                    </tr>`;
      headingTitle = "Registration Complete";
    }

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
                <h5>Student Id: ${
                  userInformation?.student?.student_id
                }  <br /></h5>
                <h5>Student Name: ${userInformation?.displayName} <br /></h5>
                <h5>Program: ${receiptGenerateData?.program} <br /></h5>
                <h5>Semester: ${receiptGenerateData?.semester}</h5>
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
                      <td><strong>Course Code</strong></td>
                      <td><strong>Course No.</strong></td>
                      <td class="text-center"><strong>Course</strong></td>
                      <td class="text-center"><strong>Category</strong></td>
                      <td class="text-right"><strong>Credit</strong></td>
                      <td class="text-right"><strong>Section</strong></td>
                      <td class="text-right"><strong>Schedule</strong></td>
                      <td class="text-right"><strong>Time</strong></td>
                      <td class="text-right"><strong>Classroom</strong></td>
                      <td class="text-right"><strong>Instructor</strong></td>
                      <td class="text-right"><strong>Fees Per Credit</strong></td>
                      <td class="text-right"><strong>Course Fees</strong></td>
                    </tr>
                  </thead>
                  <tbody>
                    
                   ${tbody}
                    <tr>
                      <td class="thick-line"></td>
                      <td class="thick-line"></td>
                      <td class="thick-line"></td>
                      <td class="thick-line"></td>
                      <td class="thick-line"></td>
                      <td class="thick-line"></td>
                      <td class="thick-line"></td>
                      <td class="thick-line"></td>
                      <td class="thick-line"></td>
                      <td class="thick-line"></td>
                      <td class="thick-line text-center"><strong>Total</strong></td>
                      <td class="thick-line text-right">$${
                        invoiceData?.total_amount || 0
                      }</td>
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

    let dbPathStore = `/invoice/${existRegistration?.createdBy}/${existRegistration?.id}`;
    let InvoicePath = `assets${dbPathStore}`;

    const dirName = path.dirname(InvoicePath);
    console.log({ dirName });
    if (!fs.existsSync(InvoicePath)) {
      fs.mkdir(InvoicePath, { recursive: true }, (error) =>
        console.log({ error })
      );
    }
    let fileName = "";
    if (existRegistration?.type === "billing") {
      fileName = "billing.pdf";
    } else if (existRegistration?.type === "receipt") {
      fileName = "receipt.pdf";
    }
    InvoicePath += `/${fileName}`;
    dbPathStore += `/${fileName}`;

    await html_to_pdf.generatePdf(file, options).then((pdfBuffer) => {
      console.log("PDF Buffer:-", pdfBuffer);
      fs.writeFile(`${InvoicePath}`, pdfBuffer, async (err) => {
        console.log({ err });
        if (!err) {
          const receiptData = await Receipt.findOne({
            registration: existRegistration?.id,
            feeType: existRegistration?.type,
          });
          const receiptInputData = {
            feeType: existRegistration?.type,
            filePath: dbPathStore,
            registration: existRegistration?.id,
            createdBy: existRegistration?.createdBy,
            fileName,
          };
          if (receiptData) {
            await Receipt.updateOne({
              id: receiptData?.id,
            }).set(receiptInputData);
          } else {
            const receiptCreated = await Receipt.create(
              receiptInputData
            ).fetch();
            console.log({ receiptCreated });
          }
          return exits.success({
            path: dbPathStore,
            error: "",
            fileName,
            name: existRegistration?.type,
          });
        } else {
          return exits.success({ path: "", error: err });
        }
      });
    });
  },
};
