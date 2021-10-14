const googleCalendarServiceAccount = require("./api-keys/google-calendar-service-account.json");
const config = {};

config.api = {
    googleCalendar: {
        serviceAccount: require("./api-keys/google-calendar-service-account.json"),
        calendarId: "4ep57k73b9fpft0thuc18n7s64@group.calendar.google.com"
    },
    myCority: {
        url: "https://devstaging.mycority.com/hackathon_team1/api/portalscheduleentry/bookappointment",
        bearerToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOi0xLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjotMSwianRpIjoiNzJjNmY5ODAtYWMxNC00ZjYyLWIwYTktMWUwNTU3YjMxMDA4IiwiaWF0IjoxNjM0MTU4NTM4LCJ1c2VyRGF0ZUZvcm1hdCI6Im1tL2RkL3l5eXkiLCJ1c2VyVGltZUZvcm1hdCI6IkhIOk1NIGFtL3BtIiwidXNlclRpbWVab25lIjoiLTgiLCJob3N0IjoiITpXeE41QTdqTmtNY0xJeXBvM3VzR3VxeXZESUk1K3Z0L1B2Z0dRbHpSeHhZOUFVWk85bTRML3ErOE5Wcndva3lFIiwibGFuZ3VhZ2VJZCI6NywiZ3Vlc3RFbXBsb3llZUlkIjowLCJuYmYiOjE2MzQxNTg1MzgsImV4cCI6MTYzNDQxNzczOCwiaXNzIjoiUmFwdG9ySXNzdWVyIiwiYXVkIjoiUmFwdG9yQXVkaWVuY2UifQ.hZEatD08VcxlFEH2UGDrImABuctAS4rzUJufs5i6e4s"
    }
};
config.web = {};
config.web.port = process.env.WEB_PORT || 8080;

module.exports = config;