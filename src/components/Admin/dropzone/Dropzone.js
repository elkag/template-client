import { makeStyles } from "@material-ui/core";
import React from "react";
// Import the useDropzone hooks from react-dropzone
import { useDropzone } from "react-dropzone";

const useStyles = makeStyles(theme => ({
    dropzone: {
        width: '100%',
        height: 150,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderStyle: 'dotted',
        justifyContent: 'center'
    }
}));

const Dropzone = ({ onDrop, accept, disabled }) => {
  // Initializing useDropzone hooks with options
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    disabled: disabled
  });
  const classes = useStyles(makeStyles);
  /* 
    useDropzone hooks exposes two functions called getRootProps and getInputProps
    and also exposes isDragActive boolean
  */

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <div className={classes.dropzone}>
        {isDragActive ? (
          <p className="dropzone-content">Release to drop the files here</p>
        ) : (
          <p className="dropzone-content">
            Drag 'n' drop some files here, or click to select files
          </p>
        )}
      </div>
    </div>
  );
};

export default Dropzone;