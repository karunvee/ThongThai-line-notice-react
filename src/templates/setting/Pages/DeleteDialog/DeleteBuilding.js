import React, { useState } from 'react';
import axios from 'axios';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, IconButton} from '@mui/material';
import {STORAGE_KEY_AUTH} from '../../../../Config';

import { enqueueSnackbar } from 'notistack';
import DeleteIcon from '@mui/icons-material/Delete';

function DeleteBuilding({data, onComplete}) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handleSummit = (e) => {
        e.preventDefault();
        console.log('delete', data.id);
        const token = localStorage.getItem(STORAGE_KEY_AUTH);
        axios.delete('/api/building/delete/', { params: { building_id: data.id}, headers: { Authorization: `Token ${token}`}})
        .then((res) => {
            if(res.status === 200){
              const variant = 'success';
              enqueueSnackbar( `Success, ${res.data.detail}`, { variant });
            }
        })
        .catch((err) => {
            const variant = 'error';
            enqueueSnackbar( `Error! ${err.message}.`, { variant });
        })

        onComplete();
        handleClose();
    }
    return ( 
        <React.Fragment>
        <IconButton aria-label="delete" sx={{color: 'red'}} onClick={handleClickOpen}>
            <DeleteIcon />
        </IconButton>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: 'form',
            onSubmit: (event) => handleSummit(event),
          }}
        >
          <DialogTitle>Delete Building</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure? you want to delete <span  style={{ color: 'var(--primary-color)'}}>{data.building_name}.</span>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained" sx={{backgroundColor: "red"}} >Delete</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
     );
}

export default DeleteBuilding;