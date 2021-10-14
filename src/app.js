const express = require("express");
const { WebhookClient } = require("dialogflow-fulfillment");
const {google} = require('googleapis');
const app = express();

app.post("/dialogflow", express.json(), (request, response) => {
    const agent = new WebhookClient({ request, response });
    console.log("Parameters", agent.parameters);
    const appointment_type = agent.parameters.AppointmentType;
    function makeAppointment (agent) {
      // Calculate appointment start and end datetimes (end = +1hr from start)
      const dateTimeStart = new Date(Date.parse(agent.parameters.date.split('T')[0] + 'T' + agent.parameters.time.split('T')[1].split('-')[0] + timeZoneOffset));
      const dateTimeEnd = new Date(new Date(dateTimeStart).setHours(dateTimeStart.getHours() + 1));
      const appointmentTimeString = dateTimeStart.toLocaleString(
        'en-US',
        { month: 'long', day: 'numeric', hour: 'numeric', timeZone: timeZone }
      );
       // Check the availability of the time, and make an appointment if there is time on the calendar
      return createCalendarEvent(dateTimeStart, dateTimeEnd, appointment_type).then(() => {
        agent.add(`Ok, let me see if we can fit you in. ${appointmentTimeString} is fine!.`);
      }).catch(() => {
        agent.add(`I'm sorry, there are no slots available for ${appointmentTimeString}.`);
      });
    }
   
   // Handle the Dialogflow intent named 'Schedule Appointment'.
    let intentMap = new Map();
    intentMap.set('Schedule Appointment', makeAppointment);
    agent.handleRequest(intentMap);
});

// Enter your calendar ID below and service account JSON below
const calendarId = "4ep57k73b9fpft0thuc18n7s64@group.calendar.google.com";
const serviceAccount = {
  "type": "service_account",
  "project_id": "cority-hackathon",
  "private_key_id": "1db77ebee2e95c56f28a92102ecb93ddbde1279b",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC+2seJY36NY1M6\nWohxBByJvf1KyBnd2e3vcb54kcnI04FTbduq0cqrOL56mR8ZHDUmQ7AOujfBL3ty\nZskV1zn1AqmWTEx/8lhBLD+f5xNW4T1wSBRDy6fOBBJhhv9Urq2MREiLSy0gFWLo\nDk7Wp4vBtse9W5Vdzlp+rw4hn06ukweXxri3qLZR7c5u2C8PjPm5TfsxDuxlcejx\nmZCZVSlptNqvhTcW3OTIyrSr4RBy59LXgthRPykoKL+3+4PXd6+oKaEGel3KroN4\ntqfOrOjGUmX+tq3j7FEdwdaiy1Zs4vRTZpjkeZBHd2BYwCiudYfM6hoguKhM26N5\nK1Wpd05BAgMBAAECggEAAcGLknUK5gwi6OeKV9fc11ubKAP9UPA/YzOduAhHXgSs\nLPNW0RSLE9Y60m/0PEvpJUf8J7aI6ssgDKZrdTr8uodivhJHpem57CeXEkaTA/qg\nkRbosNL/4UJiVOlkEghlamP6cuWnLaNkvJPdH9Z8z7R51AEyt6E9ber4a1DG7Y5C\nsMlXfmglfB1oNFPd/2eSrtLN4Vr672GcVDg8rD98A3MAunKHWVsjw8dUCdJYlYqq\ntk9v0tN78Ck951Bq79k5Tv8a+ZH2PX7/ZRm2EEEKC4u608kyV0wbekyxu6nmaswF\nMwEkFpcEzWP39cogHnmEFBDqLwyOr/QC6Vo+vS0BAQKBgQDs/6dSog2AFq0Hv6bY\nHQBOhfZqylMF/NKI/SZpKrq0Y2a1f12XVdS3eokVL392Yj2pSr5KNEGrFBjLiYyO\nIdEvNVm8bJ/ph1SWzDIkIoIuUIszXdBjmoRBPHaYm7kUMNIivZwRARaPVj/kT277\nj/pK1P1hj6TIE7wXNteGirExEQKBgQDOKAeBXKhrMELDZpC5U4ccz14O2P7ayuKT\nZZARkwwfuC6nVPsiI1GSYb7w70T8LrNk/ugo9c0xz6Jk38GjqNiH/ykPMXE/bNsI\nOkUwDVgHDdxEPYvO9ZS8EnfOOHljekm1jgFB8+YFcECs9i0g+iAmpSQ66sQsbJ73\n8FLrz35KMQKBgQC8A0ijRkn9fn/AMOtUcRVoNeA58c4RZvNCl8mcDrjVGDJH9AW0\nY/P/pqcPdoHg0ajnH5N8XJ5n8OaGudUWgH9puyI4V9g4tBKIGvAAOJwbz+vOUTNb\ngR5Afo37HTajbOOXieJAnyNdjOfc4KND0IGYUgW9Gu53hyhlJi2u32IYcQKBgDR1\nwTss/fqQxFx+7BMM61PsfO3gUDIS8Mc7UAb42Vv0/YI9QM62GBrc3r7m1DIsHCB2\nMVPDAN1NDfEHc3oXDErHJoakOUI/jBky4spQivb4kvWWh845dgjJ1kzW2CT1SG53\n3WAQFZeKshqRZnh+zdGnsml/tj3rwiQrtp4lJejxAoGBANU/5jEsUzcLtSXhRviZ\nNfDIA3Bg9zUZqJDDSdPPH979PnKT2unOKQz9efoCM/0Dptbee4YIEpcwEim9OGdg\nAtlvnfDYksiYATbdJpWPtLChnYhsk2F9L2GLRbKuX4bmxHY9YV4XyBs7xJcrBI54\nl/XnaWgEncPgUzc+iDeIfnyg\n-----END PRIVATE KEY-----\n",
  "client_email": "appointment-scheduler@cority-hackathon.iam.gserviceaccount.com",
  "client_id": "108973004563102604317",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/appointment-scheduler%40cority-hackathon.iam.gserviceaccount.com"
}; // Starts with {"type": "service_account",...

// Set up Google Calendar Service account credentials
const serviceAccountAuth = new google.auth.JWT({
 email: serviceAccount.client_email,
 key: serviceAccount.private_key,
 scopes: 'https://www.googleapis.com/auth/calendar'
});

const calendar = google.calendar('v3');
process.env.DEBUG = 'dialogflow:*'; // enables lib debugging statements

const timeZone = 'America/Los_Angeles';
const timeZoneOffset = '-07:00';

//Creates calendar event in Google Calendar
function createCalendarEvent (dateTimeStart, dateTimeEnd, appointment_type) {
 return new Promise((resolve, reject) => {
   calendar.events.list({
     auth: serviceAccountAuth, // List events for time period
     calendarId: calendarId,
     timeMin: dateTimeStart.toISOString(),
     timeMax: dateTimeEnd.toISOString()
   }, (err, calendarResponse) => {
     // Check if there is a event already on the Calendar
     if (err || calendarResponse.data.items.length > 0) {
       reject(err || new Error('Requested time conflicts with another appointment'));
     } else {
       // Create event for the requested time period
       calendar.events.insert({ auth: serviceAccountAuth,
         calendarId: calendarId,
         resource: {summary: appointment_type +' Appointment', description: appointment_type,
           start: {dateTime: dateTimeStart},
           end: {dateTime: dateTimeEnd}}
       }, (err, event) => {
         err ? reject(err) : resolve(event);
       }
       );
     }
   });
 });
}

app.listen(process.env.PORT || 8080);



