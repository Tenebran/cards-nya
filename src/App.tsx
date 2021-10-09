import React, { useEffect } from 'react';
import './App.scss';
import { HashRouter } from 'react-router-dom';
import { Routes } from './modules/routes/Routes';
import { Header } from './modules/components/Header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { AppStoreType } from './modules/redux/store';
import { authMe, setInitializedAC } from './modules/redux/reducers/authReducer';
import { initializeAppThunk } from './modules/redux/reducers/appReducer';

function App() {
  const dispatch = useDispatch();
  const initialized = useSelector<AppStoreType, boolean>(state => state.app.initialized);

  useEffect(() => {
    if (!initialized) {
      dispatch(initializeAppThunk());
    }
  }, []);

  return (
    <div className="App">
      <HashRouter>
        <Routes />
      </HashRouter>
    </div>
  );
}

export default App;
