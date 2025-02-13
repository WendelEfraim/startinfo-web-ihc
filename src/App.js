
// src/App.js
import React from 'react';
import Rotas from './Rotas'; // Importando o arquivo de rotas
import { ToastContainer } from "react-toastify";

import './App.css';

export default function App() {

  return (

    <div className='App'>

      <ToastContainer />
      <Rotas /> {/* Renderiza as rotas definidas em Rotas.jsx */}
      
    </div>

  );

}
