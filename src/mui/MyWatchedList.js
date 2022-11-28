import { Box, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton, Paper, Rating, Typography } from "@mui/material";
import React from "react";
import { Outlet} from "react-router-dom";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


//USERS PERSONAL WATCHLIST FOR MOVIES THEY HAVE ALREADY SEEN
function MyWatchedList(props){
    //list of movies in watch history
    const movies = props.movies
    const deleteMovie = props.deleteMovie

    try {
        return (
            <Box>
                <Typography variant='h2' sx={{ marginBottom: 5 }}>Movie history</Typography>
                <Paper>
                    <Grid container spacing={2}>
                    
                        {movies.map(movie => {
                            return (
                                <Grid item key={movie.id}>
                                    <Card sx={{ maxWidth: 300, maxHeight: 1000 }}>
                                        <CardActions>
                                            <IconButton onClick={() => deleteMovie(movie.id)}><DeleteForeverIcon></DeleteForeverIcon></IconButton>
                                        </CardActions>
                                    
                                        <CardMedia component="img" image={"http://image.tmdb.org/t/p/w500/" + movie.img}></CardMedia>
                                        <CardHeader title={movie.title}></CardHeader>
                                        <CardContent>
                                            <Typography>Watched: {movie.watched}</Typography>
                                            <Rating name='read-only' defaultValue={movie.rating} precision={0.5} readOnly></Rating>
                                            {movie.review.length > 0 &&
                                                <Typography>Review:<br />{movie.review}</Typography>

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
    } catch (error) {
        return(<Typography>Error</Typography>)
    }
}

export default MyWatchedList