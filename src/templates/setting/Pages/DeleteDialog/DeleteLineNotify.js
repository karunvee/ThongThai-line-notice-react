import React, { useState } from 'react';
import axios from 'axios';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, IconButton} from '@mui/material';
import {STORAGE_KEY_AUTH, STORAGE_KEY_LOCATION} from '../../../../Config';

import { enqueueSnackbar } from 'notistack';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

function DeleteLineNotify({onDelete}) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handleSummit = (e) => {
        e.preventDefault();
        onDelete();
        handleClose();
    }
    return ( 
        <React.Fragment>
        <IconButton aria-label="edit" sx={{color: 'red'}} onClick={handleClickOpen}>
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
          <DialogTitle>ลบข้อมูลกลุ่มแชท</DialogTitle>
          <DialogContent>
            <DialogContentText>
            คุณต้องการลบข้อมูลนี้ใช่หรือไม่?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>ยกเลิก</Button>
            <Button type="submit" variant="contained" sx={{backgroundColor: "red"}} >ยืนยัน</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
     );
}

export default DeleteLineNotify;