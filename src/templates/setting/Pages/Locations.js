import React, { useEffect, useState } from 'react';
import { Box, Typography,  MenuItem, Button, IconButton, Select, InputLabel, FormControl, LinearProgress} from '@mui/material';

import { DataGrid } from '@mui/x-data-grid';
import { STORAGE_KEY_AUTH } from '../../../Config';
import axios from 'axios';

import AddBuilding from './AddDialog/AddBuilding';
import AddFloor from './AddDialog/AddFloor';
import AddLocation from './AddDialog/AddLocation';

import DeleteBuilding from './DeleteDialog/DeleteBuilding';
import DeleteFloor from './DeleteDialog/DeleteFloor';
import DeleteLocation from './DeleteDialog/DeleteLocation';

import EditBuilding from './EditDialog.js/EditBuilding';
import EditFloor from './EditDialog.js/EditFloor';
import EditLocation from './EditDialog.js/EditLocation';

function Locations() {
    const building_columns = [
        { field: 'id', headerName: 'ID', width: 50},
        { field: 'building_name', headerName: 'Building', width: 200},
        {
            field: 'action',
            headerName: 'Action',
            width: 120,
            disableColumnFilter: true,
            renderCell: (params) => (
                <div>
                <EditBuilding data={{
                    id: params.row.id,
                    building_name: params.row.building_name
                }} onComplete={() => setLoaded(false)}/>
                <DeleteBuilding data={{
                    id: params.row.id,
                    building_name: params.row.building_name
                }} onComplete={() => setLoaded(false)}/>
                </div>
            ),
          },
    ];
    const floor_columns = [
        { field: 'id', headerName: 'ID', width: 50},
        { field: 'floor_name', headerName: 'Floor', width: 200},
        { field: 'buildingInfo', headerName: 'Building', width: 200},
        {
            field: 'action',
            headerName: 'Action',
            width: 120,
            disableColumnFilter: true,
            renderCell: (params) => (
                <div>
                <EditFloor data={{
                    building_id: selectBuilding,
                    id: params.row.id,
                    floor_name: params.row.floor_name
                }} onComplete={() => setLoadedF(false)}/>
                <DeleteFloor data={{
                    id: params.row.id,
                    floor_name: params.row.floor_name
                }} onComplete={() => setLoadedF(false)}/>
                </div>
            ),
          },
    ];
    
    const location_columns = [
        { field: 'id', headerName: 'ID', width: 50},
        { field: 'location_name', headerName: 'Location', width: 200},
        { field: 'floorNumber', headerName: 'Building, Floor', width: 200},
        {
            field: 'action',
            headerName: 'Action',
            width: 120,
            disableColumnFilter: true,
            renderCell: (params) => (
                <div>
                <EditLocation data={{
                    floor_id: selectFloor,
                    id: params.row.id,
                    location_name: params.row.location_name
                }} onComplete={() => setLoadedL(false)}/>
                <DeleteLocation data={{
                    id: params.row.id,
                    location_name: params.row.location_name
                }} onComplete={() => setLoadedL(false)}/>
                </div>
            ),
          },
    ];

    const [loaded, setLoaded] = useState(false);

    const [loadedB, setLoadedB] = useState(false);
    const [loadedF, setLoadedF] = useState(false);
    const [loadedL, setLoadedL] = useState(false);

    const [selectBuilding, setSelectBuilding] = useState('');
    const [selectFloor, setSelectFloor] = useState('');

    const [ buildingData, setBuildingData] = useState([]);
    const [ floorData, setFloorData] = useState([]);
    const [ locationData, setLocationData] = useState([]);

    const fetchingBuildingData = () => {
        const token = localStorage.getItem(STORAGE_KEY_AUTH);
        axios.get('/api/building/list/', { headers: { Authorization: `Token ${token}`}})
        .then((res) => {
            if(res.status === 200){
                console.log('fetchingBuildingData');
                console.log(res.data.data);
                setBuildingData(res.data.data);
                setLoaded(true);
                setLoadedB(true);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }
    const fetchingFloorData = (building_id) => {
        const token = localStorage.getItem(STORAGE_KEY_AUTH);
        axios.get('/api/floor/list/', { params: {building_id: building_id} ,headers: { Authorization: `Token ${token}`}})
        .then((res) => {
            setFloorData(res.data.data);
            setLoadedF(true);
        })
        .catch((err) => {
            console.log(err);
        })
    }
    const fetchingLocationData = (floor_id) => {
        const token = localStorage.getItem(STORAGE_KEY_AUTH);
        axios.get('/api/location/list/', { params: {floor_id: floor_id} ,headers: { Authorization: `Token ${token}`}})
        .then((res) => {
            setLocationData(res.data.data);
            setLoadedL(true);
        })
        .catch((err) => {
            console.log(err);
        })
    }
    const handleBuildingChange = (building_id) => {
        setSelectBuilding(building_id);
        fetchingFloorData(building_id);
        setSelectFloor('');
        setLocationData([]);
        setLoadedL(false);
        console.log('handleBuildingChange', building_id);
    }
    const handleFloorChange = (floor_id) => {
        setSelectFloor(floor_id);
        fetchingLocationData(floor_id);
        console.log('handleFloorChange', floor_id);
    }
    const handleClear = () => {
        setFloorData([]);
        setLocationData([]);
        setSelectBuilding('');
        setSelectFloor('');
        setLoadedF(false);
        setLoadedL(false);
    }
    useEffect(() => {
        if(!loaded){
            fetchingBuildingData();
        }
        if(selectBuilding !== '' && !loadedF){
            console.log('refresh floor table');
            fetchingFloorData(selectBuilding);
        }
        if(selectFloor !== '' && !loadedL){
            console.log('refresh location table');
            fetchingLocationData(selectFloor);
        }
    }, [loaded, loadedF, loadedL, selectBuilding, selectFloor]);

    return ( 
        <div className='Locations'>
            <div className='header-table' style={{marginTop: 0, marginBottom: 10}}>
                <Typography variant="h6">
                    Building List
                </Typography>
                <div>
                <Button variant="text" size='small' onClick={handleClear} sx={{marginRight: 3}}>
                        Clear
                </Button>
                <AddBuilding onComplete={fetchingBuildingData}/>
                </div>
            </div>
            {!loadedB ? (<LinearProgress className='loading-bar' />) : (<LinearProgress className='loading-bar' variant="determinate" value={100}/>)}
            <Box sx={{ height: '300px', width: '100%',  border: 0, borderRadius: '15px', boxShadow: 2, backgroundColor: '#fff'}}>
                <DataGrid
                sx={{border: 0}}
                rows={buildingData}
                columns={building_columns}
                initialState={{
                    pagination: {
                    paginationModel: {
                        pageSize: 12,
                    },
                    },
                }}
                rowHeight={70}
                pageSizeOptions={[12]}
                // checkboxSelection
                disableRowSelectionOnClick
                />
            </Box>


            <div className='header-table'>
                <div className='header'>
                    <Typography variant="h6" sx={{textWrap: "nowrap"}}>
                        Floor List
                    </Typography>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <InputLabel id="demo-select-small-label">Building</InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={selectBuilding}
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
                <AddFloor buildingId={selectBuilding} onComplete={fetchingFloorData} disabled={selectBuilding === ''}/>
            </div>
            {!loadedF ? (<LinearProgress className='loading-bar' />) : (<LinearProgress className='loading-bar' variant="determinate" value={100}/>)}
            <Box sx={{ height: '300px', width: '100%',  border: 0, borderRadius: '15px', boxShadow: 2, backgroundColor: '#fff'}}>
                <DataGrid
                sx={{border: 0}}
                rows={floorData}
                columns={floor_columns}
                initialState={{
                    pagination: {
                    paginationModel: {
                        pageSize: 12,
                    },
                    },
                }}
                rowHeight={70}
                pageSizeOptions={[12]}
                // checkboxSelection
                disableRowSelectionOnClick
                />
            </Box>


            <div className='header-table'>
                <div className='header'>
                    <Typography variant="h6" sx={{textWrap: "nowrap"}}>
                        Location List
                    </Typography>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="demo-select-small-label">Floor</InputLabel>
                    <Select disabled={selectBuilding===''}
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={selectFloor}
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
                <AddLocation floorId={selectFloor} onComplete={fetchingLocationData} disabled={selectFloor === ''}/>

            </div>
            {!loadedL ? (<LinearProgress className='loading-bar' />) : (<LinearProgress className='loading-bar' variant="determinate" value={100}/>)}
            <Box sx={{ height: '300px', width: '100%',  border: 0, borderRadius: '15px', boxShadow: 2, backgroundColor: '#fff'}}>
                <DataGrid
                sx={{border: 0}}
                rows={locationData}
                columns={location_columns}
                initialState={{
                    pagination: {
                    paginationModel: {
                        pageSize: 12,
                    },
                    },
                }}
                rowHeight={70}
                pageSizeOptions={[12]}
                // checkboxSelection
                disableRowSelectionOnClick
                />
            </Box>
        </div>

     );
}

export default Locations;