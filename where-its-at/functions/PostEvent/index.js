const { sendResponse } = require("../../responses/index.js")

const events = [
  {
    "id": 1,
    "artist": "Lasse-Stefans",
    "date": "21 MAR",
    "arena": "Kjell Härnqvistsalen",
    "time": "19.00 - 21.00",
    "price": "350 sek"
  },
  {
    "id": 2,
    "artist": "Pelle trubadur",
    "date": "29 MAR",
    "arena": "Pubelipub",
    "time": "22.00 - 00.00",
    "price": "110 sek"
  },
  {
    "id": 3,
    "artist": "Kajsas kör",
    "date": "10 APR",
    "arena": "Götaplatsen",
    "time": "15.00 - 16.00",
    "price": "99 sek"
  },
  {
    "id": 4,
    "artist": "Klubb Untz",
    "date": "17 APR",
    "arena": "Din favoritkällare",
    "time": "22.00 - du tröttnar",
    "price": "150 sek"
  }
]

exports.handler = async (event) => {
  
  if (event.requestContext.http.method === "POST") {

    try {
      const newEvent = JSON.parse(event.body);
      events.push(newEvent)

      return sendResponse(201, events);
    } catch (error) {
      return sendResponse(400, { message: 'Invalid request body!' });
    }
  } else {
    return sendResponse(405, { message: 'Method Not Allowed!' })
  }

};
