import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';
import { STORAGE_KEY_AUTH, STORAGE_KEY_LOCATION } from '../../../Config';

import './Messages.css';
import AddMessage from './AddDialog/AddMessage';
import DeleteMessage from './DeleteDialog/DeleteMessage';
import EditMessage from './EditDialog.js/EditMessage';
import DeleteSubMessage from './DeleteDialog/DeleteSubMessage';

function Messages() {
    const columns = [
        {
            field: 'action',
            headerName: 'Action',
            width: 120,
            disableColumnFilter: true,
            renderCell: (params) => (
                <div>
                <EditMessage
                    data={{ 
                    id: params.row.id, 
                    topic: params.row.topic,
                    description: params.row.description,
                    }} 
                    onComplete={handleComplete}
                />
                <DeleteMessage 
                    data={{ 
                    id: params.row.id, 
                    topic: params.row.topic,
                    description: params.row.description,
                    }} 
                    onComplete={handleComplete}/>
                </div>
            ),
        },
        { field: 'id', headerName: 'ID', width: 50},
        { field: 'topic', headerName: 'Topic', flex: 1, minWidth: 150, maxWidth: 200},
        { field: 'description', headerName: 'Description', flex:1, minWidth: 150},
        {
            field: 'sub_message',
            headerName: 'Sub Message',
            sortable: false,
            flex: 0.1,
            minWidth: 150,
            disableColumnFilter: true,
            renderCell: (params) => (
                <DeleteSubMessage messageId={params.row.id} data={params.value} onComplete={handleComplete}/>
            ),
        },
    ];

    const [loaded, setLoaded] = useState(false);
    const [messages, setMessages] = useState([]);
    const FetchMessages = async () => {
        const location_id = localStorage.getItem(STORAGE_KEY_LOCATION);
        const token = localStorage.getItem(STORAGE_KEY_AUTH);
        await axios.get('/api/message/list/', { params: {location_id : location_id}, headers: { Authorization: `Token ${token}`}})
        .then((res) => {
            if(res.status === 200){
                setMessages(res.data.data);
            }
        })
        .catch((err) => {
            console.log(err);
        })
        setLoaded(true);
    }
    const handleComplete = () => {
        console.log('handleComplete');
        setLoaded(false);
    }
    useEffect(() => {
        if(!loaded){
            FetchMessages();
        }
    },[loaded]);
    return ( 
        <div className='Messages'>
            <div className='container'>
                <div className='header-table'>
                    <Typography variant="h6" sx={{textWrap: "nowrap"}}>
                    Messages
                    </Typography>
                    <AddMessage onComplete={handleComplete}/>
                </div>
                <Box sx={{ height: '500px', width: '100%',  border: 0, borderRadius: '15px', boxShadow: 2, backgroundColor: '#fff'}}>
                    <DataGrid
                    sx={{border: 0}}
                    rows={messages}
                    columns={columns}
                    initialState={{
                        pagination: {
                        paginationModel: {
                            pageSize: 8,
                        },
                        },
                    }}
                    rowHeight={50}
                    pageSizeOptions={[8]}
                    // checkboxSelection
                    disableRowSelectionOnClick
                    />
                </Box>
            </div>
            
        </div>
     );
}

export default Messages;