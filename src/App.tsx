import React, {useEffect} from 'react';
import './App.scss';
import { HashRouter } from 'react-router-dom';
import { Routes } from './modules/routes/Routes';
import { Header } from './modules/components/Header/Header';
import {authApi} from "./modules/api/api";
import {authMe, loginAC} from "./modules/redux/reducers/authReducer";
import {useDispatch} from "react-redux";

function App() {
    /*const dispatch = useDispatch()
    useEffect(() => {
        dispatch(authMe())
    }, [])*/
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
