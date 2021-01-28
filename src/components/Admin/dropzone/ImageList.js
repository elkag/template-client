import { Button, CircularProgress, makeStyles, Typography, withStyles } from "@material-ui/core";
import React from "react";
import DeleteIcon from '@material-ui/icons/Delete';
import { imageUploadApi } from "../../../api/services/imageUploadApi";
import { UserContext } from "../../../contexts/userContext";
import Loader from "../../common/Loader";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
    wrapper: {
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'left',
        padding: '45px 5px 15px 5px'
    },
    imgList: {
        display: 'flex',
    },
    img: {
        opacity: 1,
        display: 'flex',
        height: 150,
        transition: "opacity 300ms ease",
       
    },
    delete: {
       width: '100%'
    },
    imageWrapper: {
        position: 'absolute'
    },
    imgContainerEnabled: {
        opacity: 1
    },
    imgContainerDisabled: {
        opacity: 0.5
    },
    container: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        height: 220,
        paddingRight: 10,
        alignItems: 'center',
        '&:hover div': {
            opacity: 1,
        },
    },
    loaderContainer: {
        position: 'absolute',
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
    loader: {
        position: 'relative',
        display: 'inline-flex',
        justifySelf: 'center',
        paddingTop: 60
    },
    error: {
        fontSize: '0.9rem',
        color: red[500],
    },
    info: {
        fontSize: '0.9rem',
    }

}));

// Rendering individual images
const Image = ({ image, item, setUpdated }) => {
    const [session] = React.useContext(UserContext);
    const classes = useStyles(makeStyles);
    const [uploadInitialized, setUploadInitialized] = React.useState(false);
    const [error, setError] = React.useState(false);

    React.useEffect(async () => {
       if(image.uploading && !uploadInitialized) {
            setUploadInitialized(true);
            const response = await uploadImage(image);
            setUpdated({index: image.index, src: response.url, publicId: response.publicId, uploading: false, uploaded: true});
        }
    },[image.uploading]);

    const uploadImage = async (image) => {
      
        const response = await imageUploadApi.upload(image, item);
       
        if(response.error){
            image.error = response.message;
            setError(true);
        } else{
            return response;
        }
        return image.src;
    }

    return (
        <div className={(image.uploading) ? classes.imgContainerDisabled : classes.imgContainerEnabled} >
            <img className={classes.img} alt={`img - ${image.index}`} src={image.src} />
        </div>
    );
};

const StyledCircularProgress = withStyles({
    colorPrimary: {
      color: '#565456'
    },
    barColorPrimary: {
      backgroundColor: "red"
    }
  })(CircularProgress);

// ImageList Component
const ImageList = ({ images, setImages, setUpdated, item, disabled }) => {

    const [loading, setLoading] = React.useState(false);

    const classes = useStyles(makeStyles);

    const deleteImg = (image) => {
        setImages(images.filter(e => e !== image));
    }

    // render each image by calling Image component
    const renderImage = (image, setUpdated, item) => {
        return (
                <div className={classes.container}>
                    <Loader loading={loading} />  
                    <Image
                        image={image}
                        setUpdated={setUpdated}
                        item={item}
                        key={`${image.id}-image`}
                        setLoading={setLoading}
                    /> 
                    <Button className={classes.delete} 
                        disabled={(disabled || (image.uploading))} 
                        variant="contained" 
                        onClick={() => deleteImg(image)} 
                        startIcon={<DeleteIcon />}>
                            Delete
                    </Button>
                    <Typography className={image.error? classes.error : classes.info}>{image.error || null}</Typography>
                    {(image.uploading && !image.uploaded) ? 
                        (<div className={classes.loaderContainer}>
                        <div className={classes.loader}>
                            <StyledCircularProgress color="primary" />
                        </div>
                    </div> ) : null} 
                </div>
        );
    };

    // Return the list of files
    return <section className="file-list">
            <div className={classes.wrapper}>
                {images.map(img => renderImage(img, setUpdated, item))}
            </div>
        </section>;
};

export default ImageList;