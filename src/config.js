const googleCalendarServiceAccount = require("./api-keys/google-calendar-service-account.json");
const config = {};

config.api = {
    googleCalendar: {
        serviceAccount: require("./api-keys/google-calendar-service-account.json"),
        calendarId: ""
    },
    myCority: {
        url: "",
        bearerToken: ""
    }
};
config.web = {};
config.web.port = process.env.WEB_PORT || 8080;

module.exports = config;