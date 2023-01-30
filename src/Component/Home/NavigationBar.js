import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import useAuth from './../Sheard/Firebase/useAuth';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  const {users,logOut} = useAuth();
    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar sx={{bgcolor:"#1b1f1f"}} position="static">
          <Toolbar sx={{display:'flex',justifyContent:"space-around"}}>
            <Box>
              {
                users?.email?  <Link style={{textDecoration:"none",color:"#fff"}} to={"/login"}><Button sx={{color:"#fff",fontSize:"20px"}} onClick={()=>logOut()} color="inherit">Log Out</Button> </Link>: <Link style={{textDecoration:"none",color:"#fff"}} to={"/login"}><Button sx={{color:"#fff",fontSize:"20px"}} color="inherit">Login</Button></Link> 
              }
            </Box>
            <Box>
              {
                users?.email?<Link style={{textDecoration:"none"}} to={"/billing"}>
                <Button sx={{color:"#fff",fontSize:"20px"}} color="inherit">Bulling</Button>
              </Link>:<Link style={{textDecoration:"none"}} to={"/login"}>
                <Button sx={{color:"#fff",fontSize:"20px"}} color="inherit">Bulling</Button>
              </Link>
              }
            </Box>
            
          </Toolbar>
        </AppBar>
      </Box>
    );
};

export default NavigationBar;