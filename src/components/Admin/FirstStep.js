import React from 'react';

//components

import { makeStyles, TextField } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    mainWrapper: {
        height: 450
    },
    wrapper: {
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'row',
        width: '100%'
    },
    columnWrapper: {
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        width: '50%'
    },
    descriptionWrapper: {
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'right',
        alignContent: 'flex-end',
        width: '50%'
    },
    bottomWrapper: {
        alignContent: 'flex-end'
    },
    titleTF: {
        width: '97%',
        paddingBottom: '20px',
    },
    descriptioTF: {
        width: '100%',
        paddingBottom: '20px'
    },
    textTF: {
        width: '100%',
        paddingBottom: '20px'
    }
}));

const FirstStep = ({
                    title, onChangeTitle,
                    link, onChangeLink,
                    description, onChangeDescription,
                    text, onChangeText,
                    handleComplete,
                    allDisabled}) => {
  
    
    const classes = useStyles(makeStyles);
    
    const changeTitle = (e) => {
        handleComplete(checkComplete({title: e.target.value, link: link, description: description, text: text}));
        onChangeTitle(e.target.value);
    }

    const changeDescription = (e) => {
        handleComplete(checkComplete({title: title, link: link, description: e.target.value, text: text}));
        onChangeDescription(e.target.value);
    }

    const changeLink = (e) => {
        handleComplete(checkComplete({title: title, link: e.target.value, description: description, text: text}));
        onChangeLink(e.target.value);
    }

    const changeText = (e) => {
        handleComplete(checkComplete({title: title, link: link, description: description, text: e.target.value}));
        onChangeText(e.target.value);
    }

    const checkComplete = (obj) => {
        if(obj.title !== "" && obj.link !== "" && obj.description !== "" && obj.text !== "") {
            return true;
        } else {
            return false;
        }
    }
    return (
        <div className={classes.mainWrapper}>
            <div className={classes.wrapper}>
                <div className={classes.columnWrapper}>
                    <TextField className={classes.titleTF}
                        testid='item_title'
                        id="title" 
                        label="Title"
                        value={title}
                        variant="outlined"
                        onChange={changeTitle}
                        disabled={allDisabled} />
                    <TextField className={classes.titleTF}
                        testid='item_link'
                        id="link" 
                        label="Link"
                        value={link}
                        variant="outlined"
                        onChange={changeLink}
                        disabled={allDisabled} />
                </div>
            
                <div className={classes.descriptionWrapper}>
                    <TextField className={classes.descriptioTF}
                        testid='item_description'
                        id="description" 
                        value={description}
                        label="Description"
                        variant="outlined"
                        multiline
                        rows={5}
                        onChange={changeDescription}
                        disabled={allDisabled} />
                </div>
            </div>
        <div className={classes.bottomWrapper}>
            <TextField className={classes.textTF}
                testid='item_text'
                id="text" 
                value={text}
                label="Text"
                variant="outlined"
                multiline
                rows={12}
                onChange={changeText}
                disabled={allDisabled} />
                
            </div>
    </div>
    )
}

export default FirstStep;