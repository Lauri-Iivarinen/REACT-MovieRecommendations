//import FetchMoviesMUI from "./mui/FetchMoviesMUI";
import "./App.css"
import React from "react";
import { createTheme, CssBaseline, ThemeProvider, Typography } from "@mui/material";
//import TabMUI from "./mui/TabMui";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MenuMUI from "./mui/MenuMUI";
import FetchMoviesMUI from "./mui/FetchMoviesMUI";
import AuthenticatedIndexMUI from "./mui/AuthenticatedIndexMUI";
import MovieInfoMUI from "./mui/MovieInfoMUI";
//import MyWatchedList from "./mui/MyWatchedList";
import AddToListFormMUI from "./mui/AddToListFormMUI";
import MyWatchedTab from "./mui/MyWatchedTab";
import Recommendations from "./mui/Recommendations";
import EditMovie from "./mui/EditMovie";
//import AuthenticationForm from "./components/AuthenticationForm";

/*


--------------APPLICATIION------------------

Meant to create valid movie recommendations based on users previously watched movies.
List of movies and their data is collected from TMDB (The Movie Data Base) using their free API

User
-search for movies
-add movies to their 'watched' list (database) + review them
-get summary of watch history (most watched genre etc)
-get recommendations based on their 'watched' list

TODO
 - add search for movie function if its not found from top rated list
 - styling
 - (user identifying) if time
 - edit function for watch history (can already delete)


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

  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <MenuMUI /> }>
          <Route index element={ <AuthenticatedIndexMUI></AuthenticatedIndexMUI>} />
          <Route path='list' element={ <FetchMoviesMUI genres={genres}></FetchMoviesMUI> } />
          <Route path='home' element={ <AuthenticatedIndexMUI></AuthenticatedIndexMUI> } />
          <Route path='home/watchlist' element={ <MyWatchedTab genres={genres}></MyWatchedTab> } />
          <Route path='list/:id' element={<MovieInfoMUI genres={genres} returnUrl={'../list'}></MovieInfoMUI>}></Route>
          <Route path='home/info/:id' element={<MovieInfoMUI genres={genres} returnUrl={'../home'}></MovieInfoMUI>}></Route>
          <Route path='addtolist/:id/:title/:img/:genres' element={<AddToListFormMUI></AddToListFormMUI>}></Route>
          <Route path='addtolist/:id/:title/:img/:genres/:year/:month/:date/:rating/:review' element={<EditMovie></EditMovie>}></Route>
          <Route path='addtolist/:id/:title/:img/:genres/:year/:month/:date/:rating' element={<EditMovie></EditMovie>}></Route>
          <Route path='recommendations' element={ <Recommendations></Recommendations>} />
          <Route path='*' element={ <Typography>Virhe</Typography> } />
        </Route>
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
  );
}

export default App;
