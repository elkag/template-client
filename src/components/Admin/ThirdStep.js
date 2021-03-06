import React, { useCallback } from 'react';
//components

import { makeStyles } from '@material-ui/core';
import Dropzone from "./dropzone/Dropzone";
import ImageList from './dropzone/ImageList';
import cuid from 'cuid';

const useStyles = makeStyles( theme => ({
    wrapper: {
        height: 'auto',
        minHeight: 450
    }
}));

const ThirdStep = ({images, setImages, deleteImage, setImageUpdated, item, allDisabled}) => {
    
    const classes = useStyles(makeStyles);

    const onDrop = useCallback(acceptedFiles => {
        // Loop through accepted files
        acceptedFiles.map(file => {
            // Initialize FileReader browser API
            const reader = new FileReader();
            // onload callback gets called after the reader reads the file data
            reader.onload = function(e) {
                // add the image into the state. Since FileReader reading process is asynchronous, its better to get the latest snapshot state (i.e., prevState) and update it. 
                setImages(prevState => [
                ...prevState,
                { 
                    index: cuid(),
                    publicId: null,
                    src: e.target.result,
                    uploading: false,
                    uploaded: false,
                    deleting: false,
                    error: ""
                }
                ]);
            };
            // Read the file as Data URL (since we accept only images)
            reader.readAsDataURL(file);
            return file;
            });
    }, [setImages]);

    return (
        <div  className={classes.wrapper}>
            <div className={classes.dropzone}>
                <Dropzone onDrop={onDrop} accept={"image/*"} disabled={allDisabled} />
            </div>
            <ImageList images={images} deleteImage={deleteImage} setImageUpdated={setImageUpdated} item={item} disabled={allDisabled}/>
        </div>
    )
}

export default ThirdStep;