import React, { useState } from 'react';
import axios from 'axios';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@mui/material';
import {STORAGE_KEY_AUTH, STORAGE_KEY_LOCATION} from '../../../../Config';

import { enqueueSnackbar } from 'notistack';

import AddIcon from '@mui/icons-material/Add';

function AddBuilding({onComplete}) {
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
            building_name: formJson.building_name,
        };
        axios.post('/api/building/add/', payload, { headers: { Authorization: `Token ${localStorage.getItem(STORAGE_KEY_AUTH)}`}})
        .then((res) => {
            const variant = 'success';
            enqueueSnackbar( `Success, added new message.`, { variant });

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
          <DialogTitle>เพิ่มข้อมูลอาคาร</DialogTitle>
          <DialogContent>
            <DialogContentText>
              สำหรับระบุตำแหน่งของอาคารในการส่งข้อความ โปรดกรอกข้อมูลด้านล่าง
            </DialogContentText>
            <TextField
                autoFocus
                required
                margin="dense"
                id="building_name"
                name="building_name"
                label="ชื่ออาคาร"
                fullWidth
                variant="standard"
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

export default AddBuilding;