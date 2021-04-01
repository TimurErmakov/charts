import { Button, Card, CircularProgress, Dialog, FormLabel, Typography } from '@material-ui/core';
import React, {
  FC,
  useState,
  useRef,
  useCallback,
  ChangeEvent,
  useMemo,
  MouseEvent,
  useEffect,
} from 'react';
import PublishIcon from '@material-ui/icons/Publish';
import { useDispatch } from 'react-redux';
import { FieldNames } from '../../enums/dataset';
import { setData, setIsDataLoaded } from '../../store/actions';
import { useWebWorker } from '../../hooks/useWebWorker';
import { parser } from '../../utils/parser';
import { useStyles } from './FileUploadZone.styles';

const FileUploadZone: FC = () => {
  const classes = useStyles({});
  const dispatch = useDispatch();

  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const { result, run } = useWebWorker(parser);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const dialogClasses = useMemo(
    () => ({
      paper: classes.dialogPaper,
    }),
    [classes],
  );

  useEffect(() => {
    if (!result) {
      return;
    }

    dispatch(setData(result));
    dispatch(setIsDataLoaded(true));

    setIsUploading(false);
  }, [dispatch, result]);

  const clearFileInput = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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

      reader.onload = async (e: ProgressEvent<FileReader>) => {
        const text = e.target?.result as string;

        if (!text) {
          return;
        }

        setIsUploading(true);

        const headers = Object.keys(FieldNames);
        run({ text, headers });
      };

      reader.readAsText(file);
    },
    [file, run],
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

  if (isUploading) {
    return <CircularProgress size={100} className={classes.progress} />;
  }

  return (
    <Dialog classes={dialogClasses} open>
      <input
        disabled={!!file}
        className={classes.fileInput}
        id="document-upload"
        multiple={false}
        ref={fileInputRef}
        type="file"
        onChange={onFileInputChange}
      />
      <FormLabel disabled={!!file} className={classes.label} htmlFor="document-upload">
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
            disabled={!file || isUploading}
            variant="contained"
            onClick={onClearClick}
          >
            Clear
          </Button>
          <Button
            className={classes.button}
            color="primary"
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
