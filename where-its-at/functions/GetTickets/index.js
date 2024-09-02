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

  //hämtar id från pathParameters
const { id } = event.pathParameters;

  //hämtar antal tickets från query parametern
const { tickets } = event.queryStringParameters || {};

  //hittar eventet med matchande id
const eventItem = events.find(e => e.id === parseInt(id));

  //hittas inte eventet skickas en 404
if(!eventItem) {
  return sendResponse(404, { message: 'Event not found.' })
}

  //Bestämmer antal efterfrågade tickets och inget anges är default 1 ticket
const numTickets = parseInt(tickets) || 1;

  //genererar tickets med random fyrsiffrig nummer mellan 1000 och 9000
const generatedTickets = Array.from({ length: numTickets }, () => {
  return {
    ticketNumber: Math.floor(1000 + Math.random() * 9000),
    event: eventItem
  }
})

  //returnerar eventet och beställda tickets
  return sendResponse(200, { event: eventItem, tickets: generatedTickets });
};
