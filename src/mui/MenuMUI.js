import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/Button';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListIcon from '@mui/icons-material/List';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, Outlet} from 'react-router-dom';
import { AppBar, Card, CardActions, Grid} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import TheatersIcon from '@mui/icons-material/Theaters';

//Menu tab/function used in every page, needs work
function MenuMUI() {
    
    //IF true, menubar will open
    const [open,setOpen] = useState(false);
    //opening and closing
    const handleOpen = () => { setOpen(true)}
    const handleClose = () => { setOpen(false) }

    return(
        <Box>
            <AppBar position='sticky'>
            <IconButton onClick={ handleOpen }><MenuIcon color='secondary' sx={{fontSize:40}}></MenuIcon></IconButton>
            <Drawer anchor='top' open={ open } onClick={ handleClose }>
                <Grid container spacing={4} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 2}}>
                    <Grid item>
                        <Card sx={{maxWidth: 200}}>
                            <CardActions>
                                <ListItemButton component={Link} to='home'>
                                    <ListItemIcon><HomeIcon color='primary' /></ListItemIcon>
                                    <ListItemText primary='Home' />
                                </ListItemButton>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item>
                        <Card sx={{maxWidth: 200}}>
                            <CardActions>
                                <ListItemButton component={Link} to='list'>
                                    <ListItemIcon><ListIcon color='primary' /></ListItemIcon>
                                    <ListItemText primary='Browse' />
                                </ListItemButton>
                            </CardActions>
                        </Card>
                        </Grid>
                        <Grid item>
                        <Card sx={{maxWidth: 200}}>
                            <CardActions>
                                <ListItemButton component={Link} to="home/watchlist">
                                    <ListItemIcon><TheatersIcon color="primary"></TheatersIcon></ListItemIcon>
                                    <ListItemText primary='My history' />
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