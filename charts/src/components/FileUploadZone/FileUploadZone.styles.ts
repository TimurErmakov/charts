import { makeStyles } from '@material-ui/core';

interface UseStylesProps {
  isDragEnter?: boolean;
}

export const useStyles = makeStyles(theme => ({
  dialogPaper: {
    backgroundColor: theme.palette.background.default,
    padding: '20px 30px',
  },
  fileInput: {
    visibility: 'hidden',
    '&:focus + label': {
      border: `2px solid ${theme.palette.secondary.main}`,
    },
  },
  label: {
    position: 'relative',
    minHeight: 160,
    width: 400,
    padding: '16px 16px 100px',
    marginBottom: 24,
    border: ({ isDragEnter }: UseStylesProps) =>
      isDragEnter
        ? `2px solid ${theme.palette.secondary.main}`
        : `2px dashed ${theme.palette.divider}`,
    borderRadius: 4,
    '& > div': {
      pointerEvents: ({ isDragEnter }: UseStylesProps) => (isDragEnter ? 'none' : 'auto'),
    },
  },
  icon: {
    fontSize: 40,
  },
  iconContainer: {
    marginTop: 20,
    textAlign: 'center',
    margin: '0 auto',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    width: 100,
    '&:not(:last-child)': {
      marginRight: 15,
    },
  },
  fileCard: {
    display: 'flex',
    alignItems: 'center',
    height: 60,
    backgroundColor: theme.palette.primary.main,
  },
  fileNameContainer: {
    marginLeft: 20,
  },
  fileName: {
    color: theme.palette.common.white,
  },
  progress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    margin: '-50px 0 0  -50px',
  },
}));
