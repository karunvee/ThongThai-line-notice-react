import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


import './LoginPage.css';
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, Typography } from '@mui/material';

import {STORAGE_KEY_AUTH} from '../../Config';

function LoginPage({isLoggedIn, onLogin}) {
    const [open, setOpen] = useState(true);
    const [btnLogin, setBtnLogin] = useState(true);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        setBtnLogin(false)
        try {
            await handleLogin(username, password); //the authenticate function

            setBtnLogin(true)
        } catch {
            setError('Invalid username or password');
        }
    };

    const handleClose = () => {
        setOpen(false);
        navigate('/');
    };

    useEffect(() => {
        if(isLoggedIn){
            navigate('/');
        }
    
    }, [isLoggedIn, navigate]);

      const handleLogin = async (username, password) => {
        await axios.post('/api/login/', 
          { 
            username: username, 
            password: password,
          }
        )
        .then((res) => {
            if(res.status === 200 || res.status === 201 ){
                console.log("res.data.token", res.data.token);
                localStorage.setItem(STORAGE_KEY_AUTH, res.data.token);
                onLogin(true, "admin");
                navigate('/');
            }
            else{
              // Password is incorrect!
              setError('Invalid username or password');
            }
        })
        .catch((err) => {
          console.log(err);
          setError('Invalid username or password');
        })
    
      };

    const login_container = (
        <form onSubmit={handleSubmit}>
            <DialogTitle sx={{marginTop: "20px"}}>
                <div>
                <Typography variant="h4">Log in</Typography>
                <Typography variant="subtitle1" gutterBottom>Welcome to Smart Line Notify web application</Typography>
                </div>
            </DialogTitle>
            <DialogContent>
                <Stack  spacing={2}>
                    <Typography variant="overline" display="block" gutterBottom>
                    Login
                    </Typography>
                    <TextField onChange={(e) => setUsername(e.target.value)} 
                        label="Username"
                        id="outlined-basic"
                        value={username}
                        variant="outlined"
                    />
                    <TextField onChange={(e) => setPassword(e.target.value)} 
                        label="Password"
                        id="outlined-basic"
                        value={password}
                        variant="outlined"
                        type="password"
                        autoComplete="current-password"
                    />
                    {error !== '' ? (
                        <span style={{margin: "5px 0 0 0", fontSize: "12px", color: "red"}}>{error}</span>
                    ):
                    (<hr style={{border: 0}}/>)}
                </Stack>
            
                <DialogActions>
                    <Stack direction="row" spacing={2}>
                        {/* <Button onClick={handleClose} variant="text">Back</Button> */}
                        {btnLogin ? (
                            <>
                            <Button variant="text" onClick={handleClose}
                            sx={{padding: "10px 30px"}}>Back</Button>
                            <Button type="submit" variant="contained" 
                            sx={{padding: "10px 30px"}}>Login</Button>
                            </>
                        ):(
                            <CircularProgress />
                        )}
                    </Stack>
                </DialogActions>
            </DialogContent>
        </form>
    );

    return (
        <Dialog
            open={open} 
            onClose={handleClose}
            fullWidth
            maxWidth="xs" 
            >
            <div className="LoginPage">
                <div id='login-normal'>
                    {login_container}
                </div>
            </div>
        </Dialog>
      );
}

export default LoginPage;
