import { makeStyles } from '@material-ui/core';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import Charts from './components/Charts';
import ControlPanel from './components/ControlPanel';
import FileUploadZone from './components/FileUploadZone';
import { selectIsDataLoaded } from './store/selectors';

const useStyles = makeStyles(() => ({
  container: {
    paddingTop: 80,
    width: '90%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: '0 auto',
  },
}));

const App: FC = () => {
  const classes = useStyles();
  const isDataLoaded = useSelector(selectIsDataLoaded);

  return isDataLoaded ? (
    <div className={classes.container}>
      <ControlPanel />
      <Charts />
    </div>
  ) : (
    <FileUploadZone />
  );
};

export default App;
