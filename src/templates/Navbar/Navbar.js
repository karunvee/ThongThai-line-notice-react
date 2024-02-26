import React, { useState } from "react";

import { Outlet, Link } from "react-router-dom";
import './Navbar.css';

import { Button, IconButton, Tooltip  } from "@mui/material";

import Icon from '../../static/image/line-notify-icon.png';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Navbar() {
    const [areHome, setAreHome] = useState(true);

    const handleOnClick = () => {
        setAreHome(!areHome);
    };

    return ( 
        <>
            <div className="Navbar">
                <div className="header-nav">
                    <div className="title">
                        <img src={Icon} alt="" style={{height: "50px"}}/>
                        <div className="title-text">
                            <h3>SLN</h3>
                            <span>Smart Line Notification</span>
                        </div>
                    </div>
                    <div>
                        <Tooltip title="Click to Login">
                            <Link to='/Login' onClick={handleOnClick}>
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
                        </Tooltip>

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