import React from 'react'
import './Slider.css'
import axios from 'axios'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import StarRatings from 'react-star-ratings';


function Slider() {
    const apiKey = process.env.REACT_APP_API_KEY;
    const baseUrl = process.env.REACT_APP_BASE_URL; 
    const imgBase = process.env.REACT_APP_IMAGE_BASE_URL;
    //base url for images
    const imageUrl = "https://image.tmdb.org/t/p/original"
    //create state for the upcoming movies
    const [upcomingMovies, setUpcomingMovies] = React.useState([])
    //create state to advance movies
    const [index, setIndex] = React.useState(0);
    //create state for rating
    const {currentRating, setCurrentRating} = React.useState(0);

    //call api for data when the components loads
    React.useEffect(
        ()=>{

            // console.log(baseUrl);
            //call api to get upcoming movies
            axios.get(`${baseUrl}/movie/upcoming?api_key=${apiKey}`)
            .then(res =>{
                // console.log(res.data.results);
                setUpcomingMovies(res.data.results);
                //divide votes by 2 to set the current rating
                let rating = Math.round((res.data.results[0]?.vote_average)/2);
                setCurrentRating(rating);
            })
            .catch(err => console.log(err))

        }, []
    )

    const sliderStyle={
        backgroundImage:`url("${imageUrl}${upcomingMovies[index]?.backdrop_path}")`,
        backgroundSize:'cover',
        backgroundPosition:'center',
        backgroundRepeat:'no-repeat',
        height:"60vh",
        position: "relative" 
    }
    const handleLeft = ()=> {
        // console.log("left clicked");
        //when you get to 0, wrap to the end of the array
        index === 0?
        setIndex(upcomingMovies.length - 1):
        setIndex (index-1);

    }

    const handleRight = ()=> {
        // console.log("right clicked");
        //increment index
        //when you get to the end, wrap back to zero
        index === upcomingMovies.length - 1?
        setIndex(0) :
        setIndex (index+1);

    }

  return (
    <div style={ sliderStyle } >
        <div className='slider-overlay'></div>
        <MdKeyboardArrowLeft className='left-arrow'
                            onClick={handleLeft} />
        <MdKeyboardArrowRight className='right-arrow'
                            onClick={handleRight} />
        <div className='movie-info'>
            <h1>{upcomingMovies[index]?.title}</h1>
            <p>{upcomingMovies[index]?.overview.slice(0,150)}</p>
            <p>Release Date: {upcomingMovies[index]?.release_date}</p>
            <StarRatings
          rating={currentRating}
          starRatedColor="red"
          numberOfStars={5}
          name='rating'
          starDimension='15px'
          starSpacing='1px'
        />
        <p className='see-details'>See Details</p>
        </div>
    </div>
  )
}

export default Slider