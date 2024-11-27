const html_to_pdf = require("html-pdf-node");
const fs = require("fs");
const path = require("path");
const { exit } = require("process");
module.exports = {
  friendlyName: "View Transcript",

  description: "Display Transcript",

  inputs: {},

  exits: {
    success: {},
  },
  fn: async function (inputs, exits) {
    const userId = this.req.userId;
    const student = await Student.findOne({
      user: userId
    })
    let transcriptsData = []
    if (student?.id) {
      transcriptsData = await Transcript.find({
        student_id: student.id
      }).sort("id DESC")
    }
    return exits.success(transcriptsData);
  },
};
