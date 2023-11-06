import { createContext, useContext, useState } from 'react';

const agendamentoInicial = {
  id: null,
  pessoa: null,
  projetor: null,
  allDay: false,
  start: null,
  end: null,
  calendarApi: null,
}

export const AgendamentoContext = createContext({
  agendamento: agendamentoInicial,
  setPessoa: () => null,
  setProjetor: () => null,
  setAllDay: () => null,
  setStart: () => null,
  setEnd: () => null,
  submeterAgendamento: () => null,
  setCalendarApi: () => null,
  setId: () => null,
})

export const useAgendamentoContext = () => {
  return useContext(AgendamentoContext);
}

export const AgendamentoProvider = ({ children }) => {
  const [agendamento, setAgendamento] = useState(agendamentoInicial);

  const setPessoa = (nome) => {
    setAgendamento(estadoAnterior => ({
      ...estadoAnterior,
      pessoa: nome,
    }));
  }

  const setProjetor = (nome) => {
    setAgendamento(estadoAnterior => ({
      ...estadoAnterior,
      projetor: nome,
    }));
  }

  const setAllDay = (allDay) => {
    setAgendamento(estadoAnterior => ({
      ...estadoAnterior,
      allDay,
    }));
  }

  const setStart = (start) => {
    setAgendamento(estadoAnterior => ({
      ...estadoAnterior,
      start,
    }));
  }

  const setEnd = (end) => {
    setAgendamento(estadoAnterior => ({
      ...estadoAnterior,
      end,
    }));
  }

  const submeterAgendamento = () => {
    console.log('Submetendo agendamento', agendamento);
  }

  const setCalendarApi = (calendarApi) => {
    setAgendamento(estadoAnterior => ({
      ...estadoAnterior,
      calendarApi,
    }));
  }

  const setId = (id) => {
    setAgendamento(estadoAnterior => ({
      ...estadoAnterior,
      id,
    }));
  }

  const contexto = {
    agendamento,
    setPessoa,
    setProjetor,
    setAllDay,
    setStart,
    setEnd,
    submeterAgendamento,
    setCalendarApi,
    setId,
  }

  return (
    <AgendamentoContext.Provider value={contexto}>
      {children}
    </AgendamentoContext.Provider>
  );
}
