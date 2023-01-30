import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from './../Sheard/Firebase/useAuth';
import NavigationBar from '../Home/NavigationBar';


const Login = () => {
    const {isLoading,singnInUser, users} = useAuth();
    const [user,setUser] = useState({});
    const navigate = useNavigate();

    const onChangeBlur = e =>{
        const field = e.target.name;
        const value= e.target.value;
        const newUser = {...user};
        newUser[field]=value
        setUser(newUser)
    }

    //login by email and password
    const loginAccount = e =>{
        if(user.email && user.password){
            singnInUser(user.email,user.password);
        }
        getUserToken(user.email)
        e.preventDefault()
        }
    
        // jwt token call here
        const getUserToken = email =>{
            fetch(`https://powerhack.investmentinsights360.com/jwt?email=${email}`)
            .then(res => res.json())
            .then(data =>{
                if(data.accessToken){
                   return navigate("/billing")
                }
                else if(users.email){
                    alert("Already logged in!")
                }
                else{
                    alert("Wrong email or password!")
                }
            })
        }

    
    return (
        <Box>
            <Box>
                <NavigationBar></NavigationBar>
            </Box>
         <Container sx={{zIndex:1}}>
            <Box sx={{py:10}}>
                 
            <Box sx={{width:{md:"50%",xs:"90%"}, padding:{md:"70px 20px",xs:"30px 10px"},boxShadow:" 1px 1px 43px 0px #ebe4e4", margin:"auto"}}>
                 <Typography sx={{pb:2}} variant="h6" gutterBottom component="div">
                         LogIn
                     </Typography>

             { !isLoading &&  <form onSubmit={loginAccount} style={{textAlign:"start"}}>
                    <Typography variant="subtitle1" display="block" gutterBottom>
                    Email
                    </Typography>
                         <input 
                         required
                         style={{width:"96%",padding:"5px"}}
                         id="standard-basic"
                         type="email"  
                         name="email"
                         onBlur={onChangeBlur}
                         label="Email"
                         placeholder="Email"
                        variant="standard" 
                        /> <br /> <br /> 
                        <Typography variant="subtitle1" display="block" gutterBottom>
                         Password
                        </Typography>
                         <input 
                         required
                         style={{width:"96%",padding:"5px"}}
                         id="standard-basic" 
                         type="password" 
                         name="password"
                         onBlur={onChangeBlur}
                         label="Password" 
                         placeholder="Password"
                         variant="standard" 
                         /> <br /> <br /> 
                         
                         <Button sx={{ color:"#fff",
                         width:{md:"100%",xs:1},
                         fontWeight:"bolder",
                         background:"#1b1f1f",
                         "&:hover":{
                             background:"#1b1f1f"
                         }
                         }} type="submit">Login</Button> <br /> <br />

                        <Link style={{textDecoration:"none"}} to={"/reagister"}>
                         <Button sx={{ color:"#fff",
                         width:{md:"100%",xs:1},
                         fontWeight:"bolder",
                         background:"#1b1f1f",
                         "&:hover":{
                             background:"#1b1f1f"
                         }
                         }} type="submit">Reagister</Button> <br /> <br />
                         </Link>
                         
                 </form>
                 }


         </Box>
     </Box>
     </Container>

    </Box>
    );
};

export default Login;