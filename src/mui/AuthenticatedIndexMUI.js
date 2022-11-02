import React from "react";
import { Box, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";


function AuthenticatedIndexMUI (){

    const fetchUrl = async =>{
        
    }

    return(
        <Box>
            <Typography>Welcome user</Typography>
            <Outlet></Outlet>
        </Box>
    )
}

export default AuthenticatedIndexMUI