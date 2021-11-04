import React, { useEffect } from 'react';
import './App.scss';
import { HashRouter } from 'react-router-dom';
import { Routes } from './modules/routes/Routes';
import { useDispatch, useSelector } from 'react-redux';
import { AppStoreType } from './modules/redux/store';
import { initializeAppThunk } from './modules/redux/reducers/appReducer';
import { InitializedLoader } from './modules/components/InitializedLoader/InitializedLoader';
import { ErrorSnackbar } from './modules/components/ErrorSnackBar/ErrorSnackBar';

function App() {
  const dispatch = useDispatch();
  const initialized = useSelector<AppStoreType, boolean>(state => state.app.initialized);

  useEffect(() => {
    dispatch(initializeAppThunk());
  }, [dispatch, initialized]);

  // if (!initialized) {
  //   return <InitializedLoader />;
  // }

  return (
    <HashRouter>
      <div className="App">
        <Routes />
      </div>
      <ErrorSnackbar />
    </HashRouter>
  );
}

export default App;
