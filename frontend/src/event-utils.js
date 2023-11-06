
// import axios from 'axios'
let eventGuid = 0
// let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today



// export const INITIAL_EVENTS = [
//   {
//     "id": "3",
//     "title": "teste 2ssas",
//     "start": "2023-11-08",
//     "end": "2023-11-09",
//   }
// ]

export function createEventId() {
  return String(eventGuid++)
}
