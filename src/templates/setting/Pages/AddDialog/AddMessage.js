import React, { useState } from 'react';
import axios from 'axios';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@mui/material';
import {STORAGE_KEY_AUTH, STORAGE_KEY_LOCATION} from '../../../../Config';

import { enqueueSnackbar } from 'notistack';

import AddIcon from '@mui/icons-material/Add';

function AddMessage() {
    const [open, setOpen] = useState(false);
    const [topic, setTopic] = useState('');
    const [description, setDescription] = useState('');
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleTopicChange = (e) => {
        e.preventDefault();
        setTopic(e.target.value);
        console.log(topic);
    }
    const handleDescChange = (e) => {
        e.preventDefault();
        setDescription(e.target.value);
        console.log(description);
    }
    const handleSummit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        const location_id = localStorage.getItem(STORAGE_KEY_LOCATION);
        const payload = {
            location_id: location_id,
            topic: formJson.topic,
            description: formJson.description
        };
        axios.post('/api/message/add/', payload, { headers: { Authorization: `Token ${localStorage.getItem(STORAGE_KEY_AUTH)}`}})
        .then((res) => {
            const variant = 'success';
            enqueueSnackbar( `Success, added new message.`, { variant });
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
        <Button onClick={handleClickOpen}
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
          <DialogTitle>Add Message</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To getting notification from this website, please enter your message detail here. We
              will send updates occasionally.
            </DialogContentText>
            <TextField
                autoFocus
                required
                margin="dense"
                id="topic"
                name="topic"
                label="Topic"
                fullWidth
                variant="standard"
                onChange={handleTopicChange}
            />
             <TextField
                autoFocus
                required
                margin="dense"
                id="description"
                name="description"
                label="Description"
                fullWidth
                variant="standard"
                onChange={handleDescChange}
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

export default AddMessage;