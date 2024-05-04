import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import axios from "axios";
import { Outlet, Link } from "react-router-dom";
import './Navbar.css';
import {STORAGE_KEY_AUTH, BASE_URL} from '../../Config';

import { TextField, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, IconButton, Tooltip  } from "@mui/material";

import Icon from '../../static/image/line-notify-icon.png';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

import { enqueueSnackbar } from 'notistack';


function Navbar({isLoggedIn, onLogout}) {
    const [ load, setLoad ] = useState(false);
    const [areHome, setAreHome] = useState(true);
    const navigate = useNavigate();

    const [openDialogSetUrl, setOpenDialogSetUrl] = useState(false);
    const [urlServer, setUrlServer] = useState('');
    
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
                setAreHome(true);
                navigate('/');
                onLogout();
            }
        })
        .catch((err) => {
            console.log(err);

            // const variant = 'error';
            // enqueueSnackbar( `Error!!! ${err.message}`, { variant });
            localStorage.removeItem(STORAGE_KEY_AUTH);
            navigate('/');
            onLogout();
        })
    
      };
    const handleCloseDialogSetUrl = () => {
        setOpenDialogSetUrl(false);
    }
    const handleSummitDialogSetUrl = (e) => {
        e.preventDefault();
        localStorage.setItem(BASE_URL, `http://${urlServer}:8070`);
        handleCloseDialogSetUrl();
    }
    useEffect(() => {
        if(!load){
            let url = localStorage.getItem(BASE_URL);
            console.log('url', url);
            if(url){
                let _url = url.slice(7).split(':')[0];
                setUrlServer(_url);
                console.log('_url', _url);
            }
            setLoad(true);
            if(window.location.pathname === '/setting'){
                setAreHome(false);
            }
        }
    }, [load])
    const DialogSetUrlServer = (
        <React.Fragment>
        <Button sx={{marginRight: "5px"}}
            component="label"
            variant="text"
            onClick={() => setOpenDialogSetUrl(true)}
            >
            
        </Button>
        <Dialog
          open={openDialogSetUrl}
          onClose={handleCloseDialogSetUrl}
          PaperProps={{
            component: 'form',
            onSubmit: (event) => handleSummitDialogSetUrl(event),
          }}
        >
          <DialogTitle>URL Server</DialogTitle>
          <DialogContent>
            <DialogContentText>
              URL ปัจจุบันคือ {urlServer}
            </DialogContentText>
            <TextField
                autoFocus
                required
                margin="dense"
                id="urlServer"
                name="urlServer"
                label="URL Server"
                value={urlServer}
                fullWidth
                variant="standard"
                onChange={(e) => setUrlServer(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialogSetUrl}>Cancel</Button>
            <Button type="submit" variant="contained" >Save</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    )
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
                                sx={{color: 'var(--background-des-text)'}}
                                component="label"
                                role={undefined}
                                variant="text"
                                tabIndex={-1}
                                startIcon={<LogoutIcon />}
                                >
                                Logout
                            </Button>
                        </Link>
                        ):(
                        <>
                        {DialogSetUrlServer}
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
                        </>
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