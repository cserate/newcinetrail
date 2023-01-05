import React from 'react'
import { useParams } from 'react-router-dom'
import './MovieDetails.css'
import axios from 'axios';
import ReactPlayer from 'react-player'

function MovieDetails() {
    const apiKey = process.env.REACT_APP_API_KEY;
    const baseUrl = process.env.REACT_APP_BASE_URL; 
    const imgBase = process.env.REACT_APP_IMAGE_BASE_URL;
    //base url for images
    const imageUrl = "https://image.tmdb.org/t/p/original"
// https://api.themoviedb.org/3/movie/724495/videos?api_key=d6436bb18d070d5e4de2901cd97c9adf
 
// const params = useParams();
  // console.log(params);
  const {movieId} = useParams();
  console.log(movieId);

  //create state to hold movie data
  const [movie, setMovie] = React.useState({});

  //create state to hold video info
  const [videoLink, setVideoLink] = React.useState('');

  
  
  //call api to get the links
  React.useEffect(
    ()=>{

      //call api to get movie info
      axios.get(`${baseUrl}/movie/${movieId}?api_key=${apiKey}`)
      .then(res=>{
      //console.log(res.data)
      setMovie(res.data)
      // setRating(res.data.vote_average/2)
    })
    .catch(err=>console.log(err))


      //call api to get trailer
        axios.get(`${baseUrl}/movie/${movieId}/videos?api_key=${apiKey}`)
        .then(res=>{
          // console.log(res.data.results);
        
          //filter to find the videos from youtube and trailer
          //console.log(res.data.results.filter( item=> item.site==="YouTube" && item.type=== "Trailer"))
          
          const youTubeLinks = res.data.results.filter( item=> item.site ==="YouTube" && item.type === "Trailer");
          //pick the first one and set to videoLink
          setVideoLink(youTubeLinks[0].key)

        })
        .catch(err=>console.log(err))
        
    }, []

  )
    
  

  return (
    <div className='details-container'>
      {
        videoLink ?
        <div className='trailer-container'>
          <ReactPlayer
            className="trailer-player"
            url={`https://www.youtube.com/watch?v=${videoLink}`}
            width="100%"
            height="100%"
            />
        </div>
        :
        <div className="trailer-container-blank"
          style={
              {
              backgroundImage:`url("${imageUrl}/${movie?.backdrop_path}")`,
              backgroundPosition:"center",
              backgroundSize:"cover"
              }}  >
            <p>No trailers released yet</p>
          </div>
        }
        <div className='info-container'>
          {movie?.original_title}
        </div>
    </div>
        )
      }
    


export default MovieDetails