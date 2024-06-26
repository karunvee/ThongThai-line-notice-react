import React, { useState } from 'react';
import axios from 'axios';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@mui/material';
import {STORAGE_KEY_AUTH} from '../../../../Config';

import { enqueueSnackbar } from 'notistack';

import AddIcon from '@mui/icons-material/Add';

function AddLineNotify({onComplete}) {
    const [open, setOpen] = useState(false);
    const [groupName, setGroupName] = useState('');
    const [tokenAccess, setTokenAccess] = useState('');
    const handleClickOpen = () => {
        setOpen(true);
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
        const formData = new FormData(e.currentTarget);
        const formJson = Object.fromEntries(formData.entries());

        const payload = {
            group_name: formJson.group_name,
            token_access: formJson.token_access
        };
        axios.post('/api/line/config/add/', payload, { headers: { Authorization: `Token ${localStorage.getItem(STORAGE_KEY_AUTH)}`}})
        .then((res) => {
            const variant = 'success';
            enqueueSnackbar( `Success, added new group line notify.`, { variant });
            onComplete();
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
                เพิ่ม
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: 'form',
            onSubmit: (event) => handleSummit(event),
          }}
        >
          <DialogTitle>เพิ่มข้อมูลการแจ้งเตือนของ LINE</DialogTitle>
          <DialogContent>
            <DialogContentText>
             โปรดใส่ชื่อของกลุ่มแชท และ token ของกลุ่มแชทนั้นๆ เพื่อที่ระบบจะสามารถส่งข้อความไปยังกลุ่มแชทนั้นๆได้
            </DialogContentText>
            <TextField
                autoFocus
                required
                margin="dense"
                id="group_name"
                name="group_name"
                label="ชื่อกลุ่มแชท"
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
                fullWidth
                variant="standard"
                onChange={handleTokenChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>ยกเลิก</Button>
            <Button type="submit" variant="contained" >บันทึก</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
     );
}

export default AddLineNotify;