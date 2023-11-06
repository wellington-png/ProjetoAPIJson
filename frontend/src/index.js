import React, {  } from 'react';
import ReactDOM from 'react-dom/client';
import './main.css'
import App from './App';
import { AgendamentoProvider } from './context/cadastroAgendamento';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AgendamentoProvider>
      <App />
    </AgendamentoProvider>
  </React.StrictMode>
);

