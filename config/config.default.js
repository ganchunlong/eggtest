/* eslint valid-jsdoc: "off" */

"use strict";

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});
  config.security = {
    csrf: {
      enable: false,
    },
  };
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1623658805047_5325";

  // add your middleware config here
  config.middleware = [];
  config.sequelize = {
    dialect: "mysql",
    database: "eggtest1",
    host: "127.0.0.1",
    port: 3306,
    username: "eggtest1",
    password: "admin123",
    timezone: "+08:00",
  };

  config.redis = {
    client: {
      port: 6379, // Redis port
      host: "127.0.0.1", // Redis host
      password: "",
      db: 0,
    },
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
