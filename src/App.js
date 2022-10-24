import FetchMoviesMUI from "./mui/FetchMoviesMUI";
import "./App.css"
import React from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import {lightBlue, amber} from '@mui/material/colors';
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


  const theme = createTheme({
  //primary -> yläpalkki
  palette: {
    primary: { main: lightBlue[500], contrastText: '#FFFFFF' },
    secondary: {main: amber[300], contrastText: '#FFFFFF'},
    text: { primary: '#000000', contrastText: '#FFFFFF'},
    background: {default: '#FFFFFF'}
  },
  typography: {
    fontFamily: "'Silkscreen', cursive;"

  }
});

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {//<AuthenticationForm />
      }
      <FetchMoviesMUI genres={genres} />
    </ThemeProvider>
  );
}

export default App;
