import React, {useState} from 'react'

import { Box, Paper, TextField,Button, Typography } from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import ClearIcon from '@mui/icons-material/Clear';
import { Outlet } from 'react-router-dom';


function AuthenticationCreateNewMUI() {

    //NOT SECURE, only a placeholder
    const [user, setUser] = useState({
        username: '',
        password: '',
        confirmPassword:''
    })

    const [viesti, setViesti] = useState('')

    const updateUser = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
        setViesti('')
    }

    //Security + database handling FOR CREATING NEW --- not part of the project
    const submitUser = (e) => {

        //SUCCESSFULL INPUT
        if (user.password === user.confirmPassword) {
            setViesti('Successfully created a new account.')
            setUser({
                username: '',
                password: '',
                confirmPassword:''
            })
        //FAIL
        } else {
            setViesti('Passwords did not match.')
            setUser({
                ...user,
                password: '',
                confirmPassword:''
            })
        }

        
    }
    
    const clearUser = (e) => {
        setUser({
            username: '',
            password: '',
            confirmPassword:''
        })
        setViesti('')
    }
    
    return (
        <Box>
            <Typography>CREATE NEW ACCOUNT</Typography>
            <Paper>
                <Box component='form' sx={{ '& .MuiTextField-root': { marginBottom: 2 }, padding: 2 }}>
                    <Typography><TextField label='Username' name='username' value={ user.username } onChange={ (e) => updateUser(e) }/></Typography>
                    <Typography><TextField label='Password' name='password' value={user.password} onChange={(e) => updateUser(e)}/></Typography>
                    <Typography><TextField label='Confirm password' name='confirmPassword' value={user.confirmPassword} onChange={(e) => updateUser(e)}/></Typography>
                </Box>
                <Box sx={ {padding: 2} }>
                    <Button onClick={ (e) => submitUser(e) } variant='contained' sx={ {marginRight:3} } startIcon={ <CreateIcon /> }>Submit</Button>
                    <Button onClick={ (e) => clearUser(e) } variant='contained'  color='secondary' startIcon={ <ClearIcon /> }>Clear</Button>
                </Box>
            </Paper>
            <Typography>{viesti}</Typography>
            <Outlet></Outlet>
        </Box>
    )
}

export default AuthenticationCreateNewMUI;