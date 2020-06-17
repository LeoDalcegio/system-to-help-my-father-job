import React, { useEffect, useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function CustomSnackbar({ snackbarState }) {
    const classes = useStyles();

    const [open = snackbarState.open, setOpen] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    useEffect(() => {
        setOpen(snackbarState.open);
    }, [snackbarState])

    return (
        <div className={classes.root}>
            <Snackbar 
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }} 
                open={open} 
                autoHideDuration={snackbarState.autoHideDuration || 6000} onClose={handleClose}>
                <Alert 
                    onClose={handleClose} 
                    severity={snackbarState.severity}>
                    {snackbarState.message}
                </Alert>
            </Snackbar>
        </div>
    );
}