import { Button, Card, CardActions, CardContent, CardHeader, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link, Outlet } from 'react-router-dom';

//frontpage of the website, aivailable for all users
function IndexMUI (){
    return(
        <Box>
            <Typography sx={{marginLeft: 5, marginTop: 2}}>INDEX PAGE</Typography>
                <Card sx={ { maxWidth: 300, margin: 5 } }>
                    <CardHeader title='Authenticate:'></CardHeader>
                    
                    <CardActions>
                        <Button component={Link} to='signup'> Create new</Button>
                        <Button component={Link} to='login'> Login</Button>
                    </CardActions>
                </Card>
            <Outlet></Outlet>
        </Box>
    )
}

export default IndexMUI