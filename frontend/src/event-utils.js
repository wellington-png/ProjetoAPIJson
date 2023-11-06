import { v4 as uuidv4 } from 'uuid';
let eventGuid = 0


export function createEventId() {
  return String(eventGuid++)
}
