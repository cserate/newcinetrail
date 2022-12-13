import React from 'react'
import Slider from '../../components/Header/Slider/Slider'
import './Homepage.css'
import axios from 'axios';

function Homepage() {
  const apiKey = process.env.REACT_APP_API_KEY;
  const baseUrl = process.env.REACT_APP_BASE_URL;

    //call api when the component loads
    React.useEffect(
      ()=>{
          
          //call api to get upcoming movies
          axios.get(`${baseUrl}/movie/popular?api_key=${apiKey}&page=1`)
          // https://api.themoviedb.org/3/movie/popular?api_key=d6436bb18d070d5e4de2901cd97c9adf&page=1
          .then(res =>{
              console.log(res.data.results);
              //store data from api into state
              setPopularMovies(res.data.results)
          })
          .catch(err => console.log(err))
  
      }, []
  )
  //create state to hold popular movies
  const [popularMovies, setPopularMovies] = React.useState([])

  return (

    <div className='homepage-container'>
        <Slider /> 
        <div className='movies-wrapper'>
          <div className='popular-container'>
            <h3>Popular Movies</h3>
            <div className='popular-cards-wrapper'>
              {
                popularMovies.map(item=> <p>{item.title}</p>)
              }
            </div>
            <div className='page-numbers'>Page Numbers</div>
          </div>
          <div className='top-rated-container'>
            <h3>Top Rated Movies</h3>
            <div className='top-rated-cards-wrapper'>Top Rated Movies Go Here</div>
          </div>
        </div>
    </div>
    
  )
}

export default Homepage