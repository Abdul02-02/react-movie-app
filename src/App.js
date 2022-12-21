import React,{useState,useEffect} from 'react';
import './App.css';
import MovieBox from './MovieBox';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar,Nav, Form, FormControl } from 'react-bootstrap';

const API_URL="https://api.themoviedb.org/3/movie/popular?api_key=d171286721a5ec4b895c8a75d1aa4322";
function App() {
  const [resentlyWatched, setResentlyWatched]=useState([]);
  const [movies, setMovies]=useState([]);
  const [query, setQuery]=useState('');

  useEffect(() => {
    fetch(API_URL)
    .then((res)=>res.json())
    .then(data=>{
      setMovies(data.results);
    })
  }, [])

  const searchMovie = async(e)=>{
    e.preventDefault();
    console.log("Searching")
    try{
      const url=`https://api.themoviedb.org/3/search/movie?api_key=d171286721a5ec4b895c8a75d1aa4322&query=${query}`
      const res= await fetch(url);
      const data= await res.json();
      console.log(data);
      setMovies(data.results);

    }
    catch(e){
      console.log(e);
    }
  }

  const changeHandler=(e)=>{
    setQuery(e.target.value);
  }

  const addResentlyWatched = (movie) => {
    const newMovieitems = [...resentlyWatched, movie];
    setResentlyWatched(newMovieitems);
    saveItems(newMovieitems);
  };
  
  const removeResentlyWatched = (movie) => {
    const newMovieitems = resentlyWatched.filter(
      (resentlyWatched) => resentlyWatched.imdbID !== movie.imdbID
    );
    setResentlyWatched(newMovieitems);
  }
  useEffect(() =>{
    const movieResentlyWatched = JSON.parse(
      localStorage.getItem('react-movie-app-favourits')
    );
    setResentlyWatched(movieResentlyWatched);
  }, []);
 const saveItems = (items) => {
  localStorage.setItem('react-movie-app-favourits', JSON.stringify(items))
 };
  return (
    <>
    <Navbar bg='dark' expand="lg" variant='dark'>
      <Container fluid>
        <Navbar.Brand href='/home'>Movie App</Navbar.Brand>
        <Navbar.Toggle aria-controls='navbarScroll'></Navbar.Toggle>
        <Navbar.Collapse id="navbarScroll">
          <Nav
          className='me-auto my-2 my-1g-3'
          style={{maxHeight:'100px'}}
          navbarScroll></Nav>

          <Form className='d-flex' onSubmit={searchMovie}  autoComplete="off">
            <FormControl
            type='serch'
            placeholder='Movie search'
            className='me-2'
            aria-label="search"
            name='query'
            value={query} onChange={changeHandler}></FormControl>
            <button variant="secondary" type='submit'>Search</button>
          </Form>

        </Navbar.Collapse>
      </Container>
    </Navbar>
    <div className='container-fluid movie-app'>
        <div className='row'>
        {movies.map(movie => (
        <MovieBox movie={movie}
        handelResentlyWatched ={(movie)=> addResentlyWatched(movie)}
         />
         )
         )}
        </div>
 
    </div>
    
    <h2>Recently Watched</h2>
 
      <div className='container'>
      <div className='row'>
        {movies.map(resentlyWatched => (
           <MovieBox movie ={resentlyWatched}
           handelResentlyWatched ={(movie)=> addResentlyWatched(movie)}
           />
        ))}
      </div>
      <button className='btn-remove' onClick={removeResentlyWatched}>Remove All</button>
    </div>


    </>
    
  );
}

export default App;
