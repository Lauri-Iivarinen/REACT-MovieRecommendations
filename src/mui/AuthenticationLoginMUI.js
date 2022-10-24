import React, { useState } from 'react'
import { Box, Paper, TextField,Button,Typography } from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import ClearIcon from '@mui/icons-material/Clear';

function AuthenticationLoginMUI() {
    //NOT SECURE, only a placeholder
    const [user, setUser] = useState({
        username: '',
        password: '',
    })

    const updateUser = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    } 

    //Security + database handling for LOGGING IN --- not part of the project
    const submitUser = (e) => {
        setUser({
            username: '',
            password: '',
        })
    }
    
    const clearUser = (e) => {
        setUser({
            username: '',
            password: '',
        })
    } 
    return (
        /*
        <TextField label='Paikka' name='paikka' value={ matka.paikka } 
        onChange={ (e) => muuta(e) } required fullWidth />
        */
        <Box>
            <Typography>Login</Typography>
            <Paper>
                <Box component='form' sx={{ '& .MuiTextField-root': { marginBottom: 2 }, padding: 2 }}>
                     <Typography><TextField label='Username' name='username' value={ user.username } onChange={ (e) => updateUser(e) }/></Typography>
                    <Typography><TextField label='Password' name='password' value={user.password} onChange={(e) => updateUser(e)}/></Typography>
                </Box>
                <Box sx={ {textAlign: 'center'} }>
                    <Button onClick={ (e) => submitUser(e) } variant='contained' sx={ {marginRight:3} } startIcon={ <CreateIcon /> }>Submit</Button>
                    <Button onClick={ (e) => clearUser(e) } variant='contained'  color='secondary' startIcon={ <ClearIcon /> }>Clear</Button>
                </Box>
            </Paper> 
        </Box>
    )
}

export default AuthenticationLoginMUI;