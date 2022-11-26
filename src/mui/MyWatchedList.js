import { Box, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton, Paper, Rating, Typography } from "@mui/material";
import React,{useState,useEffect} from "react";
import { Outlet} from "react-router-dom";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import axios from 'axios';


//USERS PERSONAL WATCHLIST FOR MOVIES THEY HAVE ALREADY SEEN
function MyWatchedList(){

    const [status,setStatus] = useState('waiting...')
    const [movies, setMovies] = useState([])
    const host = 'http://localhost:8080/'


    //search for movies watched by "user (e) and return list of objects"
    const getMovieListFromUser = async () => {
        
        try{
            const json = await axios.get(host + 'movies')
            setMovies(json.data)
            setStatus('')
        } catch (error) {
            setStatus('error')
        }

    }
    useEffect(() => { getMovieListFromUser() }, [])
    
    const deleteMovie = async (e) => {
        const body = { id: e }
        try {
            await axios.post('http://localhost:8080/delete', body)
            getMovieListFromUser()
        } catch (error) {
            
        }
    }

    //VARIABLE USED FOR MAPPING MOVIES ON RETURN
    //const movies = getMovieListFromUser()
    if (status.length > 0) {
        return (
            <Typography>{status}</Typography>
        )
    } else {
        return (
            <Box>
                <Typography variant='h2' sx={{ marginBottom: 5 }}>Movie history</Typography>
                <Paper>
                    <Grid container spacing={2}>
                    
                        {movies.map(movie => {
                            return (
                                <Grid item key={movie.id}>
                                    <Card sx={{ maxWidth: 300, height: 700 }}>
                                        <CardActions>
                                            <IconButton onClick={() => deleteMovie(movie.id)}><DeleteForeverIcon></DeleteForeverIcon></IconButton>
                                        </CardActions>
                                    
                                        <CardMedia component="img" image={"http://image.tmdb.org/t/p/w500/" + movie.img}></CardMedia>
                                        <CardHeader title={movie.title}></CardHeader>
                                        <CardContent>
                                            <Typography>Watched: {movie.watched}</Typography>
                                            <Rating name='read-only' defaultValue={movie.rating} precision={0.5} readOnly></Rating>
                                            {movie.review.length > 0 &&
                                                <Typography>Thoughts:<br />{movie.review}</Typography>
                                            }
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )
                        })}
                    
                    </Grid>
                </Paper>
                <Outlet></Outlet>
            </Box>
        )
    }

}

export default MyWatchedList