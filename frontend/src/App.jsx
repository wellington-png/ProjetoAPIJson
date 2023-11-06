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
    { id: 1, name: 'Projetor 1' },
    { id: 2, name: 'Projetor 2' },
    // Adicione mais projetores conforme necessário
  ];

  const people = [
    { id: 1, name: 'Pessoa 1' },
    { id: 2, name: 'Pessoa 2' },
    // Adicione mais pessoas conforme necessário
  ];

  const openModal = (selectInfo) => {
    setAllDay(selectInfo.allDay);
    setStart(selectInfo.startStr);
    setEnd(selectInfo.endStr);
    setCalendarApi(selectInfo.view.calendar);
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
    console.log(clickInfo.event.id);
    setSelectedEventId(clickInfo.event.id); // Armazena o ID do evento selecionado
    openDeleteModal(clickInfo);
  };

  const handleEvents = (events) => {
    if (events.length > 0) {
      console.log(events);
    }
    setCurrentEvents(events);
  };

  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Faça uma solicitação à sua API para obter os eventos
    axios.get('http://localhost:8080/agendamentos')
      .then(response => {
        const eventData = response.data.map(event => ({
          id: event.id,
          title: event.title,
          start: event.start,
          end: event.end,
          allDay: event.allDay,
        }));
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
  
    // Faça uma solicitação à API para atualizar o evento arrastado
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
  
    // Faça uma solicitação à API para atualizar o evento redimensionado
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

          eventDrop={handleEventDrop} // Função chamada ao soltar um evento arrastado
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