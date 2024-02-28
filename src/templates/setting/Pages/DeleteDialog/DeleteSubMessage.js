import React, { useState} from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import {STORAGE_KEY_AUTH} from '../../../../Config';
import { Divider, Tooltip, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@mui/material';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';


export default function DeleteSubMessage({messageId, data, onComplete}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const [openAddDialog, setAddOpenDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [subMessageId, setSubMessageId] = useState('');

    const handleAddDialogClose = () => {
        setAddOpenDialog(false);
    };
    const handleAddSummitDialog = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        const payload = { 
            message_id: messageId,
            detail: formJson.sub_message
        }
        console.log(payload);
        axios.post('/api/sub_message/add/', payload, { headers: { Authorization: `Token ${localStorage.getItem(STORAGE_KEY_AUTH)}`}})
        .then((res) => {
            const variant = 'success';
            enqueueSnackbar( `Success, added new sub message.`, { variant });
            onComplete();
        })
        .catch((err) => {
            console.log(err);
            const variant = 'error';
            enqueueSnackbar( `Error!!, ${err.message}.`, { variant });
        })
        handleAddDialogClose()
    };
    const handleAdd = () => {
        setAddOpenDialog(true);
        handleClose();
    };

    const handleDeleteDialogClose = () => {
        setOpenDeleteDialog(false);
    };
    const handleDeleteSummitDialog = (event) => {
        event.preventDefault();
        console.log({ params: {sub_message_id: subMessageId} ,headers: { Authorization: `Token ${localStorage.getItem(STORAGE_KEY_AUTH)}`}});
        axios.delete('/api/sub_message/delete/', { params: {sub_message_id: subMessageId} ,headers: { Authorization: `Token ${localStorage.getItem(STORAGE_KEY_AUTH)}`}})
        .then((res) => {
            const variant = 'success';
            enqueueSnackbar( `Success, Delete sub message.`, { variant });
            onComplete();
        })
        .catch((err) => {
            console.log(err);
            const variant = 'error';
            enqueueSnackbar( `Error!!, ${err.message}.`, { variant });
        })
        handleDeleteDialogClose()
    }
    const handleOnDelete = (sub_message_id) => {
        setOpenDeleteDialog(true);
        setSubMessageId(sub_message_id);
        handleClose();
    };
    const AddNewDialog = (
    <React.Fragment>
    <Dialog
          open={openAddDialog}
          onClose={handleAddDialogClose}
          PaperProps={{
            component: 'form',
            onSubmit: (event) => handleAddSummitDialog(event),
          }}
        >
          <DialogTitle>Add Sub Message</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To specific the detail of line notify message, please enter your detail here.
            </DialogContentText>
            <TextField
                autoFocus
                required
                margin="dense"
                id="sub_message"
                name="sub_message"
                label="Sub Message"
                fullWidth
                variant="standard"
                // onChange={handleSummitDialog}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddDialogClose}>Cancel</Button>
            <Button type="submit" variant='contained'>Save</Button>
          </DialogActions>
        </Dialog>
    </React.Fragment>
    )
    const DeleteDialog = (
        <React.Fragment>
        <Dialog
            open={openDeleteDialog}
            onClose={handleDeleteDialogClose}
            PaperProps={{
                component: 'form',
                onSubmit: (event) => handleDeleteSummitDialog(event),
            }}
            >
            <DialogTitle>Delete Sub Message</DialogTitle>
            <DialogContent>
                <DialogContentText>
                To specific the detail of line notify message, please enter your detail here.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDeleteDialogClose}>Cancel</Button>
                <Button type="submit" variant="contained" sx={{backgroundColor: "red"}} >Delete</Button>
            </DialogActions>
            </Dialog>
        </React.Fragment>
    )
    return (
        <div>
        {DeleteDialog}
        {AddNewDialog}
        <Button
            variant="contained" size='small'
            onClick={handleClick}>
            Show
        </Button>
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
            }}
            transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
            }}
        >
            <MenuItem onClick={handleAdd}> <AddCircleOutlineIcon sx={{fontSize: '15px', marginRight: '5px'}}/>Add New</MenuItem>
            <Divider/>
            {data && data.map((item, index) => 
            <Tooltip title="Click to Delete" placement="left" key={item.id}>
                <MenuItem onClick={() => handleOnDelete(item.id)} key={item.id}> 
                    <DeleteIcon sx={{fontSize: '15px', marginRight: '5px'}} key={item.id}/>
                    <Divider orientation="vertical" variant="middle" flexItem sx={{margin: '5px 5px 5px 0'}}/>
                    {item.detail}
                </MenuItem>
            </Tooltip>
            )}
        </Menu>
        </div>
    );
}