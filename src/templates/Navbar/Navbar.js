import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import axios from "axios";
import { Outlet, Link } from "react-router-dom";
import './Navbar.css';
import {STORAGE_KEY_AUTH} from '../../Config';

import { Button, IconButton, Tooltip  } from "@mui/material";

import Icon from '../../static/image/line-notify-icon.png';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

import { enqueueSnackbar } from 'notistack';


function Navbar({isLoggedIn, onLogout}) {
    const [areHome, setAreHome] = useState(true);
    const navigate = useNavigate();

    const handleOnClick = () => {
        setAreHome(!areHome);
    };
    const handleLogout = () => {
        
        const token = localStorage.getItem(STORAGE_KEY_AUTH);
        console.log('token', token);
        axios.post('/api/logout/',{}, { headers: { Authorization: `Token ${token}`}})
        .then((res) => {
            if(res.status === 200 || res.status === 201 ){
                localStorage.removeItem(STORAGE_KEY_AUTH);
                navigate('/');
                onLogout();
            }
        })
        .catch((err) => {
          console.log(err);

          const variant = 'error';
          enqueueSnackbar( `Error!!! ${err.message}`, { variant });

        })
    
      };
    return ( 
        <>
            <div className="Navbar">
                <div className="header-nav">
                    <div className="title">
                        <img src={Icon} alt="" style={{height: "50px"}}/>
                        <div className="title-text">
                            <h3>SLN</h3>
                            <span>Smart Line Notify</span>
                        </div>
                    </div>
                    <div>
                    {isLoggedIn ? (
                        <Link onClick={handleLogout}>
                            <Button
                                sx={{backgroundColor: 'var(--background-des-text)'}}
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<LogoutIcon />}
                                >
                                Logout
                            </Button>
                        </Link>
                        ):(
                        <Link to='/Login'>
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<AccountCircleIcon />}
                                >
                                Login
                            </Button>
                        </Link>
                        )}
                        {isLoggedIn && (
                            <>
                            {areHome ? (
                            <Tooltip title="Setting">
                                <Link to='/setting' onClick={handleOnClick}>
                                    <IconButton aria-label="delete"  size="large">
                                        <SettingsIcon fontSize="inherit"/>
                                    </IconButton>
                                </Link>
                            </Tooltip>
                            ):(
                            <Tooltip title="Home">
                                <Link to='/' onClick={handleOnClick}>
                                    <IconButton aria-label="delete"  size="large">
                                        <HomeIcon fontSize="inherit"/>
                                    </IconButton>
                                </Link>
                            </Tooltip>
                            )}
                            </>
                        )}
                        
                    </div>
                </div>
            </div>
            <div className="body-content">
                <Outlet />
            </div>
        </>
     );
}

export default Navbar;