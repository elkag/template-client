import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { UserContext } from '../../contexts/userContext';
import { API_DOCUMENTATION_URL } from '../../api/services/config/config';


const useStyles = makeStyles((theme) => ({
    root: {
      '& > * + *': {
        marginLeft: theme.spacing(0),
      },
    },
    footer: {
        position: 'fixed',
        left: 5,
        bottom: 0,
        width: '100%',
        textAlign: 'center'
    }
  }));

const Footer = () => {

    const classes = useStyles();

    const [session] = useContext(UserContext);
   
    return (
        <div className={classes.footer}>
            {
                session && session.user ? 
                    <Typography className={classes.root} variant="subtitle2">
                        Copyright © 2021, <b>Template Project.</b> All Rights Reserved.&nbsp;|&nbsp; 
                        <Link href={API_DOCUMENTATION_URL} variant="caption" target="_blank" rel="noopener" gutterBottom>
                            For developers
                        </Link>
                    </Typography>
                : null
            }
        </div>
    );
}

export default Footer;