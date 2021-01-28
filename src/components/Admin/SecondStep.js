import React, { Fragment } from 'react';
// context
import { UserContext } from '../../contexts/userContext';
//components

import { Button, Chip, Container, makeStyles, TextField, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    wrapper: {
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        height: 450,
        width: '100%'
    },
    hwrapper: {
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'left'
    },
    chip: {
        textAlign: 'left',
        marginLeft: 15,
        marginBottom: 10
    },
    tagsWrapper: {
        width: '80%',
        marginLeft: 10
    },
    categoriesTF: {
        width: '560px',
        paddingBottom: '20px'
    },
    tagsTF: {
        width: '560px',
        paddingBottom: '20px'
    },
    button: {
        width: 150,
        height: 'auto',
        marginBottom: '20px'
    },
}));

const SecondStep = ({
    tags, setTags,
    categories, setCategories,
    tagsString, onChangeTags, 
    categoriesString, onChangeCategories,
    handleComplete,
    allDisabled}) => {
  
    const [session] = React.useContext(UserContext);
    const [item, setItem] = React.useState(null);
    const [error, setError] = React.useState('');
    
    const classes = useStyles(makeStyles);

    React.useEffect(() => {
        
    });

    const handleError = (error) => {
        setError({ error });
    }
    
    const applyCategories = () => {
        const localCategories = categoriesString.split(",").map(value => value.trim());
        handleComplete(checkComplete({categories: localCategories, tags: tags}));
        setCategories(localCategories);
    };

    const applyTags = () => {
        const localTags = tagsString.split(",").map(value => value.trim());
        handleComplete(checkComplete({categories: categories, tags: localTags}));
        setTags(localTags);
    };

    const deleteTag = (value) => {
        const localTags = tags.filter(e => e !== value);
        handleComplete(checkComplete({categories: categories, tags: localTags}));
        setTags(localTags);
    };

    const deleteCat = (value) => {
        const localCategories = categories.filter(e => e !== value);
        handleComplete(checkComplete({categories: localCategories, tags: tags}));
        setCategories(localCategories);
    };

    const changeTags = (event) => {
        return onChangeTags(event.target.value);
    }
    const changeCategories = (event) => {
        return onChangeCategories(event.target.value);
    }
    
    const checkComplete = (obj) => {
        if(Array.isArray(obj.categories) && obj.categories.length && Array.isArray(obj.tags) && obj.tags.length) {
            return true;
        } else {
            return false;
        }
    }

    const arrangeCategories = () => {
        return categories && categories.map((element) => {
            return (
                <Chip className={classes.chip}
                id={element}
                    label={element}
                    onDelete={() => deleteCat(element)}
                    variant="outlined"
                    color="primary"
                    disabled={allDisabled}
                />
            )
        })
    }

    const arrangeTags = () => {
        return tags && tags.map((element) => {
            return (
                <Chip  className={classes.chip}
                    id={element}
                    label={element}
                    onDelete={() => deleteTag(element)}
                    variant="outlined"
                    color="primary"
                    disabled={allDisabled}
                />
            )
        })
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.hwrapper}>
                <TextField className={classes.categoriesTF}
                    testid='item_categories'
                    id="categories" 
                    value={categoriesString}
                    label="Categories"
                    multiline
                    rows={4}
                    variant="outlined"
                    onChange={changeCategories} 
                    disabled={allDisabled}/>
                <div className={classes.tagsWrapper}>{arrangeCategories()}</div>
            </div>
            <Button disabled={allDisabled} className={classes.button} variant="contained" color="secondary" onClick={applyCategories}>
                Apply
            </Button>
            <div className={classes.hwrapper}>
                <TextField className={classes.tagsTF}
                    testid='item_tags'
                    id="tags" 
                    value={tagsString}
                    label="Tags"
                    variant="outlined"
                    multiline
                    rows={4}
                    onChange={changeTags}
                    disabled={allDisabled} />
                <div className={classes.tagsWrapper}>{arrangeTags()}</div>  
            </div>
                <Button disabled={allDisabled} className={classes.button} variant="contained" color="secondary"  onClick={applyTags}>
                    Apply
                </Button>
        </ div>
    )
}

export default SecondStep;