import React, { useState } from 'react';
import axios from 'axios';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, IconButton } from '@mui/material';
import {STORAGE_KEY_AUTH} from '../../../../Config';

import { enqueueSnackbar } from 'notistack';

import EditIcon from '@mui/icons-material/Edit';

function EditMessage({data, onComplete}) {
    const [open, setOpen] = useState(false);
    const [topic, setTopic] = useState('');
    const [description, setDescription] = useState('');
    const handleClickOpen = () => {
        setOpen(true);
        setTopic(data.topic);
        setDescription(data.description);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleTopicChange = (e) => {
        e.preventDefault();
        setTopic(e.target.value);
    }
    const handleDescChange = (e) => {
        e.preventDefault();
        setDescription(e.target.value);
    }
    const handleSummit = (e) => {
        e.preventDefault();
        const payload = {
          message_id : data.id,
          topic : topic,
          description : description
        }

        axios.put('/api/message/update/', payload, {headers: { Authorization: `Token ${localStorage.getItem(STORAGE_KEY_AUTH)}`}})
        .then((res) => {
            const variant = 'success';
            enqueueSnackbar( `Updated! id: ${data.id}, group: ${topic}`, { variant });
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
                value={topic}
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
                value={description}
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

export default EditMessage;