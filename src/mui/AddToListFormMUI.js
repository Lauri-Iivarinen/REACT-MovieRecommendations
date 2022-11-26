import React,{useState} from 'react';
import axios from 'axios';
import { Box, Button, Paper, Rating, TextField, Typography } from '@mui/material';
import { Outlet, useParams } from 'react-router-dom';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import DateFnsUtils from '@date-io/date-fns';
import fiLocale from 'date-fns/locale/fi';

function AddToListFormMUI(props) {
    
    const { id, title, img } = useParams()
    const [status, setStatus] = useState('')
    const [movie, setMovie] = useState({
        id: id,
        title: title,
        watched: new Date(),
        rating: 0.0,
        review: "",
        img: img
    })
    const host = 'http://localhost:8080/'

    const changeDate = (e) => {
        setMovie({
            ...movie,
            watched: e
        })
    }

    const setReview = (e) => {
        setMovie({
            ...movie,
            review: e.target.value
       })
   }

    const setRating = (e) => {
        setMovie({
            ...movie,
            rating: e
        })
    }

    const postMovie = async (e) => {

        const dateStr = movie.watched.getFullYear() + '-' + (movie.watched.getMonth() + 1) + '-' + movie.watched.getDate()

        const postJson = {
            id: movie.id,
            title: movie.title,
            watched: dateStr,
            rating: movie.rating,
            review: movie.review,
            img: movie.img
        }

        try {
            const response = await axios.post(host+ 'movies', postJson)
            console.log(response)
            setMovie({
                id: id,
                title: title,
                watched: '',
                rating: 0.0,
                review: '',
                img: img
            })
            setStatus('success')
        } catch (error) {
            
        }
    }

    return (
        <Box>
            <Paper sx={{ padding: 2, margin: 2, width: '50%' }}>
                <Typography variant='h4'>Add to watch history</Typography>
                <Typography>Movie:</Typography>
                <TextField value={movie.title} required fullWidth></TextField>
                <Typography>Watch date:</Typography>
                {/* DATE */}
                <LocalizationProvider dateAdapter={ AdapterDateFns} utils={ DateFnsUtils }
                    adapterLocale={ fiLocale }>
                    <DatePicker
                    value={ movie.watched }
                    onChange={ (e) => changeDate(e) }
                    renderInput={(params) => <TextField {...params} required fullWidth />}
                    disableMaskedInput />
                </LocalizationProvider>
                <Typography>Rating:</Typography>
                <Rating
                    name="simple-controlled"
                    value={movie.rating}
                    precision={0.5}
                    onChange={(event, e) => {
                        setRating(e);
                    }}
                />
                <Typography>Thoughs on the movie (optional)</Typography>
                <TextField label='Review' onChange={(e) => setReview(e)} value={movie.review} multiline rows={4} required fullWidth></TextField>
                <Button onClick={() => postMovie()}>Submit</Button>
                <Typography>{status}</Typography>
            </Paper>

            <Outlet></Outlet>
        </Box>
    )
}

export default AddToListFormMUI