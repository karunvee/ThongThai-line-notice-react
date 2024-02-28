import React, { useState } from 'react';
import axios from 'axios';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, IconButton } from '@mui/material';
import {STORAGE_KEY_AUTH} from '../../../../Config';

import { enqueueSnackbar } from 'notistack';

import EditIcon from '@mui/icons-material/Edit';

function EditLocation({data, onComplete}) {
    const [open, setOpen] = useState(false);
    const [location, setLocation] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
        setLocation(data.location_name);
    };
    const handleLocationChange = (e) => {
      e.preventDefault();
      setLocation(e.target.value);
  }
    const handleClose = () => {
        setOpen(false);
    };
    const handleSummit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem(STORAGE_KEY_AUTH);
        const payload = {
            location_id: data.id,
            location_name: location,
            floor_id: data.floor_id,
        };

        axios.put('/api/location/update/', payload, {headers: { Authorization: `Token ${token}`}})
        .then((res) => {
            const variant = 'success';
            enqueueSnackbar( `Updated! id: ${data.id}, group: ${location}`, { variant });
        })
        .catch((err) => {
            const variant = 'error';
            enqueueSnackbar( `Error! ${err.message}`, { variant });
        })
        onComplete();
        handleClose();
    }

    return ( 
        <React.Fragment>
        <IconButton aria-label="delete" onClick={handleClickOpen}>
                <EditIcon />
        </IconButton>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: 'form',
            onSubmit: (event) => handleSummit(event),
          }}
        >
          <DialogTitle>Edit Line Notify Group</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To getting notification from this website, please enter your group name and token access here. We
              will send updates occasionally.
            </DialogContentText>
            <TextField
                autoFocus
                required
                margin="dense"
                id="topic"
                name="topic"
                label="Topic"
                value={location}
                fullWidth
                variant="standard"
                onChange={handleLocationChange}
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

export default EditLocation;