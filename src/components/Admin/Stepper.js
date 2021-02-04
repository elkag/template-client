import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import ThirdStep from './ThirdStep';
import { createNewItemApi } from '../../api/services/createNewItemApi';
import { UserContext } from '../../contexts/userContext';
import { updateItemApi } from '../../api/services/updateItemApi';
import { getItemApi } from '../../api/services/getItemApi';
import { useHistory, useParams } from 'react-router-dom';
import Loader from '../common/Loader';
import { VIEW_ITEM_PAGE } from '../../config/routes';
import UploadImagesDialog from './dialogues/UploadImagesDialog';
import { ItemsListContext } from '../../contexts/itemsListContext';
import { deleteImageApi } from '../../api/services/deleteImageApi';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CheckSharpIcon from '@material-ui/icons/CheckSharp';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexGrow: 1,
        flexWrap: 'wrap',
        borderRadius: '5px',
        flexDirection: 'column',
        padding: 20
    },
    root: {
        width: '100%',
        textAlign: 'left'
    },
    buttonWrapper: {
        display: 'flex',
        flexDirection: 'row',
        padding: 20,
        justifyContent: 'space-between'
    },
    button: {
        marginRight: theme.spacing(1),
    },
        completed: {
        display: 'inline-block',
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

function getSteps() {
  return ['Select images', 'Item description', 'Add categories and tags'];
}

export default function HorizontalNonLinearStepper() {

    const history = useHistory();
    
    const classes = useStyles();
    const params = useParams();

    const [user] = React.useContext(UserContext);
    const [, setItems] = React.useContext(ItemsListContext);

    const [activeStep, setActiveStep] = React.useState(params.page ? Number(params.page) : 0);
    const [completed, setCompleted] = React.useState({0: true});

    const [title, setTitle] = React.useState("");
    const [link, setLink] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [text, setText] = React.useState("");
    const [tagsString, setTagsString] = React.useState("");
    const [categoriesString, setCategoriesString] = React.useState("");
    const [tags, setTags] = React.useState([]);
    const [categories, setCategories] = React.useState([]);
    const [images, setImages] = React.useState([]);
    const [uploading, setUploading] = React.useState(false);
    const [imageUpdated, setImageUpdated] = React.useState(null);
    const [itemId, setItemId] = React.useState(null);
    const [, setUploadButtonDisabled] = React.useState(false);

    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");
    const [data, setData] = React.useState({});
    const [uploadImagesDialogOpen, setUploadImagesDialogOpen] = React.useState(false);

    const steps = getSteps();

    const deleteImage = async (image) => {
        

        if(image.publicId && image.uploaded) { 
            let imagesCopy = [...images];
            imagesCopy.forEach(img => {
                if(img.id === image.id) {
                    img.deleting = true;
                }
                return img;
            });
            setImages(imagesCopy);
            const response = await deleteImageApi.delete(itemId, image.id);
            if(response.error){
                setError(response.message);
                return;
            }
        }
        setImages(images.filter(img => img !== image));
    }

    const handleComplete = React.useCallback( (isCompleted) => {
        const newCompleted = completed;
        newCompleted[activeStep] = isCompleted;
        setCompleted(newCompleted);
    }, [activeStep, completed]);

    const handleUploadDisabled = React.useCallback( () => {
        return  !(images.filter(img => !img.uploaded).length > 0) || images.filter(img => img.uploading).length > 0
    }, [images]);

    const getItem = React.useCallback(async () => {
        async function fetchItem() {}
            setError("");
            setLoading(true);
            const response = await getItemApi.get(params.item);
            setLoading(false);
            if(response.errors || response.error){
                setError(response.message);
            } else { 
                setItemId(response.id);
                setTitle(response.name);
                setDescription(response.description);
                setLink(response.link);
                setText(response.notes);
                setCategories(response.categories);
                setTags(response.tags); 
                setCategoriesString(response.categories.join(", "));
                setTagsString(response.tags.join(", ")); 
                response.images = response.images.map(img => {return {id: img.id, src: img.url, publicId: img.publicId, uploaded: true, uploading: false, deleting: false}})
                setImages(response.images);
                for(let i=0; i <= 2; i++){
                    const newCompleted = completed;
                    newCompleted[i] = true;
                    setCompleted(newCompleted);
                }
                setData(response);
            }
            fetchItem();
      }, [params.item, completed])
    
      React.useEffect( () => {
          const getItm = () => {
            if(params.item){
              getItem();
            }
          }
          getItm();
        
      },[getItem, params.item])

    React.useEffect(() => {
        const updateAfterUpload = () => {
            if(!imageUpdated){
                return;
            }
            const imagesCopy = ([...images].map(object => {
                if(object.index === imageUpdated.index) {
                    return {
                        ...object,
                        src: imageUpdated.src,
                        publicId: imageUpdated.publicId,
                        id: imageUpdated.id,
                        uploading: imageUpdated.uploading,
                        uploaded: imageUpdated.uploaded
                    }
                }
                else return object;                 
            }));
            const notUploaded = [...imagesCopy].filter(img => img.uploaded !== true);
            if(imagesCopy.length > 0 && notUploaded.length === 0) {
                setUploading(false);
                handleComplete(true);
            }
            setUploadButtonDisabled(handleUploadDisabled());
            setImages(imagesCopy);
            setImageUpdated(null);
        }
        if(imageUpdated) updateAfterUpload();
    }, [imageUpdated, images,  handleComplete, handleUploadDisabled, uploading]); 

    const  getStepContent = (step) => {
        switch (step) {
            case 0:
                return <ThirdStep 
                            images={images}
                            setImages={setImages}
                            deleteImage={deleteImage}
                            setImageUpdated={setImageUpdated}
                            uploading={loading}
                            item={itemId}
                            handleComplete={handleComplete} />;
            case 1:
                return <FirstStep 
                            title={title} 
                            onChangeTitle={setTitle}
                            link={link}
                            onChangeLink={setLink}
                            description={description} 
                            onChangeDescription={setDescription} 
                            text={text} 
                            onChangeText={setText}
                            handleComplete={handleComplete} />;
            case 2:
                return <SecondStep 
                            categories={categories} setCategories={setCategories}
                            tags={tags} setTags={setTags}
                            tagsString={tagsString} onChangeTags={setTagsString}
                            categoriesString={categoriesString} onChangeCategories={setCategoriesString}
                            handleComplete={handleComplete} />;
          default:
            return 'Unknown step';
        }
      }
    
    const totalSteps = () => {
        return steps.length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };
    const handleNext = () => {
    const newActiveStep =
        isLastStep()
        ? // It's the last step, but not all steps have been completed,
            // find the first step that has been completed
            steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
    };


    const haveNewImages = (hasData) => {
        
        if(!hasData) {
            return false;
        }

        return images.filter(img =>img.error ? img.error === "" : true).length !== data.images.length;
    }
    const handleDataUpdated = () => {
        
        const hasData = !(data && Object.keys(data).length === 0 && data.constructor === Object);
        var hasNewImages = haveNewImages(hasData);
        
        if(!itemId){
            return hasNewImages;
        }
        return          hasNewImages || (data.name !== title)
                         || (data.description !== description)
                         || (data.link !== link) 
                         || (data.notes !== text) 
                         || (data.categories !== categories) 
                         || (data.tags !== tags)
    };


    const isFormEmpty = () => {
        const itemNotSaved = data && Object.keys(data).length === 0 && data.constructor === Object;
        if(!itemId || itemNotSaved) {
            const t = (title === "") ? true : false;
            const d = (description === "") ? true : false;
            const tx = (text === "") ? true : false;
            const l = (link === "") ? true : false;
            const c = (categories.length === 0) ? true : false;
            const tg = (tags.length === 0) ? true : false;
            return t && d && tx && l && c && tg;
        } else {
            return !handleDataUpdated();
        }
    }
    const handleFinish = async () => {
        const unuploadedImages = images.filter(img => !img.uploaded);
        if(unuploadedImages && unuploadedImages.length > 0) {
            setActiveStep(0);
            setUploadImagesDialogOpen(true);
            return;
        }
        setLoading(true);
        let id = itemId;
        if(!id) {
            const itemIdResponse = await createNewItemApi.create();

            if(itemIdResponse.error){
                setError(itemIdResponse.errorMessage);
                return;
                
            } else{
                id = itemIdResponse;   
                setItems([]);             
            }
        }

        const response = await updateItemApi.update({
            id: id,
            name: title,
            description: description,
            notes: text,
            link: link,
            categories: categories,
            tags: tags,
            images: images.map(img => {return {url: img.src, publicId: img.publicId}})
        })
        setLoading(false);

        if(response.error){
            setError(response.message);
        } else {
            history.push(VIEW_ITEM_PAGE + `${response.id}/${activeStep}`);
        }
    };

    const startUpload = async () => {
        
        setUploadButtonDisabled(true);
        if(!itemId || itemId === undefined) {
            const response = await createNewItemApi.create();

            if(response.error){
                setError(response.errorMessage);
                
            } else{
                setItemId(response)
                uploadImages(response);
                
            }
            setUploading(true);
        } else {
            uploadImages(itemId);
        }
    }

    const uploadImages = (itemId) => {
        
        setUploading(true)
        let imagesCopy = ([...images].map(object => {
            return {
            ...object,
            uploading: !object.uploaded,
            tags: [itemId, user.user.username]
            }              
        }));
        setImages(imagesCopy);
    }
    
    return (
        <div className={classes.root}>
        <Loader loading={loading} error={error} />
        {
            uploadImagesDialogOpen ? <UploadImagesDialog onDialogClose={setUploadImagesDialogOpen} dialogOpen={uploadImagesDialogOpen} /> : null
        }
        <Stepper nonLinear activeStep={activeStep}>
            {steps.map((label, index) => (
            <Step key={label}>
                <StepButton onClick={handleStep(index)} completed={completed[index]}>
                {label}
                </StepButton>
            </Step>
            ))}
        </Stepper>
        <div>
           
            <div>
                <Typography className={classes.container}>{getStepContent(activeStep)}</Typography>
                <div className={classes.buttonWrapper}>
                    
                    <div>
                    {
                        activeStep > 0 ? 
                        <Button
                            className={classes.button}
                            variant="contained"
                            color="secondary" 
                            disabled={isFormEmpty() && !handleDataUpdated()}
                            onClick={handleFinish}>
                            <CheckSharpIcon />
                            &nbsp;&nbsp;Save
                        </Button>
                        :
                        <Button
                            className={classes.button}
                                variant="contained"
                                color="secondary" 
                                disabled={handleUploadDisabled()}
                                onClick={startUpload}>
                            <CloudUploadIcon />
                            &nbsp;&nbsp;Upload
                        </Button>
                    }
                    </div>
                    <div>
                        <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                            Back
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleNext}
                            disabled={activeStep === 2} 
                            className={classes.button}
                        >
                            Next
                        </Button>
                    </div>
                 </div>
            </div>
            
        </div>
        </div>
    );
}
