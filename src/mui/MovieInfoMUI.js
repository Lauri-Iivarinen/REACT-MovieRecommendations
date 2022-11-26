import { Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, Paper, Typography } from "@mui/material";
import React,{useEffect,useState} from "react";
import { Link, Outlet,useParams } from "react-router-dom";
import getCreds from "../cred/cred";

//Fetches extra information from a certain movie (with use parameter 'id')
function MovieInfoMUI(){

        let { id } = useParams()
        const credentials = getCreds()

    //gets API credentials from files

    const [errorState, setErrorState] = useState("waiting")

    //used for the return function
    const [movie, setMovie] = useState({})

    //https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US

    useEffect(() => {
        
    //FETCHES THE DATA FROM A SINGLE MOVIE
        const fetchInfo = async () => {
            try{
                const connection = await fetch('https://api.themoviedb.org/3/movie/'+id+'?api_key='+credentials+'&language=en-US')
                const json = await connection.json()

                //saves fetched data to useState called movie
                setMovie(json)
                //clear errorstate to show page properly
                setErrorState("")
            }catch (error){
                setErrorState("virhe")
            }
        }
        fetchInfo()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    //ALL FORMATERS CHECK FOR NULL VALUES FROM API CALL
    //Reformats numbers to become easily readable
    const roundNumbers = (e) =>{
        let text=""

        if(e===null) return ""

        if (e > 1000000) {
            e = e/1000000
            text = "M"
        }
        return "$" +e.toFixed(1) + text
    }

    //REFORMATS DATE FROM AMERICAN STUPID VERSION TO ACTUALLY READALBE
    const fixDate = (e) =>{
        if(e===null) return ""
        let data = e.split('-')

        return data[2] + "." + data[1] + "." + data[0]
    }

    //RETURNS LENGTH OF THE MOVIE
    const getRuntime = (e) =>{
        if (e===null) return ""
        return 'Length: ' + e
    }

    const getImage = (e) =>{
        return e.slice(1)
    }

    if(errorState.length===0){
        return(
            <Box>
                <Paper sx={{padding:2}}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <Card sx={{maxWidth: 500}}>
                                <CardMedia component='img' image={"http://image.tmdb.org/t/p/w500" + movie.poster_path}></CardMedia>
                            </Card>
                        </Grid>
                        <Grid item>
                            <Card sx={{maxWidth: 600, height:800}}>
                                <CardHeader title={movie.title}></CardHeader>
                                <CardContent>
                                    <Typography sx={{paddingTop: 3,paddingBottom: 3}}>{movie.overview}</Typography>
                                    <Typography>Budget: {roundNumbers(movie.budget)}</Typography>
                                    <Typography>Box office: {roundNumbers(movie.revenue)}</Typography>
                                    <Typography>Released: {fixDate(movie.release_date)}</Typography>
                                    <Typography>{getRuntime(movie.runtime)} minutes</Typography>
                                </CardContent>
                                <CardActions>
                                    <Button component={Link} to='../listaa'>Return</Button>
                                    <Button component={Link} to={'../addtolist/'+movie.id+'/'+movie.title+'/'+getImage(movie.poster_path)}>Add to watched</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
                </Paper>
            <Outlet></Outlet>
            </Box>
        )
    }else{
        return(
            <Typography>{errorState}</Typography>
        )
    }
    
}

export default MovieInfoMUI