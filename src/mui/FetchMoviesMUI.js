import React, { useState, useEffect } from 'react'
import { Box,Button,Paper,TextField, Typography} from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Link, Outlet} from 'react-router-dom';
import getCreds from '../cred/cred';


//Should be renamed "list all movies" does what suggested name does
function FetchMoviesMUI(props) {
    //Display errors
    const [errorState, setErrorState] = useState("Processing...")

    //save all movies
    const [movies, setmovies] = useState([{
        title: '',
        id: 0,
        rating: 0,
        genre: [],
        img: ""
    }])

    //for filtering out the end result list
    const [filter, setFilter] = useState("")
    const changeFilter = (e) => {
        setFilter(e.target.value)
    }

    //Cross check movies genre ids with ids from props and save correct genre names instead of ids
    const getGenres = (genre_ids) => {
        let list = []

        //Looping trough genreids where element = [element,element,...,element]
        genre_ids.forEach(element => {
            props.genres.forEach(genre => {
                if (genre.id === element) {
                    if (list.length === 0) {
                        list.push(genre.name)
                    } else {
                        list.push(", " + genre.name)
                    }
                }
            });
        });
            
        return list
    }


    //get data from movies
    const fetchUrl = async () => {
        try {
            let list = []
            //AMOUNT OF FETCHES DONE, one fetch receives a page with 20 movies
            //---------------------

            let fetchAmount = 1

            //---------------------
            
            // repeats fetch as many times as fetchAmount is set
            for (let page = 1; page <= fetchAmount; page++) {
                const credentials = getCreds()
                //GENRES
                //https://api.themoviedb.org/3/genre/movie/list?api_key="+credentials+"&language=en-US
                //TOP RATED
                //https://api.themoviedb.org/3/movie/top_rated?api_key="+credentials+"&language=en-US&page=1
                //POPULAR
                //https://api.themoviedb.org/3/movie/popular?api_key="+credentials+"&language=en-US&page=1
                //TRENDING
                //https://api.themoviedb.org/3/trending/all/day?api_key="+credentials
                const connection = await fetch("https://api.themoviedb.org/3/movie/top_rated?api_key="+credentials+"&language=en-US&page=" + page)
                const json = await connection.json()
                
                //adds the fetched json list to 'movies' useState
                for (let i = 0; i < json.results.length; i++) {
                    list.push({
                        title: json.results[i].title,
                        id: json.results[i].id,
                        rating: json.results[i].vote_average,
                        genre: getGenres(json.results[i].genre_ids),
                        img: json.results[i].poster_path
                    })
                }
            }

            setmovies(list)
            setErrorState("")
        } catch (error) {
            setErrorState("Connection failed!")
        }
    }
    //execute fetch when page is loaded
    useEffect(() => {
        fetchUrl()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //removes the unneccessary '/' from the start of the image url
    const getImage = (e) =>{
        return e.slice(1)
    }


    //Return list of movies fetched or error message
    //Later preferrably only return object of all the movies to be used in search function
    if (errorState.length === 0) {
        let index = 0
        let text = ""
        return (
            <Box>
                <Typography variant='h2'>Browse highest rated movies</Typography>
                <Paper sx={{ marginTop: 2}}>
                    <Box component='form' sx={{ '& .MuiTextField-root': { marginBottom: 2 }, padding: 2 }}>
                        <TextField  label='Search' name='search' onChange={ (e) => changeFilter(e) }/>
                    </Box>
                </Paper>
            {/* MAP ALL MOVIES FETCHED FROM API, FILTER WILL BE APPLIED TO SHOW ONLY CORRECT MOVIES*/}
                <Paper>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>RATING </TableCell>
                            <TableCell> TITLE </TableCell>
                            <TableCell> ID </TableCell>
                            <TableCell> GENRES </TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            {/*eslint-disable-next-line*/}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {movies.map(movie => {
                                //Change row color based on index
                                    if (index % 2 === 0) {
                                        text="grey"
                                    } else {
                                        text="white"
                                    }
                                    index++
                                    //Return a single row if title of the movie is found with filter keyword
                                    if (movie.title.toLowerCase().includes(filter.toLowerCase())) {
                                        return (
                                            <TableRow key={movie.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                <TableCell className={text}>{index}</TableCell>
                                                <TableCell className={text}>{movie.rating}</TableCell>
                                                <TableCell className={text}>{movie.title}</TableCell>
                                                <TableCell className={text}>{movie.id}</TableCell>
                                                <TableCell className={text}>{movie.genre}</TableCell>
                                                <TableCell className={text}><Button component={Link} to={''+movie.id}>More info</Button></TableCell>
                                                <TableCell className={text}><Button component={Link} to={'../addtolist/'+movie.id+'/'+movie.title+'/'+getImage(movie.img)}>Add to watched</Button></TableCell>
                                            </TableRow>
                                        )
                                    } else {
                                        //reduce index by 1 to keep row colors fixed
                                        index--
                                    }
                                    return(<Typography></Typography>)
                        })}
                        </TableBody>
                        </Table>
                </TableContainer>
                </Paper>
                <Outlet></Outlet>
                </Box>
        )
    } else {
        //only returns this if fetchUrl fails
        return (
            <Box>
                {errorState}
                <Outlet></Outlet>
            </Box>
        )
    }
}


export default FetchMoviesMUI;