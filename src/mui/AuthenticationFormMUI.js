import React, {useState} from 'react'
import AuthenticationCreateNewMUI from './AuthenticationCreateNewMUI';
import AuthenticationLoginMUI from './AuthenticationLoginMUI';
import ClearIcon from '@mui/icons-material/Clear';

import { Box, Button } from "@mui/material";

function AuthenticationFormMUI() {

    const [action, setaction] = useState('')
    
    const changeAction = (e) => {
        setaction(e.target.value)
    }

    //Either returns form to create new account (not secure) or returns form to login to an existing user
    if(action === 'Login'){
        return (
             <Box>
                <Box>
                    <Button value="CreateNew" onClick={(e) => changeAction(e)} variant='contained'  color='secondary' >Create new</Button>
                    <Button value="Login" onClick={(e) => changeAction(e)} variant='contained'  color='secondary' >Login</Button>
                </Box>
                <AuthenticationLoginMUI />
            </Box>
        )
    } else if (action === 'CreateNew') {
        return (
            <Box>
                <Box>
                    <Button value="CreateNew" onClick={(e) => changeAction(e)} variant='contained'  color='secondary' >Create new</Button>
                    <Button value="Login" onClick={(e) => changeAction(e)} variant='contained'  color='secondary' >Login</Button>
                </Box>
                <AuthenticationCreateNewMUI />
            </Box>
        )
    } else {
        return (
            <Box>
                <Button value="CreateNew" onClick={(e) => changeAction(e)} variant='contained'  color='secondary' >Create new</Button>
                <Button value="Login" onClick={(e) => changeAction(e)} variant='contained'  color='secondary' >Login</Button>
            </Box>
        )
        //<Button onClick={ (e) => clearUser(e) } variant='contained'  color='secondary' startIcon={ <ClearIcon /> }>Clear</Button>
    }
    
}

export default AuthenticationFormMUI;