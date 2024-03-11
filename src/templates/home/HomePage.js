import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './HomePage.css'
import { Card, CardActionArea, CardContent, Typography,  Dialog, DialogTitle, Grid, DialogContent, DialogActions, Button, ToggleButton, ToggleButtonGroup } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { STORAGE_KEY_AUTH, STORAGE_KEY_LOCATION } from '../../Config';

import { enqueueSnackbar } from 'notistack';

import MessageIcon from '@mui/icons-material/Message';
import ManIcon from '@mui/icons-material/Man';
import WomanIcon from '@mui/icons-material/Woman';

function HomePage() {
    const [loaded, setLoaded] = useState(false);
    const [data, setData] = useState([]);
    const [subMessage, setSubMessage] = useState([]);
    const [open, setOpen] = useState(false);
    const [messageData, setMessageData] = useState('');
    const [messageId, setMessageId] = useState('');

    const fetchData = () => {
        const token = localStorage.getItem(STORAGE_KEY_AUTH);
        axios.get('/api/message/list/', { params: {location_id: localStorage.getItem(STORAGE_KEY_LOCATION) },headers: { Authorization: `Token ${token}`}})
        .then(res => {
            console.log(res.data.data);
            setData(res.data.data);
            setLoaded(true);
        })
        .catch(error => {
            console.log(error);
        })
    };

    useEffect(() => {
        if(!loaded){
            const location_id = localStorage.getItem(STORAGE_KEY_LOCATION);
            if(!!location_id){
                fetchData();
            }
        }
    }, [loaded]);

    const handleClickMessage = (message, id) => {
        setOpen(true);
        setMessageData(message);
        setMessageId(id);

        axios.get('/api/sub_message/list/', { params: { message_id: id} })
        .then((res) => {
            console.log(res.data.data)
            setSubMessage(res.data.data);
        })
        .catch((err) => {
            const variant = 'error';
            enqueueSnackbar( `Error! ${err.message}.`, { variant });
        })

    }
    const handleClose = () => {
        setOpen(false);
        setGender('');
        setSubMessageId('');
        setMessageData('');
        setMessageId('');
    }

    const handleSendMessage = (e) => {
        e.preventDefault();
        const message = messageData;
        const id = messageId;
        const sub_message_ud = subMessageId;
        const gender_ = gender;
        const token = localStorage.getItem(STORAGE_KEY_AUTH);
        const payload = {
            message_id: id,
            sub_message_id: sub_message_ud,
            reporter: gender_
        }
        axios.post('/api/sending/message/', payload, { headers : {Authorization: `Token ${token}`}})
        .then((res) => {
            const variant = 'success';
            enqueueSnackbar( `Message id: ${id} "${message}" was sending 💬`, { variant });
        })
        .catch((err) => {
            const variant = 'error';
            enqueueSnackbar( `Error! ${err.message}.`, { variant });
        })
        handleClose();
    }
    const [gender, setGender] = useState('');
    const [subMessageId, setSubMessageId] = useState('');

    const handleGenderChange = (event, gender) => {
        setGender(gender);
        console.log('gender', gender);
    };
    const handleSubChange = (event, sub_message) => {
        setSubMessageId(sub_message);
        console.log('sub_message', sub_message);
    }
    return ( 
        <div className="HomePage">            
            {data && (
                data.map((message, index) =>
                    <React.Fragment key={message.id + index}>
                    <Card key={message.id + index} sx={{height: 150}} >
                        <CardActionArea sx={{height: "100%", backgroundColor: 'var(--card-color)'}} onClick={() => handleClickMessage(message.topic, message.id)}>
                            <CardContent>
                                <div style={{display: 'flex', color: 'var(--primary-color)', alignItems: 'center', gap: 6}}>
                                <Typography variant="caption" display="block" >
                                    ข้อความ
                                </Typography>
                                <MessageIcon fontSize='25'/>
                                </div>
                                <Typography gutterBottom variant="h5" component="div">
                                            {message.topic}
                                </Typography>
                                <Typography variant="caption" display="block">
                                    {message.description}
                                </Typography>
                                <span className='card-balloon1'></span>
                                <span className='card-balloon2'></span>
                            </CardContent>
                    
                        </CardActionArea>
                    </Card>
                    <Dialog
                        key={'dialog' + message.id + index}
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                            component: 'form',
                            onSubmit: (e) => handleSendMessage(e),
                        }}>
                    <DialogTitle>เพิ่มเติม</DialogTitle>
                    <DialogContent>
                    <Grid container spacing={5}>
                        <Grid item xs={6}>
                            <ToggleButtonGroup
                                orientation="vertical"
                                value={gender}
                                exclusive
                                onChange={handleGenderChange}
                                aria-label="gender"
                                >
                                <ToggleButton value="ชาย" aria-label="male" sx={{ padding: "50px"}}>
                                    <ManIcon sx={{scale: '3'}}/>
                                </ToggleButton>
                                <ToggleButton value="หญิง" aria-label="female" sx={{ padding: "50px"}}>
                                    <WomanIcon sx={{scale: '3'}} />
                                </ToggleButton>  
                            </ToggleButtonGroup>
                        </Grid>
                        <Grid item xs={6}>
                        <FormControl>
                            {/* <FormLabel id="demo-radio-buttons-group-label">Sub Message</FormLabel> */}
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="other"
                                    name="radio-buttons-group"
                                    onChange={handleSubChange}
                                >
                                    {subMessage && (
                                        subMessage.map((s_msg, index) => 
                                            <FormControlLabel key={s_msg.id+'/'+index + s_msg.detail} value={s_msg.id} control={<Radio />} label={s_msg.detail} />
                                        )
                                    )}
                                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                    

                    </DialogContent>
                    <DialogActions >
                        <Button onClick={handleClose}>ยกเลิก</Button>
                        {gender &&(
                            <Button type="submit" variant="contained" >ส่ง</Button>
                        )}
                        
                    </DialogActions>
                    </Dialog>
                    </React.Fragment>
                    
                )
            )}
        </div>
     );
}

export default HomePage;