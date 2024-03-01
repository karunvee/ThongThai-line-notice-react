import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './HomePage.css'
import { Card, CardActionArea, CardContent, Typography, colors } from '@mui/material';

import { STORAGE_KEY_AUTH, STORAGE_KEY_LOCATION } from '../../Config';

import { enqueueSnackbar } from 'notistack';

import MessageIcon from '@mui/icons-material/Message';

function HomePage() {
    const [loaded, setLoaded] = useState(false);
    const [data, setData] = useState([]);

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
    const handleSendMessage = (message, id) => {

        const token = localStorage.getItem(STORAGE_KEY_AUTH);
        const payload = {
            message_id: id,
            reporter: "unknown"
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

    }
    useEffect(() => {
        if(!loaded){
            const location_id = localStorage.getItem(STORAGE_KEY_LOCATION);
            if(!!location_id){
                fetchData();
            }
        }
    }, [loaded]);
    return ( 
        <div className="HomePage">
            {data && (
                data.map((message, index) =>
                    <Card key={message.id + index} sx={{height: 150}} >
                        <CardActionArea sx={{height: "100%", backgroundColor: 'var(--card-color)'}} onClick={() => handleSendMessage(message.topic, message.id)}>
                            <CardContent>
                                <div style={{display: 'flex', color: 'var(--primary-color)', alignItems: 'center', gap: 6}}>
                                <Typography variant="caption" display="block" >
                                    Message
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
                )
            )}
        </div>
     );
}

export default HomePage;