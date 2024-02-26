import React, { useState } from 'react';
import './HomePage.css'
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';

function HomePage() {
    const [data, setData] = useState([{
        "id": 1,
        "topic": "ท่อเสีย 1",
        "description": "detail",
        "location": 1
    },
    {
        "id": 2,
        "topic": "ท่อเสีย 2",
        "description": "detail",
        "location": 1
    },{
        "id": 1,
        "topic": "ท่อเสีย 1",
        "description": "detail",
        "location": 1
    },
    {
        "id": 2,
        "topic": "ท่อเสีย 2",
        "description": "detailasdas 12 2asd asdasdas dasda1222 222222 22222 222sdzxcz xczxc",
        "location": 1
    },{
        "id": 1,
        "topic": "ท่อเสีย 1",
        "description": "detail",
        "location": 1
    },
    {
        "id": 2,
        "topic": "ท่อเสีย 2",
        "description": "detail",
        "location": 1
    },
    {
        "id": 2,
        "topic": "ท่อเสีย 2",
        "description": "detailasdas 12 2asd asd asdasda sda122 22222 22 22222 222sd",
        "location": 1
    },{
        "id": 1,
        "topic": "ท่อเสีย 1",
        "description": "detail",
        "location": 1
    },
    {
        "id": 2,
        "topic": "ท่อเสีย 2",
        "description": "detail",
        "location": 1
    }]);

    
    return ( 
        <div className="HomePage">
            {data !== null && (
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