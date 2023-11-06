import { formatDate } from '@fullcalendar/core'


export function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
}


export function renderSidebarEvent(event) {
    return (
      <li key={event.id}>
        <b>{formatDate(event.start, { year: 'numeric', month: 'short', day: 'numeric', locale: 'pt-br', timeZone: 'UTC' })}</b>
        <i>{event.title}</i>
      </li>
    );
  }
  