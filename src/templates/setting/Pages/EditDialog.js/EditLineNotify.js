import React, { useState } from 'react';
import axios from 'axios';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, IconButton } from '@mui/material';
import {STORAGE_KEY_AUTH} from '../../../../Config';

import { enqueueSnackbar } from 'notistack';

import EditIcon from '@mui/icons-material/Edit';

function EditLineNotify({data, onEdit}) {
    const [open, setOpen] = useState(false);
    const [groupName, setGroupName] = useState('');
    const [tokenAccess, setTokenAccess] = useState('');
    const handleClickOpen = () => {
        setOpen(true);
        setGroupName(data.group_name);
        setTokenAccess(data.token_access);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleGroupChange = (e) => {
        e.preventDefault();
        setGroupName(e.target.value);
        console.log(groupName);
    }
    const handleTokenChange = (e) => {
        e.preventDefault();
        setTokenAccess(e.target.value);
        console.log(tokenAccess);
    }
    const handleSummit = (e) => {
        e.preventDefault();
        const payload = {
            config_id : data.id,
            group_name : groupName,
            token_access : tokenAccess
        }
        console.log('payload',payload);

        axios.put('/api/line/config/update/', payload, {headers: { Authorization: `Token ${localStorage.getItem(STORAGE_KEY_AUTH)}`}})
        .then((res) => {
            const variant = 'success';
            enqueueSnackbar( `Updated! id: ${data.id}, group: ${groupName}`, { variant });
        })
        .catch((err) => {
            const variant = 'error';
            enqueueSnackbar( `Error! ${err.message}`, { variant });
        })
        onEdit();
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
                id="group_name"
                name="group_name"
                label="Group Name"
                value={groupName}
                fullWidth
                variant="standard"
                onChange={handleGroupChange}
            />
             <TextField
                autoFocus
                required
                margin="dense"
                id="token_access"
                name="token_access"
                label="Token Access"
                value={tokenAccess}
                fullWidth
                variant="standard"
                onChange={handleTokenChange}
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

export default EditLineNotify;