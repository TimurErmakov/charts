import { Dialog, FormLabel, Icon, Typography } from '@material-ui/core';
import React, { DragEvent, FC, useState, useRef, useCallback, ChangeEvent } from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  fileInput: {
    '&:focus + label': {
      border: `2px solid ${theme.palette.secondary.main}`,
    },
  },
  label: {},
}));

const FileUploadZone: FC = () => {
  const classes = useStyles();

  const [open, setOpen] = useState(true);
  const [isDragEnter, setIsDragEnter] = useState(false);

  const fileInputRef = useRef(null);

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

  const onFileInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {}, []);

  return (
    <Dialog open={open}>
      <input
        accept=".csv,.xlsx"
        className={classes.fileInput}
        id="document-upload"
        multiple={false}
        ref={fileInputRef}
        type="file"
        onChange={onFileInputChange}
      />
      <FormLabel
        className={classes.label}
        data-test="file-upload-zone__dropzone"
        htmlFor="document-upload"
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeaveHandler}
        onDragOver={onDragOver}
        onDrop={onDropFile}
      >
        <div>
          <Icon className="text-40">publish</Icon>
          <Typography className="font-600 text-base text-center">hhhggh</Typography>
        </div>
      </FormLabel>
    </Dialog>
  );
};

export default FileUploadZone;
