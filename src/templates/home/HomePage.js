import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './HomePage.css'
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';

import { STORAGE_KEY_AUTH, STORAGE_KEY_LOCATION } from '../../Config';
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
                    <Card key={message.id + index} sx={{height: 150}}>
                        <CardActionArea sx={{height: "100%" }}>
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {message.topic}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {message.description}
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                )
            )}
        </div>
     );
}

export default HomePage;