import React from 'react';
import {Snackbar, IconButton} from '@mui/material'
import FeatherIcon from 'feather-icons-react'

const SnackBar = ({open, handleClose, error}) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            message={error}
            action={
                <React.Fragment>
                    <IconButton
                        aria-label='close'
                        color='inherit'
                        sx={{ padding: '5px', borderRadius: '6px' }}
                        onClick={handleClose}
                    >
                        <FeatherIcon icon='x' size='16' />
                    </IconButton>
                </React.Fragment>
            }
        />
    );
}

export default SnackBar;
