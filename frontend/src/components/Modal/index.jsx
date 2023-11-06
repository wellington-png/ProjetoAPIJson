import React, { useState } from 'react';
import styles from './Modal.module.css'; // Import the CSS module
import { useAgendamentoContext } from '../../context/cadastroAgendamento';

import axios from 'axios'


const apiURL = 'http://localhost:8080'

const ModalComponent = ({ isOpen, onClose, projectors, people }) => {
  const [selectedProjector, setSelectedProjector] = useState('');
  const [selectedPerson, setSelectedPerson] = useState('');
  const {
    agendamento,
    setPessoa,
    setProjetor,
    submeterAgendamento,
  } = useAgendamentoContext();

  const handleProjectorChange = (event) => {
    setSelectedProjector(event.target.value);
    setProjetor(event.target.value);
  };

  const handlePersonChange = (event) => {
    setSelectedPerson(event.target.value);
    setPessoa(event.target.value);
  };

  const handleSubmit = () => {
    let calendarApi = agendamento.calendarApi
    calendarApi.addEvent({
      id: agendamento.id,
      title: agendamento.pessoa,
      start: agendamento.start,
      end: agendamento.end,
    });

    axios.post(`${apiURL}/agendamentos`, {
      id: parseInt(agendamento.id),
      title: agendamento.pessoa,
      start: agendamento.start,
      end: agendamento.end,
      projetor: agendamento.projetor,
      pessoa: agendamento.pessoa,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
      alert('Erro ao salvar agendamento')
    });

    submeterAgendamento();
    onClose();
  }

  return (
    <div className={`${styles.modal} ${isOpen ? styles['is-active'] : ''}`}>
      <div className={styles['modal-background']} onClick={onClose}></div>
      <div className={styles['modal-card']}>
        <header className={styles['modal-card-head']}>
          <p className={styles['modal-card-title']}>Selecionar Projeto e Pessoa</p>
          <button className={styles.delete} aria-label="close" onClick={onClose}></button>
        </header>
        <section className={styles['modal-card-body']}>
          <div className={styles.field}>
            <label className={styles.label}>Projeto</label>
            <div className={styles.control}>
              <div className={styles.select}>
                <select value={selectedProjector} onChange={handleProjectorChange}>
                  <option value="">Selecione um projetor</option>
                  {projectors.map((projector) => (
                    <option key={projector.id} value={projector.id}>
                      {projector.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Pessoa</label>
            <div className={styles.control}>
              <div className={styles.select}>
                <select value={selectedPerson} onChange={handlePersonChange}>
                  <option value="">Selecione uma pessoa</option>
                  {people.map((person) => (
                    <option key={person.id} value={person.id}>
                      {person.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>
        <footer className={styles['modal-card-foot']}>
          <button className={`${styles.button} ${styles['is-success']}`} onClick={handleSubmit}>Salvar</button>
          <button className={styles.button} onClick={onClose}>Cancelar</button>
        </footer>
      </div>
    </div>
  );
};

export default ModalComponent;
