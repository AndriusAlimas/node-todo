var configValues = require("./config");
const Cryptr = require("cryptr");
const cryptr = new Cryptr("myTotallySecretKey");

const encryptedPwd = cryptr.encrypt(configValues.pwd);
const decryptedPwd = cryptr.decrypt(encryptedPwd);

module.exports = {
  getDbConnectionString: function () {
    return `mongodb+srv://${configValues.username}:${decryptedPwd}@cluster0.mhwtq3a.mongodb.net/${configValues.databaseName}`;
  },
};
