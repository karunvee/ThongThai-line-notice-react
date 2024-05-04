import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


import './LoginPage.css';
import { Button, CircularProgress, Dialog, DialogActions, 
    DialogContent, DialogTitle, Stack, TextField, Typography,
    FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton} from '@mui/material';

import {STORAGE_KEY_AUTH, BASE_URL} from '../../Config';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function LoginPage({isLoggedIn, onLogin}) {
    const [open, setOpen] = useState(true);
    const [btnLogin, setBtnLogin] = useState(true);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

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
        const url = localStorage.getItem(BASE_URL);
        await axios.post(`${url}/api/login/` , 
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
                window.location.reload();
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
                <Typography variant="h4">ลงชื่อเข้าใช้</Typography>
                <Typography variant="subtitle1" gutterBottom>ยินดีต้อนรับสู่ Smart Line Notify</Typography>
                </div>
            </DialogTitle>
            <DialogContent>
                <Stack  spacing={2}>
                    <Typography variant="overline" display="block" gutterBottom>
                    ลงชื่อเข้าใช้งาน
                    </Typography>
                    <TextField onChange={(e) => setUsername(e.target.value)} 
                        label="Username"
                        id="outlined-basic"
                        value={username}
                        variant="outlined"
                    />
                    {/* <TextField onChange={(e) => setPassword(e.target.value)} 
                        label="Password"
                        id="outlined-basic"
                        value={password}
                        variant="outlined"
                        type="password"
                        autoComplete="current-password"
                    /> */}
                    <FormControl  variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            value={password} onChange={(e) => setPassword(e.target.value)} 
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
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
                            sx={{padding: "10px 30px"}}>กลับ</Button>
                            <Button type="submit" variant="contained" 
                            sx={{padding: "10px 30px"}}>ลงชื่อ</Button>
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
