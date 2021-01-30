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
  return ['Item description', 'Add categories and tags', 'Select images'];
}

export default function HorizontalNonLinearStepper() {

    const history = useHistory();
    
    const classes = useStyles();
    const params = useParams();

    const [user] = React.useContext(UserContext);

    const [activeStep, setActiveStep] = React.useState(params.page ? Number(params.page) : 0);
    const [completed, setCompleted] = React.useState({});

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

    const steps = getSteps();

    
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
                response.images = response.images.map(img => {return {id: img.id, src: img.url, publicId: img.publicId, uploaded: true, uploading: false}})
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
            case 1:
                return <SecondStep 
                            categories={categories} setCategories={setCategories}
                            tags={tags} setTags={setTags}
                            tagsString={tagsString} onChangeTags={setTagsString}
                            categoriesString={categoriesString} onChangeCategories={setCategoriesString}
                            handleComplete={handleComplete} />;
            case 2:
                return <ThirdStep 
                            images={images}
                            setImages={setImages}
                            setImageUpdated={setImageUpdated}
                            uploading={loading}
                            item={itemId}
                            handleComplete={handleComplete} />;
          default:
            return 'Unknown step';
        }
      }
    
    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        let i = 0;
        for (const [, value] of Object.entries(completed)) {
            if(value) {
                i++;
            }
          }
          return i;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
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

    const handleDataUpdated = () => {
        return          data.name !== title
                         || data.description !== description 
                         || data.link !== link 
                         || data.notes !== text 
                         || data.categories !== categories 
                         || data.tags !== tags
                         || data.images.length !== images.filter(img => img.uploaded && (img.error ? img.error === "" : true)).length
    };


    const handleFinish = async () => {
        setLoading(true);
        const response = await updateItemApi.update({
            id: itemId,
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
                
                <Button
                    className={classes.button}
                    variant="contained"
                    color="secondary" 
                    disabled={!allStepsCompleted() || !handleDataUpdated()}
                    onClick={handleFinish}>
                    Save
                </Button>
                {activeStep === 2 ?
                <Button
                  className={classes.button}
                    variant="contained"
                    color="primary" 
                    disabled={handleUploadDisabled()}
                    onClick={startUpload}>
                   Upload
                 </Button>
                  : null}
                </div>
            </div>
            
        </div>
        </div>
    );
}
