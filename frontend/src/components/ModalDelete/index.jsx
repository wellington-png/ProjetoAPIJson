import React, { useEffect } from 'react';
import styles from './Modal.module.css';
import axios from 'axios';

const apiURL = 'http://localhost:8080';

const DeleteModal = ({ isOpen, onClose, eventId, onDelete }) => {
  const handleDelete = () => {
    axios.delete(`${apiURL}/agendamentos/${eventId}`)
      .then(function (response) {
        console.log(response);
        onDelete(eventId); 
      })
      .catch(function (error) {
        console.log(error);
        alert('Erro ao excluir o agendamento');
      });

    onClose();
    // reload
    window.location.reload();
  };

//   chagem eventId
  useEffect(() => {
    console.log("eventID: ", eventId);
  }, [eventId]);

  return (
    <div className={`${styles.modal} ${isOpen ? styles['is-active'] : ''}`}>
      <div className={styles['modal-background']} onClick={onClose}></div>
      <div className={styles['modal-card']}>
        <header className={styles['modal-card-head']}>
          <p className={styles['modal-card-title']}>Confirmar exclusão</p>
          <button className={styles.delete} aria-label="close" onClick={onClose}></button>
        </header>
        <section className={styles['modal-card-body']}>
          <p>Tem certeza de que deseja excluir este agendamento?</p>
        </section>
        <footer className={styles['modal-card-foot']}>
          <button className={`${styles.button} ${styles['is-danger']}`} onClick={handleDelete}>Excluir</button>
          <button className={styles.button} onClick={onClose}>Cancelar</button>
        </footer>
      </div>
    </div>
  );
};

export default DeleteModal;
