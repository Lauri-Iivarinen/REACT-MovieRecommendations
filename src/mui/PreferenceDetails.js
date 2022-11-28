import { Box, Grid, Paper, Rating, Typography } from '@mui/material';
import React from 'react';
import { Chart } from "react-google-charts";

//Display preferences based on watch history
function PreferenceDetails(props) {
    
    const movies = props.movies //watch history
    const genreObject = props.genres //hard coded genre array
    const genres = []

    //form array from all genres of a movie
    const formArray = (str) => {
        let array = str.split(',')
        //add all arrays to 'genres' array
        array.forEach(genre => {
            genres.push(genre)
        })
    }

    //Map trough all movies in watchlist
    movies.forEach(movie => {
        formArray(movie.genres)
    })

    //map this to create chart
    const genresFactored = [{}]

    //go trough all genres and compare to watch history
    genreObject.forEach(object => {
        let count = 0
        genres.forEach(genre => {
            if (object.id === parseInt(genre)) count++
        })
        if (count > 0) {
            genresFactored.push({
                genre: object.name,
                count: count
            })
        }
        
    })


    //GENERATE PIE CHART
    const options = {
        title: "Genre distribution",
    };
    // [info,value]
    const data = [
        ["Task","Genres"]
    ]

    genresFactored.forEach(genre => {
        data.push([genre.genre,genre.count])
    })
    //pie chart end

    //get average rating of all movies
    const calulateAvg = (e) => {
        let sum = 0
        let count = 0
        e.forEach(movie => {
            count++
            sum += movie.rating
        })
        return sum/count
    }

    const average = calulateAvg(movies)


    return (
        <Box>
            <Grid container spacing={2} sx={{width: "100%", margin: "2%"}}>
                <Grid item sx={{ width: "48%"}}>
                    <Paper sx={{height: 500}}>
                        <Chart
                            chartType="PieChart"
                            data={data}
                            options={options}
                            width={"100%"}
                            height={"400px"}
                        />
                    </Paper>
                </Grid>
                <Grid item sx={{ width: "48%"}}>
                    <Paper sx={{ height: 500, textAlign: "center",paddingTop: 20}}>
                        <Typography>Average rating:</Typography>
                        <Rating size="large" value={average} precision={0.1} readOnly></Rating>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    )
}

export default PreferenceDetails;