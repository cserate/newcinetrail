import React from 'react'
import './MovieCard.css'

function MovieCard({movie, imgUrl, imgheight, cardStyle, borderRadius}) {

    const imageUrl = "https://image.tmdb.org/t/p/original";

    const imageStyle={
        backgroundImage:`url("${imageUrl}${imgUrl}")`,
        backgroundSize:'cover',
        backgroundPosition:'center',
        backgroundRepeat:'no-repeat',
        height: imgheight,
        borderRadius: borderRadius,
        width: "200px",
        position: "relative" 
    }    

    

  return (
    <div className={cardStyle}>
        <div style= {imageStyle}>
            <div className='movie-info-top'>
                <p>{movie.vote_average}</p>
            </div>
            <div className='movie-info-bottom'>
                <p>{movie.title}</p>
                <p>Rating: {movie.vote_average}</p>
            </div>
            {
                cardStyle === "top-rated-card" && <p>{movie.title}</p>

            }
        </div>
    </div>
  )
}

export default MovieCard