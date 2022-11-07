//import FetchMoviesMUI from "./mui/FetchMoviesMUI";
import "./App.css"
import React from "react";
import { createTheme, CssBaseline, ThemeProvider, Typography } from "@mui/material";
import {lightBlue, amber} from '@mui/material/colors';
//import TabMUI from "./mui/TabMui";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MenuMUI from "./mui/MenuMUI";
import IndexMUI from "./mui/IndexMUI";
import FetchMoviesMUI from "./mui/FetchMoviesMUI";
import AuthenticationCreateNewMUI from "./mui/AuthenticationCreateNewMUI";
import AuthenticationLoginMUI from "./mui/AuthenticationLoginMUI";
import AuthenticatedIndexMUI from "./mui/AuthenticatedIndexMUI";
import MovieInfoMUI from "./mui/MovieInfoMUI";
import MyWatchedList from "./mui/MyWatchedList";
//import AuthenticationForm from "./components/AuthenticationForm";

/*


--------------APPLICATIION------------------

Meant to create valid movie recommendations based on users previously watched movies.
List of movies and their data is collected from TMDB (The Movie Data Base) using their free API

Users can:
-create new account
-login to existing account
-search for movies
-add movies to their 'watched' list (database)
-get recommendations based on their 'watched' list

!!! RIGHT NOW !!!
app only displays list of movies which can be filtered using keywords, authentication form is already created but not displayed
<footer> is added to public/index.html to credit TMDB API based on their policies

footer looks like this (image is saved from their website):
<footer>
  <!--USING THIS API REQUIRES CREDITING THE SOURCE-->
  <label>API BY:</label><br>
  <a href="https://www.themoviedb.org/"><img src="tmdbLong.svg" height="30px" /></a>
</footer>

*/


function App() {

  /*{
  id:""
  name:""
  }
  Fetched from TMDB API, hard coded to avoid useless fetching, genres will most likely not change too often*/
  const genres = [{"id":28,"name":"Action"},{"id":12,"name":"Adventure"},{"id":16,"name":"Animation"},{"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},{"id":99,"name":"Documentary"},{"id":18,"name":"Drama"},{"id":10751,"name":"Family"},{"id":14,"name":"Fantasy"},{"id":36,"name":"History"},{"id":27,"name":"Horror"},{"id":10402,"name":"Music"},{"id":9648,"name":"Mystery"},{"id":10749,"name":"Romance"},{"id":878,"name":"Science Fiction"},{"id":10770,"name":"TV Movie"},{"id":53,"name":"Thriller"},{"id":10752,"name":"War"},{"id":37,"name":"Western"}]

  //SETS THE THEME FOR THE WEBAPP

    //FONT LINK: <link href = "https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@500&display=swap" rel = "stylesheet" >
    
  const theme = createTheme({
  //primary -> yläpalkki
  palette: {
    primary: { main: '#673ab7', contrastText: '#FFFFFF' },
    secondary: {main: '#FFFFFF', contrastText: '#FFFFFF'},
    text: { primary: '#000000', contrastText: '#FFFFFF'},
    background: {default: '#FFFFFF'}
  },
  typography: {
    fontFamily: "'Chakra Petch', sans-serif;"
    },
});
 /*
  

    <MenuMUI></MenuMUI>
 */
  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <MenuMUI /> }>
          <Route index element={ <IndexMUI></IndexMUI> } />
          <Route path='listaa' element={ <FetchMoviesMUI genres={genres}></FetchMoviesMUI> } />
          <Route path='signup' element={ <AuthenticationCreateNewMUI></AuthenticationCreateNewMUI> } />
          <Route path='login' element={ <AuthenticationLoginMUI></AuthenticationLoginMUI> } />
          <Route path='home/:user' element={ <AuthenticatedIndexMUI></AuthenticatedIndexMUI> } />
          <Route path='home/:user/watchlist' element={ <MyWatchedList></MyWatchedList> } />
          <Route path='listaa/:id' element={<MovieInfoMUI></MovieInfoMUI>}></Route>
            <Route path='addtolist/:id/:title/:img' element={<Typography sx={{textAlign: "center",marginTop:3}}>Added to watched list,<br /> NOT YET IMPLEMENTED</Typography>}></Route>
          <Route path='*' element={ <Typography>Virhe</Typography> } />
        </Route>
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
  );
}

export default App;
