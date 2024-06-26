import React, { useState } from 'react';
import axios from 'axios';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, IconButton } from '@mui/material';
import {STORAGE_KEY_AUTH} from '../../../../Config';

import { enqueueSnackbar } from 'notistack';

import EditIcon from '@mui/icons-material/Edit';

function EditFloor({data, onComplete}) {
    const [open, setOpen] = useState(false);
    const [floor, setFloor] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
        setFloor(data.floor_name);
    };
    const handleFloorChange = (e) => {
      e.preventDefault();
      setFloor(e.target.value);
  }
    const handleClose = () => {
        setOpen(false);
    };
    const handleSummit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem(STORAGE_KEY_AUTH);
        const payload = {
            floor_id: data.id,
            floor_name: floor,
            building_id: data.building_id,
        };

        axios.put('/api/floor/update/', payload, {headers: { Authorization: `Token ${token}`}})
        .then((res) => {
            const variant = 'success';
            enqueueSnackbar( `Updated! id: ${data.id}, group: ${floor}`, { variant });
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
          <DialogTitle>แก้ไขข้อมูลชั้น</DialogTitle>
          <DialogContent>
            <DialogContentText>
            สำหรับระบุตำแหน่งของชั้นในการส่งข้อความ โปรดกรอกข้อมูลด้านล่าง
            </DialogContentText>
            <TextField
                autoFocus
                required
                margin="dense"
                id="topic"
                name="topic"
                label="ชื่อชั้น"
                value={floor}
                fullWidth
                variant="standard"
                onChange={handleFloorChange}
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

export default EditFloor;