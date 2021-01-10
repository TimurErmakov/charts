import { Button, Card, Dialog, FormLabel, Typography } from '@material-ui/core';
import React, {
  DragEvent,
  FC,
  useState,
  useRef,
  useCallback,
  ChangeEvent,
  useMemo,
  MouseEvent,
} from 'react';
import PublishIcon from '@material-ui/icons/Publish';
import csvToJson from 'csvtojson';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { FieldNames } from '../../enums/dataset';
import { setData, setIsDataLoaded } from '../../store/actions';
import { DataModel } from '../../types/store';

interface UseStylesProps {
  isDragEnter?: boolean;
}

const useStyles = makeStyles(theme => ({
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
}));

const FileUploadZone: FC = () => {
  const classes = useStyles({});
  const dispatch = useDispatch();

  const [open, setOpen] = useState(true);
  const [isDragEnter, setIsDragEnter] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const dialogClasses = useMemo(
    () => ({
      paper: classes.dialogPaper,
    }),
    [classes],
  );

  const clearFileInput = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  const onDragEnter = useCallback((e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragEnter(true);
  }, []);

  const onDragOver = useCallback((e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const onDragLeaveHandler = useCallback((e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.target === e.currentTarget) {
      setIsDragEnter(false);
    }
  }, []);

  const onDropFile = useCallback((e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragEnter(false);

    const dt = e.dataTransfer;
  }, []);

  const onFileInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files) {
      setFile(files[0]);
    }
  }, []);

  const onBrowseButtonClick = useCallback(e => {
    e.preventDefault();

    fileInputRef?.current?.click();
  }, []);

  const onClearClick = useCallback(
    e => {
      e.preventDefault();

      setFile(null);
      clearFileInput();
    },
    [clearFileInput],
  );

  const onUploadFile = useCallback(
    async (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();

      if (!file) {
        return;
      }

      const reader = new FileReader();

      reader.onload = async (e: any) => {
        const text = e.target.result;

        csvToJson({
          headers: Object.keys(FieldNames),
          noheader: true,
          ignoreEmpty: true,
          trim: true,
        })
          .fromString(text.replace(/[ ]+/g, ','))
          .then((data: DataModel[]) => {
            dispatch(setData(data.slice(0, 1000)));
            dispatch(setIsDataLoaded(true));
          });
      };

      reader.readAsText(file);
    },
    [file, dispatch],
  );

  const onPreventClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const renderFileCard = (fileName: string) => {
    return (
      <div className={classes.fileNameContainer}>
        <div>
          <Typography className={classes.fileName}>{fileName}</Typography>
        </div>
      </div>
    );
  };

  return (
    <Dialog classes={dialogClasses} open={open}>
      <input
        disabled={!!file}
        className={classes.fileInput}
        id="document-upload"
        multiple={false}
        ref={fileInputRef}
        type="file"
        onChange={onFileInputChange}
      />
      <FormLabel
        disabled={!!file}
        className={classes.label}
        data-test="file-upload-zone__dropzone"
        htmlFor="document-upload"
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeaveHandler}
        onDragOver={onDragOver}
        onDrop={onDropFile}
      >
        {file && (
          <Card className={classes.fileCard} elevation={2} onClick={onPreventClick}>
            {renderFileCard(file.name)}
          </Card>
        )}
        <div className={classes.iconContainer}>
          <PublishIcon className={classes.icon} />
          <Typography>Chose File</Typography>
        </div>
      </FormLabel>
      <div className={classes.buttonContainer}>
        <Button
          className={classes.button}
          data-test="file-upload-zone__browse-button"
          disabled={isUploading}
          size="small"
          variant="contained"
          onClick={onBrowseButtonClick}
        >
          Browse
        </Button>
        <div>
          <Button
            className={classes.button}
            data-test="file-upload-zone__clear-button"
            disabled={!file || isUploading}
            variant="contained"
            onClick={onClearClick}
          >
            Clear
          </Button>
          <Button
            className={classes.button}
            color="primary"
            data-test="file-upload-zone__upload-button"
            disabled={!file || isUploading}
            type="button"
            variant="contained"
            onClick={onUploadFile}
          >
            Upload
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default FileUploadZone;
