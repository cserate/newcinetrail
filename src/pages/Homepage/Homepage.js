import React from 'react'
import Slider from '../../components/Header/Slider/Slider'
import './Homepage.css'


function Homepage() {
  const apiKey = process.env.REACT_APP_API_KEY;
  const baseUrl = process.env.REACT_APP_BASE_URL;

  return (

   
    <div className='homepage-container'>
        <Slider /> 
        <div className='movies-wrapper'>
          <div className='popular-container'>
            <h3>Popular Movies</h3>
            <div className='popular-cards-wrapper'>Popular Movies Go Here</div>
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