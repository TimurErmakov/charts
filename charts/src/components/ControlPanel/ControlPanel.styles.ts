import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  container: {
    paddingTop: 80,
  },
  selectContainer: {
    display: 'flex',
    marginBottom: 50,
    justifyContent: 'center',
  },
  select: {
    width: 300,
    marginRight: 30,
  },
}));
