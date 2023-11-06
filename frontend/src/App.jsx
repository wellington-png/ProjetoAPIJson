import axios from 'axios'
import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { createEventId } from './event-utils';
import { renderEventContent, renderSidebarEvent } from './components'
import ModalComponent from './components/Modal';
import DeleteModal from './components/ModalDelete';
import { useAgendamentoContext } from './context/cadastroAgendamento';


const apiURL = 'http://localhost:8080'

function DemoApp() {
  const [weekendsVisible, setWeekendsVisible] = useState(false);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [draggedEvent, setDraggedEvent] = useState(null);

  const {
    setAllDay,
    setStart,
    setEnd,
    setCalendarApi,
    setId,
  } = useAgendamentoContext();

  const projectors = [
    { id: 1, name: 'Projetor Tomate 235r' },
    { id: 2, name: 'Projetor Pior que o Tomate' },
    { id: 3, name: 'Projetor EPSON preto' },
    { id: 4, name: 'Projetor EPSON branco' },
  ];

  const people = [
    { id: 1, name: 'Karl' },
    { id: 2, name: 'Estevão' },
    { id: 3, name: 'Felipe' },
    { id: 4, name: 'Edson' },
    { id: 5, name: 'Autino' },
  ];

  const openModal = (selectInfo) => {
    setAllDay(selectInfo.allDay);
    setStart(selectInfo.startStr);
    setEnd(selectInfo.endStr);
    setCalendarApi(selectInfo.view.calendar);
    console.log();
    setId(createEventId());
    setIsModalOpen(true);
  };

  const handleEventDelete = (eventId) => {
    // Atualize a lista de eventos excluindo o evento com o eventId
    const updatedEvents = currentEvents.filter(event => event.id !== eventId);
    setCurrentEvents(updatedEvents);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openDeleteModal = (selectInfo) => {
    setSelectedEventId(selectInfo.event.id);
    setIsModalDeleteOpen(true);
  };


  const handleWeekendsToggle = () => {
    setWeekendsVisible(!weekendsVisible);
  };

  const closeDeleteModal = () => {
    setIsModalDeleteOpen(false);
  };


  const handleEventClick = (clickInfo) => {
    setSelectedEventId(clickInfo.event.id); // Armazena o ID do evento selecionado
    openDeleteModal(clickInfo);
  };

  const handleEvents = (events) => {
    setCurrentEvents(events);
  };

  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/agendamentos')
      .then(response => {
        const eventData = response.data
        setEvents(eventData);
      })
      .catch(error => {
        console.error('Erro ao obter eventos da API:', error);
      });
  }, []);

  const handleEventDrop = (dropInfo) => {
    const updatedEvent = {
      id: dropInfo.event.id,
      title: dropInfo.event.title,
      start: dropInfo.event.start,
      end: dropInfo.event.end,
      allDay: dropInfo.event.allDay,
    };
  
    axios.put(`${apiURL}/agendamentos/${updatedEvent.id}`, updatedEvent)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.error(error);
        alert('Erro ao atualizar o agendamento');
      });
  };
  
  const handleEventResize = (resizeInfo) => {
    const updatedEvent = {
      id: resizeInfo.event.id,
      title: resizeInfo.event.title,
      start: resizeInfo.event.start,
      end: resizeInfo.event.end,
      allDay: resizeInfo.event.allDay,
    };
  
    axios.put(`${apiURL}/agendamentos/${updatedEvent.id}`, updatedEvent)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.error(error);
        alert('Erro ao atualizar o agendamento');
      });
  };


  return (
    <div className='demo-app'>

      <div className='demo-app-sidebar'>
        <div className='demo-app-sidebar-section'>
          <label>
            <input
              type='checkbox'
              checked={weekendsVisible}
              onChange={handleWeekendsToggle}
            ></input>
            toggle weekends
          </label>
        </div>
        <div className='demo-app-sidebar-section'>
          <h2>All Events ({currentEvents.length})</h2>
          <ul>{currentEvents.map(renderSidebarEvent)}</ul>
        </div>
      </div>
      <div className='demo-app-main'>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          initialView='dayGridMonth'
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={weekendsVisible}

          events={events}

          select={openModal}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          eventsSet={handleEvents}

          eventDrop={handleEventDrop}
          eventResize={handleEventResize}

          eventDragStart={(dragInfo) => setDraggedEvent(dragInfo.event)}
          eventDragStop={() => setDraggedEvent(null)}
        />
        <ModalComponent isOpen={isModalOpen} onClose={closeModal} projectors={projectors} people={people} />
        <DeleteModal isOpen={isModalDeleteOpen} onClose={closeDeleteModal} eventId={selectedEventId} onDelete={handleEventDelete} />
      </div>
    </div>
  );
}

export default DemoApp;