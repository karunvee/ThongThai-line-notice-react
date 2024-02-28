import React, { useState } from 'react';
import axios from 'axios';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@mui/material';
import {STORAGE_KEY_AUTH} from '../../../../Config';

import { enqueueSnackbar } from 'notistack';

import AddIcon from '@mui/icons-material/Add';

function AddFloor({buildingId, onComplete, disabled}) {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSummit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        const payload = {
          building_id: buildingId,
          floor_name: formJson.floor_name,
        };
        axios.post('/api/floor/add/', payload, { headers: { Authorization: `Token ${localStorage.getItem(STORAGE_KEY_AUTH)}`}})
        .then((res) => {
            const variant = 'success';
            enqueueSnackbar( `Success, added new message.`, { variant });

            onComplete(buildingId);
        })
        .catch((err) => {
            console.log(err)
            const variant = 'error';
            enqueueSnackbar( `Error!!, ${err.message}.`, { variant });
        })
        handleClose();
    }
    return ( 
        <React.Fragment>
        <Button onClick={handleClickOpen} disabled={disabled}
        component="label"
        role={undefined}
        variant="contained"
        size='small'
        tabIndex={-1}
        startIcon={<AddIcon />}
            >
                Add
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: 'form',
            onSubmit: (event) => handleSummit(event),
          }}
        >
          <DialogTitle>Add Floor</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To specific exactly where is floor inform the messages, please enter you floor here.
            </DialogContentText>
            <TextField
                autoFocus
                required
                margin="dense"
                id="floor_name"
                name="floor_name"
                label="Floor Name"
                fullWidth
                variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained" >Save</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
     );
}

export default AddFloor;