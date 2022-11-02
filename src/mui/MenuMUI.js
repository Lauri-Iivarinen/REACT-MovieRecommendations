import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/Button';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import CreateIcon from '@mui/icons-material/Create';
import ListIcon from '@mui/icons-material/List';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, Outlet } from 'react-router-dom';
import { AppBar, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';

function MenuMUI(){

    const [open,setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    return(
        <Box>
            <AppBar position='float'>
            <IconButton onMouseEnter={ handleOpen }><MenuIcon color='secondary' sx={{fontSize:40}}></MenuIcon></IconButton>
            <Drawer anchor='top' open={ open } onClick={ handleClose }>
                <Grid container spacing={4} sx={{padding:2}}>
                    <Grid item>
                        <Card sx={{maxWidth: 200}}>
                            <CardActions>
                                <ListItemButton component={Link} to='/'>
                                    <ListItemIcon><CreateIcon /></ListItemIcon>
                                    <ListItemText primary='Etusivu' />
                                </ListItemButton>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item>
                        <Card sx={{maxWidth: 200}}>
                            <CardActions>
                                <ListItemButton component={Link} to='listaa'>
                                    <ListItemIcon><ListIcon /></ListItemIcon>
                                    <ListItemText primary='Listaa' />
                                </ListItemButton>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Drawer>
            </AppBar>
            <Outlet></Outlet>
        </Box>
    )

}

export default MenuMUI;