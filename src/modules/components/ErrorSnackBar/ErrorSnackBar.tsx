import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { useDispatch, useSelector } from 'react-redux';
import { AppStoreType } from '../../redux/store';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { setCatchErrorAC } from '../../redux/reducers/appReducer';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export function ErrorSnackbar() {
  const dispatch = useDispatch();
  const error = useSelector<AppStoreType, string | null>(state => state.app.error);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(dispatch(setCatchErrorAC(null)));
  };

  return (
    <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error">
        {error}
      </Alert>
    </Snackbar>
  );
}
