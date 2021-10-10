import React, { useEffect } from 'react';
import './App.scss';
import { HashRouter } from 'react-router-dom';
import { Routes } from './modules/routes/Routes';
import { Header } from './modules/components/Header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { AppStoreType } from './modules/redux/store';
import { authMe, setInitializedAC } from './modules/redux/reducers/authReducer';
import { initializeAppThunk, RequestStatusType } from './modules/redux/reducers/appReducer';
import { Loader } from './modules/components/Loader/Loader';

function App() {
  const dispatch = useDispatch();
  const initialized = useSelector<AppStoreType, boolean>(state => state.app.initialized);
  const status = useSelector<AppStoreType, RequestStatusType>(state => state.app.status);

  useEffect(() => {
    dispatch(initializeAppThunk());
  }, []);

  if (!initialized) {
    return <Loader />;
  }

  return (
    <div className="App">
      <HashRouter>
        <Routes />
      </HashRouter>
    </div>
  );
}

export default App;
