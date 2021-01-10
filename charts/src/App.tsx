import { Container, makeStyles } from '@material-ui/core';
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
  },
}));

const App: FC = () => {
  const classes = useStyles();
  const isDataLoaded = useSelector(selectIsDataLoaded);

  return isDataLoaded ? (
    <Container className={classes.container} maxWidth="md">
      <ControlPanel />
      <Charts />
    </Container>
  ) : (
    <FileUploadZone />
  );
};

export default App;
