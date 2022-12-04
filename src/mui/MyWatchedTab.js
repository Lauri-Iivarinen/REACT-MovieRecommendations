import { AppBar, Box, Tab, Tabs, Toolbar, Typography,CircularProgress, Snackbar } from "@mui/material";
import React, { useState,useEffect } from "react"
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import GradeIcon from '@mui/icons-material/Grade';
import MyWatchedList from "./MyWatchedList";
import { Outlet } from "react-router-dom";
import axios from "axios";
import PreferenceDetails from "./PreferenceDetails";

function MyWatchedTab(props) {
    
    const genres = props.genres
    //tab handlers
    const [tabNumber, setTabNumber] = useState(0)
    const changeTab = (e, val) => {
        setTabNumber(val)
    }

    const [deleted, setDeteled] = useState(false)

    const handleClose = () => {
        setDeteled(false)
    }

    //connection status
    const [status, setStatus] = useState('waiting...')
    //list of movies in watch history
    const [movies, setMovies] = useState([])

    //can be changed easily
    const local = 'http://localhost:8080/'
    const server = 'https://movierecommendations-rest.herokuapp.com/'
    const host = server


    //search for movies watched by "user (e) and return list of objects"
    const getMovieListFromUser = async () => {
        try {
            const json = await axios.get(host + 'movies')
            setMovies(json.data)
            setStatus('')
        } catch (error) {
            setStatus('error')
        }
    }

    useEffect(() => {
        getMovieListFromUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
        //TODO add message to confirm deletion/handle error
    const deleteMovie = async (e) => {
        const body = { id: e }
        try {
            await axios.post('http://localhost:8080/delete', body)
            getMovieListFromUser()
            setDeteled(true)
        } catch (error) {
            
        }
    }

    if (status.length > 0) {
        return (
            <Box sx={{fisplay: 'flex', justifyContent: 'center'}}>
                <CircularProgress></CircularProgress>
                <Typography>{status}</Typography>
            </Box>
        )
    } else {
        return (
            <Box >
                <AppBar color="secondary" position="sticky">
                    <Toolbar>
                        <Tabs value={tabNumber} onChange={changeTab} sx={{ flexGrow: 1, textAling: 'center' }} textColor='primary' centered variant='fullWidth'>
                            <Tab label="My History" icon={<AutoStoriesIcon color="primary"></AutoStoriesIcon>}></Tab>
                            <Tab label="Statistics" icon={<GradeIcon color="primary"></GradeIcon>}></Tab>
                        </Tabs>
                    </Toolbar>
                </AppBar>
                {tabNumber === 0 && <MyWatchedList deleteMovie={(e) => deleteMovie(e)} movies={movies}></MyWatchedList>}
                {tabNumber === 1 && <PreferenceDetails movies={movies} genres={genres}></PreferenceDetails>}
                <Snackbar
                    color="primary"
                    open={deleted}
                    autoHideDuration={4000}
                    onClose={handleClose}
                    message="Movie deleted!"
                />
                <Outlet></Outlet>
            </Box>
        )
    }
}

export default MyWatchedTab;