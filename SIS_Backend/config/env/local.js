// var AWS = require("aws-sdk");
const port = 1500;
module.exports = {
  /***************************************************************************
   * Set the default database connection for models in the development       *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/
  mode: "development",
  siteName: "Sails1Template",
  shortName: "ST",
  redis_url: "redis://127.0.0.1:6379",
  models: {
    // connection: 'localMysqlServer'     //local
    // connection: 'liveMysqlServer'  // 22
    // connection: 'productionMysqlServer'  // production
    // connection: "liveMysqlServer", // production_AWS
  },
  siteName: "Sails1Template",
  mail: {
    email: "rallen@avc.edu.lr",
    password:
      "xsmtpsib-6468cb3f5acae69ee5cd5269c14ec96ef1bf3418f22bda6a6250b37663e2be6a-MT1HhxNCmtzs4RYA",
    host: "smtp-relay.sendinblue.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    from: {
      name: "Student Information System (SIS)",
      email: "notifications@avcstudentportal.com",
    },
    to: {
      name: "AVC test",
      email: "amitkadivar.ce@gmail.com",
    },
  },
  datastores: {
    default: {
      // adapter: "sails-mysql",
      adapter: "sails-postgresql",

      // url: "mysql://root@localhost:3306/school_management",
      url: "postgresql://admin:Admin@1234@178.62.0.205:5432/school_management",
    },
  },
  models: {
    migrate: "safe",
  },
  // security: {
  //   cors: {
  //     allRoutes: true,
  //     allowOrigins: "*",
  //     allowCredentials: false,
  //   },
  // },
  custom: {
    frontendUrl: `http://localhost:${port}`,
    baseUrl: `http://localhost:${port}`,
    fLWSECRETHASH: "test",
    FLW_PUBLIC_KEY: "FLWPUBK_TEST-1051569ac0dfad18be4a2120cb32153d-X",
    FLW_SECRET_KEY: "FLWSECK_TEST-c55c429f57f63f8d6cb878e75635824a-X",
    uploadFolderName: "develop"
  },

  //   /****** Hood twilio ******/
  //   twilioSid: "AC3ab15b8a2ec65785e01b190b56852f62",
  //   twilioauthToken: "ca3385ee1e9c2c830d425f58bae13a7e",
  //   twiliomobilenumber: "+17865098772",

  testEmailAccount: "pofojec414@brandoza.com",
  emailFooter: "Proudly powered by BOIMA-SIS",

  url: {
    appURL: `http://localhost:${port}`,
    applicationURL: `http://localhost:${port}`,
  },
  mode: "development",
  port: port,
};
