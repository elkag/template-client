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
import { UserContext } from '../../contexts/userContext';
import { getItemApi } from '../../api/services/getItemApi';
import { useHistory, useParams } from 'react-router-dom';
import { Edit } from '@material-ui/icons';
import Loader from '../common/Loader';
import { EDIT_ITEM_PAGE } from '../../config/routes';

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
        width: '100%'
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
    buttons: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row'
    },
    editBtn: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        marginRight: 20,
    },
}));

function getSteps() {
    return ['Selected images', 'Item description', 'Categories and tags'];
}

export default function ItemViewer() {
    const classes = useStyles();
    const params = useParams();

    const history = useHistory();
    
    const [user] = React.useContext(UserContext);

    const [activeStep, setActiveStep] = React.useState(params.page ? Number(params.page) : 0);

    const [title, setTitle] = React.useState("");
    const [link, setLink] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [text, setText] = React.useState("");
    const [tagsString, setTagsString] = React.useState("");
    const [categoriesString, setCategoriesString] = React.useState("");
    const [tags, setTags] = React.useState([]);
    const [categories, setCategories] = React.useState([]);
    const [images, setImages] = React.useState([]);
    const [itemId, setItemId] = React.useState(null);
    const [owner, setOwner] = React.useState(null);

    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");

    const steps = getSteps();

    const getItem = React.useCallback(async () => {
        setError("");
        setLoading(true);
        const isAdmin = (user.user.roles.some(role => role === "SUPER_ADMIN"));
        const response =  await getItemApi.get(params.item, isAdmin ? true : false);
        setLoading(false);
        if(response.error){
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
            setImages(response.images.map(img => {return {id: img.id, src: img.url, publicId: img.publicId, uploaded: true, uploading: false}}));
            setOwner(response.user)
            
        }
      }, [params.item, user.user.roles])
    
      React.useEffect( () => {
          if(params.item){
              getItem();
          }
        
      },[getItem, params.item])

    const  getStepContent = (step) => {
        switch (step) {
            case 0:
                return <ThirdStep 
                            images={images}
                            setImages={setImages}
                            setUpdated={null}
                            uploading={false}
                            item={itemId}
                            handleComplete={null}
                            allDisabled={true} />;
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
                            handleComplete={null} 
                            allDisabled={true}/>;
            case 2:
                 return <SecondStep 
                            categories={categories} setCategories={setCategories}
                            tags={tags} setTags={setTags}
                            tagsString={tagsString} onChangeTags={setTagsString}
                            categoriesString={categoriesString} onChangeCategories={setCategoriesString}
                            handleComplete={null}
                            allDisabled={true} />;
          default:
            return 'Unknown step';
        }
      }
    
    

    const totalSteps = () => {
        return steps.length;
    };

    const editItem = () => {
        history.push(EDIT_ITEM_PAGE + `${itemId}/${activeStep}`);
    }

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const handleNext = () => {
    const newActiveStep =
        isLastStep()
        ? // It's the last step, but not all steps have been completed,
            // find the first step that has been completed
            0 : activeStep + 1;
        setActiveStep(newActiveStep);
    };
    
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    return (
        <div className={classes.root}>
        <Loader loading={loading} error={error} />
        <Stepper nonLinear activeStep={activeStep}>
            {steps.map((label, index) => (
            <Step key={label}>
                <StepButton onClick={handleStep(index)}>
                {label}
                </StepButton>
            </Step>
            ))}
        </Stepper>
        <div>
            <div>
                <Typography className={classes.container}>{getStepContent(activeStep)}</Typography>
                <div className={classes.buttons}>
                    <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                        Back
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleNext}
                        disabled={activeStep === 2} 
                        className={classes.button}
                    >
                        Next
                    </Button>
                    <div className={classes.editBtn}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={editItem}
                            disabled={!owner || owner.id !== user.user.id}>
                                <Edit style={{width: '20px'}}/>
                                &nbsp;Edit
                        </Button>
                    </div>
                </div>
            </div> 
        </div>
    </div>
    );
}
