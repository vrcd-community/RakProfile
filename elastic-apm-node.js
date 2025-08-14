require("dotenv").config();

module.exports = {
  serverUrl: process.env.ELASTIC_APM_SERVER_URL,
  serviceName: process.env.ELASTIC_APM_SERVICE_NAME,
}