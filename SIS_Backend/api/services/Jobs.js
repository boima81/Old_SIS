/**
 * Kue job queue holder
 *
 * Queue will be loaded into this object in bootstrap.js
 */
module.exports = {
  _processors: {
    sendInviteSMS: function (job, cb) {
      // if (!job.data.contact) return cb(new Error("Contact not provided"));
      // sails.log("Contact number to send invite", job.data.contact.contactnumber);
      // var contact = job.data.contact;
      // var userid = job.data.userid;
      // var contactmodel = new Contact._model(job.data.contact);
      // Contact.sendInvitation(contact, userid, function(err) {
      //   sails.log("Job gets called", job.data.contact);
      //   cb();
      // });
    },
    demoJob: function (job, cb) {
      console.error("Job,job is done", job.data.priority);
      cb();
    },

    sendMail: function (job, cb) {
      Mailer.sendMail(job.data.mainOptions, function (err, info) {
        if (err) {
          console.log(err);
          cb(err);
        }
        cb();
      });
    },
  },
};
