import { Box, Card, CardActions, CardContent, CardHeader, CardMedia, Chip, Dialog, DialogContent, DialogTitle, Grid, IconButton, Paper, Rating, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Outlet} from "react-router-dom";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ReviewsIcon from '@mui/icons-material/Reviews';
import EditIcon from '@mui/icons-material/Edit';


//USERS PERSONAL WATCHLIST FOR MOVIES THEY HAVE ALREADY SEEN
function MyWatchedList(props){
    //list of movies in watch history
    const [movies, setMovies] = useState([])//.sort((a, b) => a.rating - b.rating)
    const deleteMovie = props.deleteMovie //function for deleting movie
    const [open, setOpen] = useState(false) //dialog/popup window handler
    const [dialogReview, setDialogReview] = useState('') //review thats displayed in popup
    const [dateButton, setDateButton] = useState('filled') //sorting button
    const [ratingButton, setRatingButton] = useState('outlined') //sorting button

    //change sql date to Date class
    const correctDate = (movies) => {
        try {
            movies.forEach(movie => {
                let dateArr = movie.watched.split('-').map(Number)
                let date = new Date()
                date.setFullYear(dateArr[0])
                date.setMonth(dateArr[1]-1)
                date.setDate(dateArr[2])
                movie.watched = date
            })
        } catch (error) {
            
        }
        
        return movies
    }

    useEffect(() => {
        setMovies(correctDate(props.movies))
        // eslint-disable-next-line 
    }, [props.movies]) //re-renders page if movie is deleted

    //Handle popup windon for full review
    const handleOpen = (e) => {
        setDialogReview(e) //sets the correct review
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    //limit review length for card preview
    const getReview = (e) => {
        if (e.length >= 55) return e.substring(0,55) + '...'
        return e
    }
    
    //Sorting buttons - Date / Rating
    const activateDate = () => {
        if (dateButton === 'filled') return
        setDateButton('filled')
        setRatingButton('outlined')
        setMovies(movies.sort((a,b) => b.watched - a.watched))
    }
    const activateRating = () => {
        if (ratingButton === 'filled') return
        setDateButton('outlined')
        setRatingButton('filled')
        setMovies(movies.sort((a, b) => b.rating - a.rating))
    }

    try {
        return (
            <Box>
                <Typography variant='h2' sx={{textAlign: 'center', marginTop: 3 }}>Movie history</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Dialog open={open} onClick={() => handleClose()}>
                    <DialogTitle>Review:</DialogTitle>
                    <DialogContent>
                            <Typography>{dialogReview}</Typography>
                    </DialogContent>
                </Dialog>
                    <Paper sx={{ padding: 5, margin: 4 }}>
                        <Typography sx={{float: 'left',marginTop: 0.5,marginRight: 1}}>Sort:</Typography>
                        <Chip label="Date" variant={dateButton} onClick={() => activateDate()}/>
                        <Chip label="Rating" variant={ratingButton} onClick={() => activateRating()}/>
                    <Grid container spacing={2}>
                    
                        {movies.map(movie => {
                            let review = getReview(movie.review)
                            //addtolist/:id/:title/:img/:genres/:watched:/:rating/:review
                            return (
                                <Grid item key={movie.id}>

                                    <Card sx={{ maxWidth: 200, maxHeight: 1000 }}>
                                        <CardActions>
                                            <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                                            <IconButton sx={{ width: '20%'}} onClick={() => deleteMovie(movie.id)}><DeleteForeverIcon></DeleteForeverIcon></IconButton>
                                                <IconButton sx={{ width: '20%', marginLeft: '20%', marginRight: '20%' }} variant='link' href={'/addtolist/' + movie.id +
                                                    '/' + movie.title + '/' + movie.img + '/' + movie.genres + '/' + movie.watched.getFullYear() + '/' + movie.watched.getMonth() + '/' + movie.watched.getDate() + '/' + movie.rating + '/' + movie.review}><EditIcon></EditIcon></IconButton>
                                            <IconButton sx={{ width: '20%'}} onClick={() => handleOpen(movie.review)}><ReviewsIcon></ReviewsIcon></IconButton>
                                            </Box>
                                        </CardActions>
                                    
                                        <CardMedia component="img" image={"http://image.tmdb.org/t/p/w500/" + movie.img}></CardMedia>
                                        <Box sx={{height: 120}}>
                                            <CardHeader title={movie.title}></CardHeader>
                                        </Box>
                                        <CardContent>
                                            <Typography>Watched: {movie.watched.getDate() + '.' + (movie.watched.getMonth()+1) + '.' + movie.watched.getFullYear()}</Typography>
                                            <Rating name='read-only' defaultValue={movie.rating} precision={0.5} readOnly></Rating>
                                            <Box sx={{height: 100}}>
                                            {movie.review.length > 0 &&
                                                <Typography>Review:<br />{review}</Typography>

                                            }
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )
                        })}
                    
                    </Grid>
                    </Paper>
                    </Box>
                <Outlet></Outlet>
            </Box>
        )
    } catch (error) {
        return(<Typography>Error</Typography>)
    }
}

export default MyWatchedList