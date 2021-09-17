import React from 'react';
import './App.scss';
import { HashRouter } from 'react-router-dom';
import { Routes } from './modules/routes/Routes';
import { Header } from './modules/components/Header/Header';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Header />
        <Routes />
      </HashRouter>
    </div>
  );
}

export default App;
