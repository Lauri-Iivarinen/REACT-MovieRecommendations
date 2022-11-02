import { AppBar, Box, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react"
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import FetchMoviesMUI from "./FetchMoviesMUI";


 
function TabMUI(props) {
    
    const [tabNumber, setTabNumber] = useState(0)

    const changeTab = (e, val) => {
        setTabNumber(val)
    }


    /*
    return (
        <Box >
            <AppBar position="float">
            <Toolbar>
                <Tabs indicatorColor="secondary" value={tabNumber} onChange={changeTab} sx={{flexGrow: 1, textAling: 'center'}} textColor='inherit' centered variant='fullWidth'>
                        <Tab label="Movie List" icon={<LocalMoviesIcon></LocalMoviesIcon>}></Tab>
                        <Tab label="Authentication" icon={<VpnKeyIcon></VpnKeyIcon>}></Tab>
                        {//<Tab label="Käyttäjätiedot" icon={<PersonIcon></PersonIcon>}></Tab>
                        }
                        {//<Tab label="Opintosuunnat" icon={<SchoolIcon></SchoolIcon>}></Tab>
                        }
                        {//<Tab label="Menu" icon={<MenuIcon></MenuIcon>}></Tab>
                        }
                </Tabs>
            </Toolbar>
        </AppBar>
            {tabNumber === 0 && <FetchMoviesMUI genres={props.genres}></FetchMoviesMUI>}
            {tabNumber === 1 && <AuthenticationFormMui></AuthenticationFormMui>}
            {//tabNumber === 2 && <Fetch1></Fetch1>
            }
            {//tabNumber === 3 && <Teht1MUI kuvat={props.data}></Teht1MUI>
            }
            {//tabNumber === 4 && <Menu2MUI></Menu2MUI>
            }
        </Box>
    )
    */
   return(
    <Typography></Typography>
   )
}

export default TabMUI;