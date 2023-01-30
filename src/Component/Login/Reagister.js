import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import NavigationBar from './../Home/NavigationBar';
import useAuth from './../Sheard/Firebase/useAuth';

const Reagister = () => {
    const {registerUser,isLoading} = useAuth();
    const [user,setUser] = useState({});
    const navigate = useNavigate();
    const onChangeBlur = e =>{
        const field = e.target.name;
        const value= e.target.value;
        const newUser = {...user};
        newUser[field]=value
        setUser(newUser)
    }

    // reagister account and upload data on database
    const reagisterAccount = e =>{
        if(user.password !== user.password2){
            alert("Password don't match")
            return
        }
        else{
            registerUser(user.email,user.password,user.name);
            fetch("https://powerhack.investmentinsights360.com/api/registration",{
                method:"POST",
                headers:{
                "content-type":"application/json"
                },
                body: JSON.stringify(user)
            })
            .then(res => res.json())
            .then(data=>{
                if(data.insertedId){
                    alert("Reagister Successfully!")
                    getUserToken(user.email)
                setInterval(() => {
                }, 18000);
                }
            })  
        }
        
        e.preventDefault()
    }

    
    //jwt token call here for authentication
    const getUserToken = email =>{
        fetch(`https://powerhack.investmentinsights360.com/jwt?email=${email}`)
        .then(res => res.json())
        .then(data =>{
            if(data.accessToken){
                localStorage.setItem('accessToken',data.accessToken)
                navigate("/billing");
            }
            else{
                alert("Wrong Email or password!")
            }
        })
    }

    return (
       <Box>
           <Box sx={{backgroundColor:"#24262f",position:'sticky',top:0,zIndex:10}}>
                <NavigationBar></NavigationBar>
          </Box>
            <Container sx={{zIndex:1}}>
        <Box sx={{py:10}}>
                    
            <Box  sx={{width:{md:"50%",xs:"90%"}, padding:{md:"70px 20px",xs:"30px 10px"}, boxShadow:" 1px 1px 43px 0px #ebe4e4", margin:"auto"}}>
                    <Typography sx={{pb:2}} variant="h6" gutterBottom component="div">
                            Register
                        </Typography>

                { !isLoading &&  <form >
                            
                            <TextField 
                            sx={{width:{md:"75%",xs:1}}}
                            id="standard-basic"
                            type="text"  
                            name="name"
                            onBlur={onChangeBlur}
                            label="name"
                                variant="standard" 
                                /> <br /> <br /> 
                            <TextField 
                            sx={{width:{md:"75%",xs:1}}}
                            id="standard-basic"
                            type="Email"  
                            name="email"
                            onBlur={onChangeBlur}
                            label="Email"
                                variant="standard" 
                                /> <br /> <br /> 
                            <TextField 
                            sx={{width:{md:"75%",xs:1}}} id="standard-basic" 
                            type="password" 
                            name="password"
                            onBlur={onChangeBlur}
                            label="Password" 
                            variant="standard" 
                            /> <br /> <br /> 
                            <TextField 
                            sx={{width:{md:"75%",xs:1}}} id="standard-basic" 
                            type="password" 
                            name="password2"
                            onBlur={onChangeBlur}
                            label="Re-type Password" 
                            variant="standard" 
                            /> <br /> <br /> <br />
                            <Button sx={{ color:"#fff",
                            width:{md:"75%",xs:1},
                            fontWeight:"bolder",
                            background:"#1b1f1f",
                            "&:hover":{
                             background:"#1b1f1f"
                            }
                            }}  onClick={()=>reagisterAccount()}>Reagister</Button> <br /> <br />
                            
                            <Link style={{textDecoration:"none"}} to={"/login"}>
                                <Button sx={{
                                width:{md:"75%",xs:1},
                                fontWeight:"bolder",
                                color:"#fff",
                                background:"#1b1f1f",
                                "&:hover":{
                                background:"#1b1f1f"
                                }}} variant="text">Already Registered? Please Login</Button>
                            </Link>
                    </form>
                    

                }
                
            </Box>
        </Box>
        </Container>
       </Box>
    );
};

export default Reagister;