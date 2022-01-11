import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import useStyles from './styles'

//state: open and setOpen passed as props to this Snackbar component
const CustomozedSnackbar = ({open, setOpen}) => {
    const classes = useStyles();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    }

    return (
        <div className={classes.root}>
            <Snackbar
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                open={open}//where props is used open=true means apears, 
                autoHideDuration={3000}//auto disappear after 3 seconds
                onClose={handleClose}
            >
                <MuiAlert onClose={handleClose} severity="success" elevation={6} variant="filled">
                    Transaction successfully created.
                </MuiAlert>
            </Snackbar>
        </div>
    )
}

export default CustomozedSnackbar;
