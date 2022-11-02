import { Box, Button, Card, CardActions, CardHeader, CardMedia, Grid, IconButton, Paper, Typography } from "@mui/material";
import React from "react";
import { Outlet, useParams } from "react-router-dom";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


//USERS PERSONAL WATCHLIST FOR MOVIES THEY HAVE ALREADY SEEN
function MyWatchedList(){
    
    //USER DETAILS (username or id)
    const {user} = useParams()


    //search for movies watched by "user (e) and return list of objects"
    const getMovieListFromUser = (e) =>{
        //TEST RETURN HARD CODED
        return [{
            id: 238,
            title: "The Godfather",
            img:"3bhkrj58Vtu7enYsRolD1fZdja1.jpg"
        },
        {
            id: 278,
            title: "Shawshank Redemption",
            img:"q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg"
        }]
    }

    //VARIABLE USED FOR MAPPING MOVIES ON RETURN
    const movies = getMovieListFromUser()

    return(
        <Box>
            <Typography variant='h2' sx={{marginBottom: 5}}>{user}'s movie history</Typography>
            <Paper>
                <Grid container spacing={2}>
                    
                    {movies.map(movie =>{
                        return(
                            <Grid item key={movie.id}>
                                <Card sx={{maxWidth: 300, height: 700}}>
                                    <CardActions>
                                        <IconButton><DeleteForeverIcon></DeleteForeverIcon></IconButton>
                                    </CardActions>
                                    
                                    <CardMedia component="img" image={"http://image.tmdb.org/t/p/w500/"+movie.img}></CardMedia>
                                    <CardHeader title={movie.title}></CardHeader>
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

export default MyWatchedList