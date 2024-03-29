import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SettingPage.css';
import axios from 'axios';

import { STORAGE_KEY_AUTH } from '../../Config';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import ActivityRecord from './Pages/ActivityRecord';
import DeviceManage from './Pages/DeviceManage';
import Messages from './Pages/Messages';
import Locations from './Pages/Locations';

import {STORAGE_KEY_LOCATION} from '../../Config';


function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            {children}
          </Box>
        )}
      </div>
    );
  }
  
  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

function SettingPage() {
    const navigate = useNavigate();

    const [location, setLocation] = useState(false);
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
      const location_local = localStorage.getItem(STORAGE_KEY_LOCATION);
      setLocation(!!location_local);
      if(localStorage.getItem(STORAGE_KEY_AUTH)){
        axios.get('/api/check_authentication/', { headers: {Authorization: `Token ${localStorage.getItem(STORAGE_KEY_AUTH)}`}} )
        .then((res) => {
          console.log(res.data.detail);
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem(STORAGE_KEY_AUTH);
          navigate('/login');
        })
      }
      
    }, [])
    return ( 
        <div className="SettingPage">
            {/* <h4>Setting Page</h4> */}
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} variant="scrollable" onChange={handleChange} aria-label="basic tabs example">
                    {/* <Tab label="Activity Record" {...a11yProps(0)} /> */}
                    <Tab label="อุปกรณ์" {...a11yProps(0)} />
                    {location && (
                    <Tab label="ข้อความ" {...a11yProps(1)} />
                    )}
                    <Tab label="สถานที่" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                {/* <CustomTabPanel value={value} index={0}>
                    <ActivityRecord/>
                </CustomTabPanel> */}
                <CustomTabPanel value={value} index={0}>
                    <DeviceManage/>
                </CustomTabPanel>
                {location && (
                  <CustomTabPanel value={value} index={1}>
                    <Messages/>
                  </CustomTabPanel>
                    )}
                <CustomTabPanel value={value} index={2}>
                    <Locations/>
                </CustomTabPanel>
            </Box>
        </div>
     );
}

export default SettingPage;