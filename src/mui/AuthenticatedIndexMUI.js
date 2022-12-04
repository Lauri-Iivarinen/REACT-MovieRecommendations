import React,{useState,useEffect} from "react";
import { Box, Button, Card, CardActions, CardContent, CardMedia, CircularProgress, Fade, Grid, Typography } from "@mui/material";
import {Outlet,Link} from 'react-router-dom';
import getCreds from "../cred/cred";
import Recommendations from "./Recommendations";

//Index page for users who have successfully authenticated
function AuthenticatedIndexMUI (props){
    
    //gets credentials for API (saved on pc, not gh)
    const credentials = getCreds()
    //https://api.themoviedb.org/3/movie/popular?api_key="+credentials+"&language=en-US&page=1
    //http://image.tmdb.org/t/p/w500/your_poster_path

    const [errorState, setErrorState] = useState("waiting...")
    const [fade, setFade] = useState(false)
    const trending = []

    //Use state used for mapping out movies on return
    const [trendingMovies,setTrendingMovies] = useState([{
        img: "",
        title: "",
        id: "",
        i: 0
    }])


    //fetches trending movies and saves five first results
    const fetchUrl = async () => {
        
        try{
            const connection = await fetch("https://api.themoviedb.org/3/trending/all/day?api_key="+credentials)
            const json = await connection.json()

                for (let i = 0; i < json.results.length && trending.length <= 4; i++) {
                    if(json.results[i].media_type === "movie"){
                        trending.push({
                            img: "http://image.tmdb.org/t/p/w500" + json.results[i].poster_path,
                            title: json.results[i].title,
                            id: json.results[i].id,
                            i: i
                        })
                        
                    
                }
                
            }
            setTrendingMovies(trending)
            setErrorState("")
        }catch(error){
            setErrorState("NO CONNECTION")
        }
    }
    useEffect(() => {
        fetchUrl()
        setFade(true)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //if fetch worked correctly
    if(errorState.length === 0){
        return(
            <Box>
                <Typography variant='h4' sx={{ marginLeft: 6, marginTop: 2 }}>Popular movies now:</Typography>
                <Fade in={fade} style={{ transitionDelay: fade ? '500ms' : '0ms' }}>
                <Grid container spacing={3} sx={{margin: 1}}>
                    {trendingMovies.map(trending =>{
                        return(
                            <Grid item key={trending.id}>
                                <Card  sx={{maxWidth: 200, height:450}}>
                                    <CardMedia component='img' image={trending.img} height='300' width='120'></CardMedia>
                                    <CardContent sx={{height: 100}}>{trending.title}</CardContent>
                                    <CardActions>
                                        <Button component={Link} to={"/home/info/" + trending.id}>More info</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        )
                    })}
                    </Grid>
                </Fade>
                <Recommendations></Recommendations>
                <Outlet></Outlet>
            </Box>
        )
    } else{
        return(<Box sx={{display:'flex',justifyContent: 'center'}}><CircularProgress></CircularProgress><Typography>{errorState}</Typography></Box>)
    }
    
}

export default AuthenticatedIndexMUI