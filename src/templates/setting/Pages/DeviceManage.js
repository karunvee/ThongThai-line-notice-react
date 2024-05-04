import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';

import { Box, MenuItem, Button, FormControl, InputLabel, Select, IconButton, Typography } from "@mui/material";
import '../SettingPage.css';
import axios from 'axios';
import {STORAGE_KEY_AUTH, STORAGE_KEY_BUILDING, STORAGE_KEY_FLOOR, STORAGE_KEY_LOCATION} from '../../../Config';

import { enqueueSnackbar } from 'notistack';
import './DeviceManage.css';

import AddLineNotify from './AddDialog/AddLineNotify';

import EditLineNotify from './EditDialog.js/EditLineNotify';
import DeleteLineNotify from './DeleteDialog/DeleteLineNotify';

function DeviceManage() {
    const columns = [
        { field: 'id', headerName: 'ID', width: 50},
        { field: 'group_name', headerName: 'ชื่อกลุ่ม', width: 200},
        { field: 'token_access', headerName: 'Token Access', width: 300},
        {
            field: 'action',
            headerName: 'Action',
            width: 120,
            disableColumnFilter: true,
            renderCell: (params) => (
                <div>
                <EditLineNotify 
                data={ 
                    {
                        id: params.row.id, 
                        group_name: params.row.group_name, 
                        token_access: params.row.token_access
                    }} onEdit={() => handleOnEdit}/>
                <DeleteLineNotify onDelete={() => handleOnDelete(params.row.id)}/>
                </div>
            ),
          },
    ];

    const [isFullScreen, setIsFullScreen] = useState(false);

    const [loaded, setLoaded] = useState(false);
    const [token, setToken] = useState(localStorage.getItem(STORAGE_KEY_AUTH));
    const [groupData, setGroupData] = useState([]);
    const [disableFloor, setDisableFloor] = useState(true);
    const [disableLocation, setDisableLocation] = useState(true);

    const [buildingSelect, setBuildingSelect] = useState('');
    const [floorSelect, setFloorSelect] = useState('');
    const [locationSelect, setLocationSelect] = useState('');
    
    const [buildingData, setBuildingData] = useState([]);
    const [floorData, setFloorData] = useState([]);
    const [locationData, setLocationData] = useState([]);

    const handleBuildingChange = (index) => {
        axios.get('/api/floor/list/', { params: {building_id: index },headers: { Authorization: `Token ${token}`}})
        .then((res) => {
            setBuildingSelect(index);
            setFloorData(res.data.data);
            setDisableFloor(false);

            setFloorSelect('');
            setLocationData([]);
            setLocationSelect('');
            setDisableLocation(true);
        })
        .catch((err) => {
            console.log(err.message);
        });
    }
    const handleFloorChange = (index) => {
        axios.get('/api/location/list/', { params: {floor_id: index },headers: { Authorization: `Token ${token}`}})
        .then((res) => {
            setFloorSelect(index);
            setLocationData(res.data.data);
            setDisableLocation(false);

            setLocationSelect('');
        })
        .catch((err) => {
            console.log(err.message);
        });
    }
    const handleLocationChange = (index) => {
        setLocationSelect(index);
    }
    const handleLocationSave = () => {
        localStorage.setItem(STORAGE_KEY_BUILDING, buildingSelect);
        localStorage.setItem(STORAGE_KEY_FLOOR, floorSelect);
        localStorage.setItem(STORAGE_KEY_LOCATION, locationSelect);

        const variant = 'success';
        enqueueSnackbar( `These information was saved`, { variant });
    }
    const handleLocationCancel = () => {
        setLoaded(false);
    }
    const handleLocationReset = () => {
        setBuildingSelect('');
        setFloorSelect('');
        setLocationSelect('');
    }
    const handleOnEdit = () => {
        RefreshLineConfig();
    }
    const handleOnDelete = (id) => {
        console.log('delete', id);
        axios.delete('/api/line/config/delete/', { params: { config_id: id}, headers: { Authorization: `Token ${token}`}})
        .then((res) => {
            const variant = 'success';
            enqueueSnackbar( `Success, ${res.data.detail}`, { variant });

            RefreshLineConfig();
        })
        .catch((err) => {
            const variant = 'error';
            enqueueSnackbar( `Error! ${err.message}.`, { variant });
        })
    }
    const RefreshLineConfig = () => {
        axios.get('/api/line/config/get/', { headers: { Authorization: `Token ${token}`}})
        .then(res => {
            console.log(res.data.data);
            setGroupData(res.data.data);
            setLoaded(true);
        })
        .catch(error => {
        console.log(error);
        })
    }
    
    useEffect(() => {
        if(!loaded){
            axios.get('/api/building/list/', { headers: { Authorization: `Token ${token}`}})
            .then((res) => {
                setBuildingData(res.data.data);
                setLoaded(true);

                const building_local = localStorage.getItem(STORAGE_KEY_BUILDING);
                const floor_local = localStorage.getItem(STORAGE_KEY_FLOOR);
                const location_local = localStorage.getItem(STORAGE_KEY_LOCATION);
                if(building_local){
                    setBuildingSelect(building_local);
                    
                    axios.get('/api/floor/list/', { params: {building_id: building_local },headers: { Authorization: `Token ${token}`}})
                    .then((res) => {
                        setFloorData(res.data.data);
                        setFloorSelect(floor_local);
                        setDisableFloor(false);
                    }).catch((err) => {console.log(err.message);});
                    
                    axios.get('/api/location/list/', { params: {floor_id: floor_local },headers: { Authorization: `Token ${token}`}})
                    .then((res) => {
                        setLocationData(res.data.data);
                        setLocationSelect(location_local);
                        setDisableLocation(false);
                    }).catch((err) => {console.log(err.message);});
                }
            })
            .catch((err) => {
                console.log(err.message);
            });

            RefreshLineConfig();

            if( document.fullscreenElement ) {
                setIsFullScreen(true);
            }
        }
    }, [loaded, token]);

    const handleFullScreenToggle = () => {
        if (!isFullScreen) {
        // Enter full screen mode
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) { // Firefox
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari and Opera
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
            document.documentElement.msRequestFullscreen();
        }
        } else {
        // Exit full screen mode
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { // Firefox
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // IE/Edge
            document.msExitFullscreen();
        }
        }
        // Update state to reflect full screen mode
        setIsFullScreen(!isFullScreen);
    };
    return ( 
        <div className="DeviceManage">
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' }, width: '470px'
                }}
                noValidate
                autoComplete="off"
                >
                <Typography variant="h6" gutterBottom>
                    ตำแหน่งของอุปกรณ์
                </Typography>
                <div className="form-row">
                    <div style={{width: 100}}>
                        <span>อาคาร</span>
                    </div>
                    <div>
                        <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                            <InputLabel id="Building-select-small-label">อาคาร</InputLabel>
                            <Select
                                labelId="Building-select-small-label"
                                id="Building-select-small"
                                value={buildingSelect}
                                label="Building"
                                onChange={(e) => handleBuildingChange(e.target.value)}
                            >
                                {buildingData.map((option) => (
                                    <MenuItem key={option.id+option.building_name} value={option.id}>
                                    {option.building_name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <div className="form-row">
                    <div style={{width: 100}}>
                        <span>ชั้น</span>
                    </div>
                    <div>
                        <FormControl sx={{ m: 1, minWidth: 200 }} size="small" disabled={disableFloor}>
                            <InputLabel id="Floor-select-small-label">ชั้น</InputLabel>
                            <Select
                                labelId="Floor-select-small-label"
                                id="Floor-select-small"
                                value={floorSelect}
                                label="Floor"
                                onChange={(e) => handleFloorChange(e.target.value)}
                            >
                                {floorData.map((option) => (
                                    <MenuItem key={option.id+option.floor_name} value={option.id}>
                                    {option.floor_name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <div className="form-row">
                    <div style={{width: 100}}>
                        <span>ตำแหน่ง</span>
                    </div>
                    <div>
                        <FormControl sx={{ m: 1, minWidth: 200 }} size="small" disabled={disableLocation}>
                            <InputLabel id="Location-select-small-label">ตำแหน่ง</InputLabel>
                            <Select
                                labelId="Location-select-small-label"
                                id="Location-select-small"
                                value={locationSelect}
                                label="Location"
                                onChange={(e) => handleLocationChange(e.target.value)}
                            >
                                {locationData.map((option) => (
                                    <MenuItem key={option.id+option.location_name} value={option.id}>
                                    {option.location_name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <div className="form-row-action">
                    <Button variant="outlined" size="medium" onClick={handleLocationReset}>
                        ล้างการตั้งค่า
                    </Button>
                    <Button variant="outlined" size="medium" onClick={handleLocationCancel}>
                        เรียกคืนตั้งค่า
                    </Button>
                    <Button variant="contained" size="medium" onClick={handleLocationSave} sx={{height: '100%'}}>
                        บันทึก
                    </Button>
                </div>
                <Button variant="contained" size="medium" fullWidth onClick={handleFullScreenToggle} sx={{marginTop: '20px'}} color={isFullScreen ? 'error' : 'primary'}>
                        {
                            isFullScreen ? ("ออกจากเต็มจอ"):("ขยายเต็มจอ")
                        }
                       
                </Button>
            </Box>
            <div style={{ width: '100%'}}>
                <div style={{display: 'flex', justifyContent: 'space-between',marginTop: 0, marginBottom: 10}}>
                    <Typography variant="h6" gutterBottom>
                        ตั้งค่าการแจ้งเตือนไลน์
                    </Typography>
                    <AddLineNotify onComplete={RefreshLineConfig} />
                </div>          
                <Box sx={{ height: '300px', width: '100%',  border: 0, borderRadius: '15px', boxShadow: 2, backgroundColor: '#fff'}}>
                    <DataGrid
                    sx={{border: 0}}
                    rows={groupData}
                    columns={columns}
                    initialState={{
                        pagination: {
                        paginationModel: {
                            pageSize: 4,
                        },
                        },
                    }}
                    rowHeight={50}
                    pageSizeOptions={[4]}
                    // checkboxSelection
                    disableRowSelectionOnClick
                    />
                </Box>
            </div>
        </div>
     );
}

export default DeviceManage;