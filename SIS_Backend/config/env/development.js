// var AWS = require("aws-sdk");

module.exports = {
  /***************************************************************************
   * Set the default database connection for models in the development       *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/
  mode: "development",
  siteName: "Sails1Template",
  shortName: "ST",
  // redis_url: "redis://127.0.0.1:6379",
  models: {
    // connection: 'localMysqlServer'     //local
    // connection: 'liveMysqlServer'  // 22
    // connection: 'productionMysqlServer'  // production
    // connection: "liveMysqlServer", // production_AWS
  },
  siteName: "Sails1Template",
  mail: {
    email: "2c8778048e0da6",
    password: "f61c8e75029a15",
    host: "smtp.mailtrap.io",
    port: 587,
    secure: false, // true for 465, false for other ports
    from: {
      name: "Debug Mail",
      email: "test@test.com",
    },
    to: {
      name: "",
      email: "test@test.com",
    },
  },
  datastores: {
    default: {
      adapter: "sails-postgresql",
      url: "postgresql://postgres:secured@192.168.1.4:5432/school_management",
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
    frontendUrl:"http://localhost:3000",
    baseUrl: "http://localhost:1500",
    fLWSECRETHASH: "test",
    FLW_PUBLIC_KEY: "FLWPUBK_TEST-1051569ac0dfad18be4a2120cb32153d-X",
    FLW_SECRET_KEY: "FLWSECK_TEST-c55c429f57f63f8d6cb878e75635824a-X",
    uploadFolderName:"develop"
  },

  //   /****** Hood twilio ******/
  //   twilioSid: "AC3ab15b8a2ec65785e01b190b56852f62",
  //   twilioauthToken: "ca3385ee1e9c2c830d425f58bae13a7e",
  //   twiliomobilenumber: "+17865098772",

  testEmailAccount: "pofojec414@brandoza.com",
  emailFooter: "Proudly powered by BOIMA-SIS",

  url: {
    appURL: "http://localhost:1337",
    applicationURL: "http://localhost:1337",
  },
  mode: "development",
  port: 1500,
};
