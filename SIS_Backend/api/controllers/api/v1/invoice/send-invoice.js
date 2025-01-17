var html_to_pdf = require("html-pdf-node");
const fs = require("fs");
module.exports = {
  friendlyName: "Create Invoice",

  description: "Create Invoice.",

  inputs: {
    id: {
      type: "number",
      required: false,
    },
    amountPaid: {
      type: "number",
      required: false,
      description: "Name is required.",
    },
    receipt_number: {
      type: "string",
      required: false,
      description: "Recepit Number is required.",
    },
  },
  exits: {
    invalid: {
      statusCode: 409,
      description: "All field is required.",
    },
    redirect: {
      responseType: "redirect",
    },
  },

  fn: async function (inputs, exits) {
    // mailStatus = await sails.helpers.sendEmail.with({
    //   to: "pofojec414@brandoza.com",
    //   subject: "Invoice send successfully",
    //   template: "invoice/invoice",
    //   typeOfSend: "now", // 'now', 'queue', 'preview'
    //   layout: "layout-email",
    //   templateData: {
    //     fullName: "prince",
    //     //   token: 'my Token'
    //   },
    // });
    // console.log("mailStatus", mailStatus);

    let options = {
      format: "A1",
      // path: "/Users/amitkadivar/WorkPlace/Nodejs/Sails Js Template With GraphQL/assets/invoice",
    };
    // Example of options with args //
    // let options = { format: 'A4', args: ['--no-sandbox', '--disable-setuid-sandbox'] };
    // const getContent = document.getElementById("container").innerHTML;
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
          <div class="invoice-title">
            <h2>Invoice</h2>
            <h3 class="pull-right">Order # 12345</h3>
          </div>
          <hr />
          <div class="row">
            <div class="col-6">
              <address>
                <strong>Billed To:</strong><br />
                John Smith<br />
                1234 Main<br />
                Apt. 4B<br />
                Springfield, ST 54321
              </address>
            </div>
            <div class="col-6 text-right">
              <address>
                <strong>Shipped To:</strong><br />
                Jane Smith<br />
                1234 Main<br />
                Apt. 4B<br />
                Springfield, ST 54321
              </address>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <address>
                <strong>Payment Method:</strong><br />
                Visa ending **** 4242<br />
                jsmith@email.com
              </address>
            </div>
            <div class="col-6 text-right">
              <address>
                <strong>Order Date:</strong><br />
                March 7, 2014<br /><br />
              </address>
            </div>
          </div>
        </div>
      </div>
    
      <div class="row">
        <div class="col-md-12">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title"><strong>Order summary</strong></h3>
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
                    <!-- foreach ($order->lineItems as $line) or some such thing here -->
                    <tr>
                      <td>MSIS 521</td>
                      <td>521</td>
                      <td>Governance and Controls for Information Security</td>
                      <td class="text-center">Elective</td>
                      <td class="text-center">3</td>
                      <td class="text-center">1</td>
                      <td class="text-right">T/TH/S</td>
                      <td class="text-right">08 AM</td>
                      <td class="text-right">A56</td>
                      <td class="text-right">Jon Te</td>
                      <td class="text-right">15.00</td>
                      <td class="text-right">45</td>
                    </tr>
                    <tr>
                      <td>MSIS 521</td>
                      <td>521</td>
                      <td>Governance and Controls for Information Security</td>
                      <td class="text-center">Elective</td>
                      <td class="text-center">3</td>
                      <td class="text-center">1</td>
                      <td class="text-right">T/TH/S</td>
                      <td class="text-right">08 AM</td>
                      <td class="text-right">A56</td>
                      <td class="text-right">Jon Te</td>
                      <td class="text-right">15.00</td>
                      <td class="text-right">45</td>
                    </tr>
                    <tr>
                      <td>MSIS 521</td>
                      <td>521</td>
                      <td>Governance and Controls for Information Security</td>
                      <td class="text-center">Elective</td>
                      <td class="text-center">3</td>
                      <td class="text-center">1</td>
                      <td class="text-right">T/TH/S</td>
                      <td class="text-right">08 AM</td>
                      <td class="text-right">A56</td>
                      <td class="text-right">Jon Te</td>
                      <td class="text-right">15.00</td>
                      <td class="text-right">45</td>
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
                        <strong>Payment Terms</strong>
                      </td>
                      <td class="thick-line text-right">PT</td>
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
                      <td class="thick-line text-right">$670.99</td>
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
                      <td class="thick-line text-right">$15</td>
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
                      <td class="thick-line text-center"><strong>Total</strong></td>
                      <td class="thick-line text-right">$685.99</td>
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
    // let file = { url: sails.config.custom.baseUrl + "/invoice" };

    await html_to_pdf.generatePdf(file, options).then((pdfBuffer) => {
      console.log("PDF Buffer:-", pdfBuffer);
      fs.writeFile("assets/invoice/invoice.pdf", pdfBuffer, (err) => {
        console.log({ err });
      });
    });

    return exits.success({});
  },
};
