import { formatDate } from '@fullcalendar/core'


export function renderEventContent(eventInfo) {
  console.log('xxxxx', eventInfo)
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
        <br />
        {
          eventInfo.event.extendedProps && (
            <div>
              <b>Projetor:</b>
              {
                eventInfo.event.extendedProps.projetor ? <i>{eventInfo.event.extendedProps.projetor}</i> : <i>{eventInfo.event.extendedProps.extendsProps.projetor}</i>
              }
            </div>
          )
        }
      </>
    );
}


export function renderSidebarEvent(event) {
    return (
      <li key={event.id}>
        <b>{formatDate(event.start, { year: 'numeric', month: 'short', day: 'numeric', locale: 'pt-br', timeZone: 'UTC' })}</b>
        <i>{event.title}</i>
        {
          event.extendedProps && (
            <div>
              <b>Projetor:</b>
              {
                event.extendedProps.projetor ? <i>{event.extendedProps.projetor}</i> : <i>{event.extendedProps.extendsProps.projetor}</i>
              }
            </div>
          )
        }
      </li>
    );
  }
  