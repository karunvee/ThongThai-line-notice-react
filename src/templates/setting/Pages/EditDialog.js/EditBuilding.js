import React, { useState } from 'react';
import axios from 'axios';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, IconButton } from '@mui/material';
import {STORAGE_KEY_AUTH} from '../../../../Config';

import { enqueueSnackbar } from 'notistack';

import EditIcon from '@mui/icons-material/Edit';

function EditBuilding({data, onComplete}) {
    const [open, setOpen] = useState(false);
    const [building, setBuilding] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
        setBuilding(data.building_name);
    };
    const handleBuildingChange = (e) => {
      e.preventDefault();
      setBuilding(e.target.value);
  }
    const handleClose = () => {
        setOpen(false);
    };
    const handleSummit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem(STORAGE_KEY_AUTH);
        const payload = {
            building_id: data.id,
            building_name: building,
        };

        axios.put('/api/building/update/', payload, {headers: { Authorization: `Token ${token}`}})
        .then((res) => {
            const variant = 'success';
            enqueueSnackbar( `Updated! id: ${data.id}, group: ${building}`, { variant });
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
                value={building}
                fullWidth
                variant="standard"
                onChange={handleBuildingChange}
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

export default EditBuilding;