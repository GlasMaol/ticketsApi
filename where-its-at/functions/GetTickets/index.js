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


//query ex. for this code: /events/1?tickets=3

exports.handler = async (event) => {
const { id } = event.pathParameters;
const { tickets } = event.queryStringParameters || {};

const eventItem = events.find(e => e.id === parseInt(id));

if(!eventItem) {
  return sendResponse(404, { message: 'Event not found.' })
}

const numTickets = parseInt(tickets) || 1;

const generatedTickets = Array.from({ length: numTickets }, () => {
  return {
    ticketNumber: Math.floor(1000 + Math.random() * 9000),
    event: eventItem
  }
})

  return sendResponse(200, { event: eventItem, tickets: generatedTickets });
};
