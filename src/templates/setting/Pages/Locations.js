import React, { useState } from 'react';
import { Box, Typography,  MenuItem, Button, IconButton, Select, InputLabel, FormControl} from '@mui/material';

import { DataGrid } from '@mui/x-data-grid';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const currencies = [
    {
      value: 'USD',
      label: 'Tower A, Floor 1',
    },
    {
      value: 'EUR',
      label: 'Tower A, Floor 1',
    },
    {
      value: 'BTC',
      label: 'Tower A, Floor 1',
    },
    {
      value: 'JPY',
      label: 'Tower A, Floor 1',
    },
  ];

const building_colunms = [
    { field: 'id', headerName: 'ID', width: 50},
    { field: 'building_name', headerName: 'Building', width: 200},
    {
        field: 'action',
        headerName: 'Action',
        width: 120,
        disableColumnFilter: true,
        renderCell: (params) => (
            <div>
            <IconButton aria-label="delete">
                <EditIcon />
            </IconButton>
            <IconButton aria-label="edit" sx={{color: 'red'}}>
                <DeleteIcon />
            </IconButton>
            </div>
        ),
      },
];
const floor_colunms = [
    { field: 'id', headerName: 'ID', width: 50},
    { field: 'building_name', headerName: 'Building', width: 200},
    {
        field: 'action',
        headerName: 'Action',
        width: 120,
        disableColumnFilter: true,
        renderCell: (params) => (
            <div>
            <IconButton aria-label="delete">
                <EditIcon />
            </IconButton>
            <IconButton aria-label="edit" sx={{color: 'red'}}>
                <DeleteIcon />
            </IconButton>
            </div>
        ),
      },
];
const location_colunms = [
    { field: 'id', headerName: 'ID', width: 50},
    { field: 'building_name', headerName: 'Building', width: 200},
    {
        field: 'action',
        headerName: 'Action',
        width: 120,
        disableColumnFilter: true,
        renderCell: (params) => (
            <div>
            <IconButton aria-label="delete">
                <EditIcon />
            </IconButton>
            <IconButton aria-label="edit" sx={{color: 'red'}}>
                <DeleteIcon />
            </IconButton>
            </div>
        ),
      },
];

function Locations() {
    const rows = [
        {
            "id": 1,
            "building_name": "Tower A"
        },
        {
            "id": 2,
            "building_name": "Tower B"
        }
    ];
    return ( 
        <div className='Locations'>
            <div className='header-table' style={{marginTop: 0, marginBottom: 10}}>
                <Typography variant="h6">
                    Building List
                </Typography>
                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<AddIcon />}
                    >
                        Add
                </Button>
            </div>

            <Box sx={{ height: '300px', width: '100%',  border: 0, borderRadius: '15px', boxShadow: 2, backgroundColor: '#fff'}}>
                <DataGrid
                sx={{border: 0}}
                rows={rows}
                columns={building_colunms}
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
                            // value={age}
                            label="Building"
                            // onChange={handleChange}
                        >
                            <MenuItem value="">
                            <em>None</em>
                            </MenuItem>
                            {currencies.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<AddIcon />}
                    >
                        Add
                </Button>
            </div>
            <Box sx={{ height: '300px', width: '100%',  border: 0, borderRadius: '15px', boxShadow: 2, backgroundColor: '#fff'}}>
                <DataGrid
                sx={{border: 0}}
                rows={rows}
                columns={floor_colunms}
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
                    <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        // value={age}
                        label="Floor"
                        // onChange={handleChange}
                    >
                        <MenuItem value="">
                        <em>None</em>
                        </MenuItem>
                        {currencies.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                    </FormControl>
                </div>
                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<AddIcon />}
                    >
                        Add
                </Button>
            </div>
            <Box sx={{ height: '300px', width: '100%',  border: 0, borderRadius: '15px', boxShadow: 2, backgroundColor: '#fff'}}>
                <DataGrid
                sx={{border: 0}}
                rows={rows}
                columns={location_colunms}
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